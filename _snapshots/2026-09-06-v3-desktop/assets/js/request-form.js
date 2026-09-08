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
       service, location, message
     }
   }
   ══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  /* Перевод. Пока словаря нет — отдаём английский из аргумента, поэтому
     компонент работает и в отрыве от i18n.js.                        */
  function T(key, fallback) {
    return (global.I18N && global.I18N.t) ? global.I18N.t(key, fallback) : fallback;
  }

  /* ── Схема полей ────────────────────────────────────────────────────
     Один источник правды: и разметка, и валидация, и payload строятся
     отсюда. Чтобы добавить поле — допишите объект, больше ничего.      */
  var SCHEMA = [
    { name:'fullName', label:'Имя', i18n:'form.fullName', type:'text', required:true, row:1,
      autocomplete:'name',        placeholder:'' },
    { name:'whatsapp', label:'Номер WhatsApp/Telegram', i18n:'form.whatsapp', type:'tel', required:true, row:1,
      autocomplete:'tel',         placeholder:'',
      pattern:/^[+]?[\d\s().-]{7,20}$/, errI18n:'form.errPhone',
      patternMessage:'Укажите корректный номер с кодом страны.' },

    { name:'email',    label:'Электронная почта', i18n:'form.email', type:'email', required:true, row:2,
      autocomplete:'email',       placeholder:'',
      pattern:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, errI18n:'form.errEmail',
      patternMessage:'Укажите корректный адрес почты.' },
    { name:'country',  label:'Локация', i18n:'form.country', type:'text', required:true, row:2,
      autocomplete:'country-name', placeholder:'' },

    { name:'service',  label:'Услуга', i18n:'form.service', type:'select', required:true, row:3,
      options:[{ v:'Armored Vehicle Rental', k:'svc.0.name' },
               { v:'Yacht & Boat Charter', k:'svc.1.name' },
               { v:'Helicopter Charter', k:'svc.2.name' },
               { v:'VIP Event Production', k:'svc.3.name' },
               { v:'Interpreters', k:'svc.4.name' },
               { v:'Residency & Citizenship', k:'svc.5.name' },
               { v:'Legal Services', k:'svc.6.name' },
               { v:'Accounting & Company Formation', k:'svc.7.name' },
               { v:'Market Entry', k:'svc.8.name' },
               { v:'Business Analytics', k:'svc.9.name' },
               { v:'Business Launch Support', k:'svc.10.name' },
               { v:'Property Rental', k:'svc.11.name' },
               { v:'Residential Property Purchase', k:'svc.12.name' },
               { v:'Investment Property & Deal Support', k:'svc.13.name' },
               { v:'Investment Accounts', k:'svc.14.name' },
               { v:'Currency Exchange', k:'svc.15.name' },
               { v:'Transfers Across Brazil', k:'svc.17.name' },
               { v:'Travel Guide', k:'svc.18.name' },
               { v:'Full Travel Services', k:'svc.19.name' },
               { v:'Personal Companion', k:'svc.20.name' },
               { v:'Executive Protection', k:'svc.21.name' },
               { v:'Family & Maternity', k:'svc.22.name' },
               { v:'Something else', k:'form.other', ru:'Другое' }] },
    { name:'location', label:'Предпочтительное место', i18n:'form.location', type:'select', required:false, row:3,
      options:[{ v:'Custom request', k:'form.loc.custom', ru:'Индивидуальный запрос' },
               { v:'São Paulo', k:'dest.2.name' },
               { v:'Rio de Janeiro', k:'dest.1.name' },
               { v:'Florianópolis', k:'dest.0.name' },
               { v:'Balneário Camboriú', k:'form.loc.camboriu', ru:'Балнеариу-Камбориу' },
               { v:'Elsewhere in Brazil', k:'form.loc.brazil', ru:'Другой город Бразилии' },
               { v:'Elsewhere in LATAM', k:'form.loc.latam', ru:'Другая страна Латинской Америки' },
               { v:'Not decided yet', k:'form.loc.undecided', ru:'Пока не решено' }] },

    { name:'message',  label:'Что вам нужно?', i18n:'form.message', type:'textarea', required:true, row:5,
      phI18n:'form.phMessage',
      placeholder:'Бронированный внедорожник к 4:00 к моему отелю в Сан-Паулу, водитель со знанием английского.' }
  ];

  /* Тексты берём в момент отрисовки, а не один раз при загрузке:
     иначе при смене языка форма осталась бы на старом.              */
  /* Тексты берём в момент отрисовки, а не один раз при загрузке:
     иначе при смене языка форма осталась бы на старом.              */
  function COPY() {
    return {
      submit:   T('form.submit',   'Отправить заявку'),
      sending:  T('form.sending',  'Отправляем…'),
      doneTitle:T('form.doneTitle','Заявка принята'),
      doneText: T('form.doneText', 'Мы свяжемся с вами в WhatsApp в ближайшее время.'),
      doneAction:T('form.doneAction','Открыть WhatsApp сейчас'),
      failText: T('form.failText', 'На нашей стороне что-то пошло не так. Напишите в WhatsApp — подхватим сразу.'),
      required: T('form.required', 'Это поле обязательно.'),
      select:   T('form.select',   'Выберите…'),
      noPref:   T('form.noPref',   'Без предпочтений')
    };
  }

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
      whatsappPhone:'5521977770800',
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
      [el('span', { text:COPY().submit })]);

    form.appendChild(el('div', { class:'rf-foot' }, [submit]));

    form.addEventListener('submit', function (e) { self.onSubmit(e); });
    this.form = form;
    this.submitBtn = submit;
    this.mount.appendChild(form);
  };

  RequestForm.prototype.buildField = function (f) {
    var self = this;
    var id = this.opts.formId + '-' + f.name;
    var extra = f.type === 'select' ? ' is-select' : (f.type === 'date' ? ' is-date' : '');
    var wrap = el('div', { class:'rf-field' + extra });

    var caption = f.i18n ? T(f.i18n, f.label) : f.label;
    var label = el('label', { for:id, html: caption + (f.required ? ' <span class="req">*</span>' : '') });

    var input;
    if (f.type === 'textarea') {
      input = el('textarea', { id:id, name:f.name, rows:'3',
        placeholder: f.phI18n ? T(f.phI18n, f.placeholder || '') : (f.placeholder || '') });
    } else if (f.type === 'select') {
      input = el('select', { id:id, name:f.name });
      input.appendChild(el('option', { value:'',
        text: f.required ? COPY().select : COPY().noPref }));
      // значение всегда английское — оно уходит в заявку; переводится подпись
      f.options.forEach(function (o) {
        input.appendChild(el('option', { value:o.v, text: o.k ? T(o.k, o.ru || o.v) : (o.ru || o.v) }));
      });
    } else {
      input = el('input', {
        id:id, name:f.name, type:f.type,
        placeholder: f.phI18n ? T(f.phI18n, f.placeholder || '') : (f.placeholder || ''),
        autocomplete:f.autocomplete || 'off'
      });
    }
    if (f.required) input.setAttribute('aria-required', 'true');

    var error = el('span', { class:'rf-error', id:id + '-error', hidden:'' });

    input.addEventListener('input', function () { self.clearError(f.name); });
    input.addEventListener('change', function () { self.clearError(f.name); });

    wrap.appendChild(label);
    if (f.type === 'date') {
      // Образец формата кладём поверх самого поля, а не поверх всей
      // строки: иначе он вставал по нижнему краю блока и налезал на
      // подпись. Обёртка даёт ему точную систему координат.
      var box = el('span', { class:'rf-datebox' });
      box.appendChild(input);
      wrap.appendChild(box);
    } else {
      wrap.appendChild(input);
    }

    /* Пустое поле даты браузеры показывают по-разному: Chrome рисует своё
       «дд.мм.гггг», Safari на телефоне — вообще ничего. Ставим свой образец
       формата и прячем его, как только дата выбрана. */
    if (f.type === 'date') {
      input.parentNode.appendChild(el('span', { class:'rf-ph', text: T('form.phDate', 'дд/мм/гггг') }));
      // На компьютере нажатие по полю не открывает календарь само —
      // просим браузер показать его. Где метода нет, ничего не ломается.
      input.addEventListener('click', function () {
        if (typeof input.showPicker === 'function') {
          try { input.showPicker(); } catch (err) {}
        }
      });
      var sync = function () { wrap.classList.toggle('has-val', !!input.value); };
      input.addEventListener('input', sync);
      input.addEventListener('change', sync);
      sync();
    }

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
      if (f.required && !value) problem = COPY().required;
      else if (value && f.pattern && !f.pattern.test(value))
        problem = T(f.errI18n, f.patternMessage);
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
    this.submitBtn.firstChild.textContent = COPY().sending;

    Promise.resolve()
      .then(function () { return self.opts.transport(payload); })
      .then(function (res) {
        self.showDone(payload);
        if (typeof self.opts.onSuccess === 'function') self.opts.onSuccess(payload, res);
      })
      .catch(function (err) {
        self.submitBtn.disabled = false;
        self.submitBtn.firstChild.textContent = COPY().submit;
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
      el('h3', { text:COPY().doneTitle }),
      el('p', { text:COPY().doneText }),
      el('a', { class:'btn btn-line', href:wa, target:'_blank', rel:'noopener' },
        [el('span', { text:COPY().doneAction })])
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
      html: COPY().failText + ' <a href="' + wa + '" target="_blank" rel="noopener" style="text-decoration:underline">WhatsApp</a>' });
    note.hidden = false;
    note.style.padding = '0 24px 18px';
    this.form.querySelector('.rf-foot').before(note);
  };

  /* Собранные значения — чтобы пересобрать форму на другом языке
     и не заставлять человека вводить всё заново.                    */
  RequestForm.prototype.values = function () {
    var out = {};
    for (var k in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, k)) out[k] = this.fields[k].input.value;
    }
    return out;
  };

  RequestForm.prototype.setValues = function (v) {
    for (var k in v) {
      if (this.fields[k] && v[k]) this.fields[k].input.value = v[k];
    }
  };

  /* Смена языка: заново отрисовываем форму, подставляя обратно введённое.
     Экран «заявка принята» не трогаем — он уже вне диалога.          */
  RequestForm.prototype.relang = function () {
    if (this.doneNode || !this.form) return;
    var keep = this.values();
    this.form.remove();
    this.fields = {};
    this.render();
    this.setValues(keep);
  };

  /* ── Публичный интерфейс ────────────────────────────────────────── */
  RequestForm.mount = function (target, options) { return new RequestForm(target, options); };
  RequestForm.schema = SCHEMA;
  RequestForm.transports = transports;

  global.RequestForm = RequestForm;
})(window);
