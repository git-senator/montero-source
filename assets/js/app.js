/* ══════════════════════════════════════════════════════════════════════
   Поведение страницы: навигация, плавный скролл, параллакс,
   появление блоков, раскрытие панелей, счётчики, монтаж формы.
   Всё на нативном API — без библиотек, чтобы страница открывалась
   офлайн и не тянула ничего со стороны.
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Плавный скролл по якорям, БЕЗ изменения URL ──────────────
     history не трогаем намеренно: сайт одностраничный, адрес должен
     оставаться прежним, а кнопка «назад» — не листать секции.        */
  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var navH = document.getElementById('nav').offsetHeight;
    var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduced ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-scroll]');
    if (!link) return;
    var id = (link.getAttribute('href') || '').replace('#', '');
    if (!id) return;
    e.preventDefault();
    closeDrawer();

    // клик по «Request …» внутри услуги — подставляем услугу в форму
    var prefill = link.getAttribute('data-prefill');
    if (prefill) {
      var sel = document.getElementById('concierge-request-service');
      if (sel) {
        var wanted = link.textContent.trim();
        Array.prototype.forEach.call(sel.options, function (o) {
          if (o.value === prefill) sel.value = o.value;
        });
        sel.dispatchEvent(new Event('change'));
      }
    }
    scrollToId(id);
  });

  // заглушки для юридических ссылок — чтобы никуда не уводило
  document.addEventListener('click', function (e) {
    var l = e.target.closest('a[data-legal]');
    if (!l) return;
    e.preventDefault();
    alert('The ' + l.getAttribute('data-legal') + ' document is not published yet.');
  });

  /* ── 2. Навигация: заливка, скрытие при скролле вниз ─────────────── */
  var nav = document.getElementById('nav');
  var floatWa = document.getElementById('floatWa');
  var lastY = window.pageYOffset;

  function onScroll() {
    var y = window.pageYOffset;
    nav.classList.toggle('solid', y > 40);
    nav.classList.toggle('hide', y > 620 && y > lastY && !document.body.classList.contains('drawer-open'));
    floatWa.classList.toggle('on', y > 700);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 3. Активный пункт меню ──────────────────────────────────────── */
  var sections = ['home', 'services', 'destinations', 'concierge', 'request']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  if (sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── 4. Мобильное меню ───────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  function openDrawer() {
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('open'); });
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('drawer-open');
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('drawer-open');
    setTimeout(function () { drawer.hidden = true; }, 420);
  }
  burger.addEventListener('click', function () {
    drawer.hidden ? openDrawer() : closeDrawer();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ── 5. Появление блоков ─────────────────────────────────────────── */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      revealIO.unobserve(en.target);   // иначе блок переигрывает анимацию при каждом проходе
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });

  /* ── 6. Параллакс ────────────────────────────────────────────────── */
  var parallaxNodes = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (parallaxNodes.length && !reduced) {
    var ticking = false;
    var move = function () {
      var vh = window.innerHeight;
      parallaxNodes.forEach(function (node) {
        var host = node.parentElement.getBoundingClientRect();
        if (host.bottom < -200 || host.top > vh + 200) return;
        var depth = parseFloat(node.getAttribute('data-parallax')) || 0.2;
        var progress = (host.top + host.height / 2 - vh / 2) / vh;
        node.style.transform = 'translate3d(0,' + (progress * depth * 100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(move);
    }, { passive: true });
    window.addEventListener('resize', move);
    move();
  }

  /* ── 7. Раскрытие панелей услуг ──────────────────────────────────── */
  document.querySelectorAll('[data-panel]').forEach(function (panel) {
    var head = panel.querySelector('.panel-head');
    head.addEventListener('click', function () {
      var open = panel.hasAttribute('data-open');

      // аккордеон: одновременно раскрыта одна панель
      document.querySelectorAll('[data-panel][data-open]').forEach(function (p) {
        if (p !== panel) {
          p.removeAttribute('data-open');
          p.querySelector('.panel-head').setAttribute('aria-expanded', 'false');
        }
      });

      if (open) {
        panel.removeAttribute('data-open');
        head.setAttribute('aria-expanded', 'false');
      } else {
        panel.setAttribute('data-open', '');
        head.setAttribute('aria-expanded', 'true');
        // если раскрытая панель ушла под шапку — подтягиваем её обратно
        setTimeout(function () {
          var navH = nav.offsetHeight;
          var box = panel.getBoundingClientRect();
          if (box.top < navH) {
            window.scrollTo({
              top: box.top + window.pageYOffset - navH - 20,
              behavior: reduced ? 'auto' : 'smooth'
            });
          }
        }, 90);
      }
    });
  });

  /* ── 8. Счётчики ─────────────────────────────────────────────────── */
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var node = en.target;
      var to = parseInt(node.getAttribute('data-count'), 10) || 0;
      var t0 = performance.now(), dur = 1500;
      (function step(now) {
        var p = Math.min((now - t0) / dur, 1);
        node.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
      countIO.unobserve(node);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (n) { countIO.observe(n); });

  /* ── 9. Монтаж формы ─────────────────────────────────────────────
     Транспорт по умолчанию — консоль: форма работает, данные видно,
     ничего никуда не улетает. Чтобы подключить бэкенд, замените
     transport на один из RequestForm.transports.*                    */
  if (window.RequestForm) {
    window.conciergeForm = RequestForm.mount('#request-form-mount', {
      formId: 'concierge-request',
      whatsappPhone: '5511968422222',
      transport: RequestForm.transports.console()
      // transport: RequestForm.transports.http('https://api.yourdomain.com/requests')
      // transport: RequestForm.transports.telegramBot('BOT_TOKEN', 'CHAT_ID')
    });
  }
})();
