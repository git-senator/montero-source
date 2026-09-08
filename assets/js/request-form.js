/* ══════════════════════════════════════════════════════════════════════
   RequestForm — переиспользуемый компонент формы заявки
   ──────────────────────────────────────────────────────────────────────
   Компонент сам строит разметку, валидирует, собирает данные в понятную
   структуру и отдаёт её транспорту. Транспорт подменяется одной строкой,
   когда появится бэкенд, — трогать остальной код не придётся.

   Подключение бэкенда:

     RequestForm.mount('#request-form-mount', {
       transport: RequestForm.transports.http('https://api.example.com/requests')
     });

   Свои варианты:
     RequestForm.transports.console()               — по умолчанию, пишет в консоль
     RequestForm.transports.http(url, headers)      — POST JSON
     RequestForm.transports.telegramBot(token, chat) — прямо в чат Telegram
     RequestForm.transports.whatsapp(phone)         — открывает WhatsApp с текстом
     любая своя функция async (payload) => void

   Структура payload, которая уходит в транспорт:
   {
     meta: { formId, submittedAt, locale, timezone, source, userAgent, referrer },
     lead: {
       fullName, whatsapp, email, country,
       service, location, date, message
     }
   }
   ══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  /* ── Схема полей ────────────────────────────────────────────────────
     Один источник правды: и разметка, и валидация, и payload строятся
     отсюда. Чтобы добавить поле — допишите объект, больше ничего.      */
  var SCHEMA = [
    { name:'fullName', label:'Full name',        type:'text',     required:true,  row:1,
      autocomplete:'name',        placeholder:'' },
    { name:'whatsapp', label:'WhatsApp number',  type:'tel',      required:true,  row:1,
      autocomplete:'tel',         placeholder:'+55 11 90000 0000',
      pattern:/^[+]?[\d\s().-]{7,20}$/, patternMessage:'Enter a valid phone number with country code.' },

    { name:'email',    label:'Email',            type:'email',    required:true,  row:2,
      autocomplete:'email',       placeholder:'name@company.com',
      pattern:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, patternMessage:'Enter a valid email address.' },
    { name:'country',  label:'Country',          type:'text',     required:true,  row:2,
      autocomplete:'country-name', placeholder:'' },

    { name:'service',  label:'Service',          type:'select',   required:true,  row:3,
      options:['Private Mobility','Private Aviation','Yacht Charter','Private Real Estate',
               'Executive Protection','Private Experiences','Family & Maternity',
               'Brazil Investment','Something else'] },
    { name:'location', label:'Preferred location', type:'select', required:false, row:3,
      options:['São Paulo','Rio de Janeiro','Florianópolis','Angra dos Reis',
               'Fernando de Noronha','Balneário Camboriú','Elsewhere in Brazil',
               'Elsewhere in LATAM','Not decided yet'] },

    { name:'date',     label:'Preferred date',   type:'date',     required:false, row:4 },
    { name:'message',  label:'What do you need?', type:'textarea', required:true, row:5,
      placeholder:'An armoured SUV at 4:00 a.m. at my hotel in São Paulo, English-speaking driver.' }
  ];

  var COPY = {
    consent:'By submitting you agree to be contacted about this request. Your details are never shared or used for marketing.',
    submit:'Request private assistance',
    sending:'Sending…',
    doneTitle:'Request received',
    doneText:'We will contact you via WhatsApp shortly.',
    doneAction:'Open WhatsApp now',
    failTitle:'Could not send',
    failText:'Something went wrong on our side. Message us on WhatsApp and we will pick it up immediately.',
    required:'This field is required.'
  };

  /* ── Транспорты ─────────────────────────────────────────────────── */
  var transports = {
    console: function () {
      return function (payload) {
        console.info('[RequestForm] payload ready for backend:', payload);
        return Promise.resolve({ ok:true, mode:'console' });
      };
    },

    http: function (url, headers) {
      return function (payload) {
        return fetch(url, {
          method:'POST',
          headers: Object.assign({ 'Content-Type':'application/json' }, headers || {}),
          body: JSON.stringify(payload)
        }).then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json().catch(function () { return { ok:true }; });
        });
      };
    },

    telegramBot: function (botToken, chatId) {
      return function (payload) {
        var l = payload.lead;
        var text = [
          '*New concierge request*',
          '',
          '*Name:* ' + l.fullName,
          '*WhatsApp:* ' + l.whatsapp,
          '*Email:* ' + l.email,
          '*Country:* ' + l.country,
          '*Service:* ' + l.service,
          '*Location:* ' + (l.location || '—'),
          '*Date:* ' + (l.date || '—'),
          '',
          l.message
        ].join('\n');
        return fetch('https://api.telegram.org/bot' + botToken + '/sendMessage', {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify({ chat_id:chatId, text:text, parse_mode:'Markdown' })
        }).then(function (r) {
          if (!r.ok) throw new Error('Telegram ' + r.status);
          return r.json();
        });
      };
    },

    whatsapp: function (phone) {
      return function (payload) {
        var l = payload.lead;
        var text = [
          'New concierge request',
          'Name: ' + l.fullName,
          'Email: ' + l.email,
          'Country: ' + l.country,
          'Service: ' + l.service,
          'Location: ' + (l.location || '—'),
          'Date: ' + (l.date || '—'),
          '',
          l.message
        ].join('\n');
        global.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        return Promise.resolve({ ok:true, mode:'whatsapp' });
      };
    }
  };

  /* ── Утилиты ────────────────────────────────────────────────────── */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') node.className = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) {
        node.setAttribute(k, attrs[k]);
      }
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function groupByRow(schema) {
    var rows = [], seen = {};
    schema.forEach(function (f) {
      if (!seen[f.row]) { seen[f.row] = []; rows.push(seen[f.row]); }
      seen[f.row].push(f);
    });
    return rows;
  }

  /* ── Компонент ──────────────────────────────────────────────────── */
  function RequestForm(mount, options) {
    this.mount = typeof mount === 'string' ? document.querySelector(mount) : mount;
    if (!this.mount) throw new Error('RequestForm: mount point not found');

    this.opts = Object.assign({
      formId:'concierge-request',
      transport: transports.console(),
      whatsappPhone:'5511968422222',
      onSuccess:null,
      onError:null
    }, options || {});

    this.fields = {};
    this.render();
  }

  RequestForm.prototype.render = function () {
    var self = this;
    var form = el('form', { class:'rf', id:this.opts.formId, novalidate:'' });

    groupByRow(SCHEMA).forEach(function (row) {
      var target = form;
      if (row.length > 1) {
        target = el('div', { class:'rf-row' });
        form.appendChild(target);
      }
      row.forEach(function (f) { target.appendChild(self.buildField(f)); });
    });

    var submit = el('button', { class:'btn btn-fill rf-submit', type:'submit' },
      [el('span', { text:COPY.submit })]);

    form.appendChild(el('div', { class:'rf-foot' }, [
      el('p', { class:'rf-consent', text:COPY.consent }),
      submit
    ]));

    form.addEventListener('submit', function (e) { self.onSubmit(e); });
    this.form = form;
    this.submitBtn = submit;
    this.mount.appendChild(form);
  };

  RequestForm.prototype.buildField = function (f) {
    var self = this;
    var id = this.opts.formId + '-' + f.name;
    var wrap = el('div', { class:'rf-field' + (f.type === 'select' ? ' is-select' : '') });

    var label = el('label', { for:id, html: f.label + (f.required ? ' <span class="req">*</span>' : '') });

    var input;
    if (f.type === 'textarea') {
      input = el('textarea', { id:id, name:f.name, rows:'5', placeholder:f.placeholder || '' });
    } else if (f.type === 'select') {
      input = el('select', { id:id, name:f.name });
      input.appendChild(el('option', { value:'', text: f.required ? 'Select…' : 'No preference' }));
      f.options.forEach(function (o) { input.appendChild(el('option', { value:o, text:o })); });
    } else {
      input = el('input', {
        id:id, name:f.name, type:f.type,
        placeholder:f.placeholder || '',
        autocomplete:f.autocomplete || 'off'
      });
    }
    if (f.required) input.setAttribute('aria-required', 'true');

    var error = el('span', { class:'rf-error', id:id + '-error', hidden:'' });

    input.addEventListener('input', function () { self.clearError(f.name); });
    input.addEventListener('change', function () { self.clearError(f.name); });

    wrap.appendChild(label);
    wrap.appendChild(input);
    wrap.appendChild(error);

    this.fields[f.name] = { def:f, wrap:wrap, input:input, error:error };
    return wrap;
  };

  RequestForm.prototype.clearError = function (name) {
    var f = this.fields[name];
    if (!f) return;
    f.wrap.classList.remove('has-error');
    f.error.hidden = true;
    f.error.textContent = '';
    f.input.removeAttribute('aria-invalid');
  };

  RequestForm.prototype.setError = function (name, message) {
    var f = this.fields[name];
    if (!f) return;
    f.wrap.classList.add('has-error');
    f.error.textContent = message;
    f.error.hidden = false;
    f.input.setAttribute('aria-invalid', 'true');
    f.input.setAttribute('aria-describedby', f.error.id);
  };

  RequestForm.prototype.validate = function () {
    var self = this, firstBad = null;
    SCHEMA.forEach(function (f) {
      var value = String(self.fields[f.name].input.value || '').trim();
      var problem = null;
      if (f.required && !value) problem = COPY.required;
      else if (value && f.pattern && !f.pattern.test(value)) problem = f.patternMessage;
      if (problem) {
        self.setError(f.name, problem);
        if (!firstBad) firstBad = self.fields[f.name].input;
      } else {
        self.clearError(f.name);
      }
    });
    if (firstBad) { firstBad.focus(); return false; }
    return true;
  };

  RequestForm.prototype.collect = function () {
    var self = this, lead = {};
    SCHEMA.forEach(function (f) {
      lead[f.name] = String(self.fields[f.name].input.value || '').trim();
    });
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    return {
      meta: {
        formId:this.opts.formId,
        submittedAt:new Date().toISOString(),
        locale:document.documentElement.lang || 'en',
        timezone:tz,
        source:location.href,
        referrer:document.referrer || '',
        userAgent:navigator.userAgent
      },
      lead: lead
    };
  };

  RequestForm.prototype.onSubmit = function (e) {
    e.preventDefault();
    if (!this.validate()) return;

    var self = this;
    var payload = this.collect();

    this.submitBtn.disabled = true;
    this.submitBtn.firstChild.textContent = COPY.sending;

    Promise.resolve()
      .then(function () { return self.opts.transport(payload); })
      .then(function (res) {
        self.showDone(payload);
        if (typeof self.opts.onSuccess === 'function') self.opts.onSuccess(payload, res);
      })
      .catch(function (err) {
        self.submitBtn.disabled = false;
        self.submitBtn.firstChild.textContent = COPY.submit;
        self.showFailure();
        if (typeof self.opts.onError === 'function') self.opts.onError(err, payload);
        else console.error('[RequestForm]', err);
      });
  };

  RequestForm.prototype.showDone = function (payload) {
    var wa = 'https://wa.me/' + this.opts.whatsappPhone +
      '?text=' + encodeURIComponent('Hello, I have just sent a request as ' + payload.lead.fullName + '.');

    var done = el('div', { class:'rf-done', role:'status', 'aria-live':'polite' }, [
      el('div', { class:'rf-done-mark',
        html:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 12l5.5 5.5L20 7"/></svg>' }),
      el('h3', { text:COPY.doneTitle }),
      el('p', { text:COPY.doneText }),
      el('a', { class:'btn btn-line', href:wa, target:'_blank', rel:'noopener' },
        [el('span', { text:COPY.doneAction })])
    ]);

    this.form.replaceWith(done);
    this.doneNode = done;
    done.scrollIntoView({ behavior:'smooth', block:'center' });
  };

  RequestForm.prototype.showFailure = function () {
    var existing = this.form.querySelector('.rf-failure');
    if (existing) return;
    var wa = 'https://wa.me/' + this.opts.whatsappPhone;
    var note = el('div', { class:'rf-error rf-failure', role:'alert',
      html: COPY.failText + ' <a href="' + wa + '" target="_blank" rel="noopener" style="text-decoration:underline">WhatsApp</a>' });
    note.hidden = false;
    note.style.padding = '0 24px 18px';
    this.form.querySelector('.rf-foot').before(note);
  };

  /* ── Публичный интерфейс ────────────────────────────────────────── */
  RequestForm.mount = function (target, options) { return new RequestForm(target, options); };
  RequestForm.schema = SCHEMA;
  RequestForm.transports = transports;

  global.RequestForm = RequestForm;
})(window);
