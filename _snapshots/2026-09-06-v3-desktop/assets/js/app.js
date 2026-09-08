/* ══════════════════════════════════════════════════════════════════════
   ВАРИАНТ №2 — поведение страницы.
   Всё на нативном API: библиотек нет, страница открывается офлайн
   и ничего не тянет со стороны.

   1 плавный скролл (URL не меняется)   6 параллакс
   2 шапка                              7 реестр услуг: сцена + раскрытие
   3 активный пункт меню                8 счётчики
   4 мобильная шторка                   9 год в подвале
   5 появление блоков                  10 монтаж формы
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');

  /* ── 1. Плавный скролл ────────────────────────────────────────────
     history не трогаем намеренно: сайт одностраничный, адрес должен
     оставаться прежним, а «назад» — не листать секции.              */
  var NAV_HIDES_AFTER = 640;   // та же граница, что и в обработчике прокрутки

  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    /* На компьютере раздел «Заявка» пуст — метка, заголовок, форма и
       кнопки связи переехали на последний экран, и сам раздел спрятан.
       Ссылка ведёт туда, где всё это теперь стоит. */
    if (!target.getClientRects().length) {
      target = document.querySelector('.final');
      if (!target) return;
    }
    var abs = target.getBoundingClientRect().top + window.pageYOffset;
    // Уйдёт ли шапка: она прячется только при движении вниз и только
    // ниже своей границы. Если уйдёт — отступ под неё не оставляем,
    // иначе в нём будет виден хвост предыдущего раздела.
    var hides = abs > window.pageYOffset + 1 && abs > NAV_HIDES_AFTER;
    var top = hides ? abs : abs - nav.offsetHeight + 1;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduced ? 'auto' : 'smooth' });
  }

  /* ── Первый экран: один оборот колеса — и мы в «Услугах» ──────────
     Посетитель прочитал первый экран целиком; листать его по пикселю
     незачем. Пока страница стоит на первом экране, первое же движение
     колеса вниз уводит сразу к разделу услуг, движение вверх с начала
     услуг возвращает наверх. Дальше по странице прокрутка обычная.
     Трогаем только мышь: на телефоне палец листает как листал.     */
  (function () {
    var services = document.getElementById('services');
    if (!services || reduced) return;
    var busy = 0;

    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey) return;                       // масштабирование не трогаем
      if (window.innerWidth < 721) return;         // телефон листает сам
      if (Date.now() < busy) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 4) return;

      var y = window.pageYOffset;
      var svcTop = services.getBoundingClientRect().top + y;

      if (e.deltaY > 0 && y < svcTop - 40) {       // вниз с первого экрана
        e.preventDefault();
        busy = Date.now() + 900;                   // пока едем — колесо молчит
        scrollToId('services');
        return;
      }
      if (e.deltaY < 0 && y > 0 && y <= svcTop + 40) {  // вверх из услуг
        e.preventDefault();
        busy = Date.now() + 900;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      /* Перескоков между разделами здесь больше нет.

         Было так: раздел считался дочитанным, когда его нижняя граница
         входила в экран, и колесо переносило к следующему. Но после
         переноса заголовок следующего раздела встаёт под шапкой, а
         нижняя граница предыдущего оказывается на восемьдесят пикселей
         ниже верхнего края экрана — то есть условие снова верно. Любое
         движение колеса вниз возвращало на то же место, и страница
         запиралась: замер показал качели между 3489 и 3568 пикселями у
         «Направлений», из которых нет выхода ни вниз, ни вверх — на
         девятьсот миллисекунд после каждого прыжка колесо ещё и молчит.

         Первый экран остаётся как был: там прыжок в одну сторону и
         возврата в ту же точку не бывает.                          */
    }, { passive: false });
  })();

  /* Часы в полосе со слоганом: текущее время посетителя, двоеточие
     гаснет на каждый второй такт — как на электронном табло.    */
  (function () {
    var box = document.getElementById('lpClock');
    if (!box) return;
    var hh = document.getElementById('lpH'), mm = document.getElementById('lpM');
    function tick() {
      var d = new Date();
      hh.textContent = ('0' + d.getHours()).slice(-2);
      mm.textContent = ('0' + d.getMinutes()).slice(-2);
      box.classList.toggle('tick', d.getSeconds() % 2 === 1);
    }
    tick();
    setInterval(tick, 1000);
  })();

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
        Array.prototype.forEach.call(sel.options, function (o) {
          if (o.value === prefill) sel.value = o.value;
        });
        sel.dispatchEvent(new Event('change'));
      }
    }
    scrollToId(id);
  });

  document.addEventListener('click', function (e) {
    var l = e.target.closest('a[data-legal]');
    if (!l) return;
    e.preventDefault();
    openLegal(l.getAttribute('data-legal'));
  });


  /* ── Правовые документы ───────────────────────────────────────────
     Сайт одностраничный, поэтому «Условия» и «Политика» открываются
     окном поверх страницы, а не отдельным адресом. Текст берётся из
     legal.js на языке посетителя; если языка там нет — английский. */
  var legalBox = null;

  function openLegal(kind) {
    if (!window.LEGAL) return;
    var lang = (window.I18N && I18N.current) || 'ru';
    var pack = LEGAL[lang] || LEGAL.en;
    var doc = pack[kind];
    if (!doc) return;

    if (!legalBox) {
      legalBox = document.createElement('div');
      legalBox.className = 'legal-gate';
      legalBox.setAttribute('role', 'dialog');
      legalBox.setAttribute('aria-modal', 'true');
      document.body.appendChild(legalBox);
      legalBox.addEventListener('click', function (e) {
        if (e.target === legalBox || e.target.closest('.legal-close')) closeLegal();
      });
    }

    var html = '<div class="legal-in"><button class="legal-close" type="button" aria-label="' +
               ((window.I18N && I18N.t('aria.close', 'Закрыть')) || 'Закрыть') + '">' +
               '<span></span><span></span></button>' +
               '<h2>' + doc.title + '</h2><p class="legal-upd">' + pack.upd + '</p>';
    doc.lead.forEach(function (t) { html += '<p class="legal-lead">' + t + '</p>'; });
    doc.s.forEach(function (sec) {
      html += '<h3>' + sec[0] + '</h3>';
      var body = (typeof sec[1] === 'string') ? [sec[1]] : sec[1];
      body.forEach(function (t) {
        html += '<p>' + t.split('\n').join('<br>') + '</p>';
      });
    });
    html += '</div>';
    legalBox.innerHTML = html;

    legalBox.hidden = false;
    requestAnimationFrame(function () { legalBox.classList.add('on'); });
    document.body.style.overflow = 'hidden';
  }

  function closeLegal() {
    if (!legalBox) return;
    legalBox.classList.remove('on');
    document.body.style.overflow = '';
    setTimeout(function () { legalBox.hidden = true; }, 380);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLegal();
  });

  /* ── 2. Шапка ─────────────────────────────────────────────────────── */
  var floatWa = document.getElementById('floatWa');
  var lastY = window.pageYOffset;

  function onScroll() {
    var y = window.pageYOffset;
    nav.classList.toggle('solid', y > 40);
    nav.classList.toggle('hide', y > 640 && y > lastY && !document.body.classList.contains('drawer-open'));
    floatWa.classList.toggle('on', y > 720);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 3. Активный пункт меню ───────────────────────────────────────── */
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

  /* ── 4. Мобильная шторка ──────────────────────────────────────────── */
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
  var burgerHandled = false;    // выбор уже сделан ведением
  var openedByPointer = false;  // шторку открыло нажатие, а не click
  burger.addEventListener('click', function () {
    // Браузер шлёт click вслед за pointerup. Если шторку открыло само
    // нажатие или ведение уже выполнило переход, click ничего не делает —
    // иначе обычный тап открывал бы и тут же закрывал шторку.
    if (burgerHandled) { burgerHandled = false; openedByPointer = false; return; }
    if (openedByPointer) { openedByPointer = false; return; }
    drawer.hidden ? openDrawer() : closeDrawer();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* Выбор пункта одним движением: палец кладут на значок меню, шторка
     выезжает, и, не отрывая пальца, ведут вниз по списку. Пункт под
     пальцем подсвечивается и растёт, отпустили — переход выполнен.

     Почему указатели, а не touch: pointer-события одинаковы для пальца,
     пера и мыши, а setPointerCapture гарантирует, что все move и up
     придут значку, даже когда палец уже далеко за его пределами.     */
  var dragHot = null;      // пункт под пальцем
  var dragMoved = false;   // было ли движение — иначе это обычное нажатие

  function markHot(node) {
    if (dragHot === node) return;
    if (dragHot) dragHot.classList.remove('hot');
    dragHot = node;
    if (dragHot) dragHot.classList.add('hot');
  }

  function itemAt(x, y) {
    var el = document.elementFromPoint(x, y);
    return el ? el.closest('.drawer-links a') : null;
  }

  burger.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragMoved = false;
    markHot(null);
    if (drawer.hidden) { openDrawer(); openedByPointer = true; }
    try { burger.setPointerCapture(e.pointerId); } catch (err) {}
  });

  burger.addEventListener('pointermove', function (e) {
    if (!burger.hasPointerCapture || !burger.hasPointerCapture(e.pointerId)) return;
    if (drawer.hidden) return;
    dragMoved = true;
    markHot(itemAt(e.clientX, e.clientY));
    // Пока ведём по списку, страница под шторкой не должна прокручиваться.
    if (dragHot) e.preventDefault();
  });

  function endDrag(e) {
    try { burger.releasePointerCapture(e.pointerId); } catch (err) {}
    var target = dragHot;
    markHot(null);
    // Просто нажали и отпустили на значке — обычное открытие шторки,
    // её закрытие остаётся на click.
    if (!target || !dragMoved) return;
    e.preventDefault();
    burgerHandled = true;    // click после этого не должен закрыть шторку
    target.click();
  }
  burger.addEventListener('pointerup', endDrag);
  burger.addEventListener('pointercancel', function (e) {
    try { burger.releasePointerCapture(e.pointerId); } catch (err) {}
    markHot(null);
  });

  /* То же движение работает и внутри самой шторки: её можно открыть
     нажатием, а потом вести пальцем по списку с тем же откликом.    */
  var links = document.querySelector('.drawer-links');
  if (links) {
    links.addEventListener('pointerdown', function (e) {
      var it = itemAt(e.clientX, e.clientY);
      if (!it) return;
      markHot(it);
      try { links.setPointerCapture(e.pointerId); } catch (err) {}
    });
    links.addEventListener('pointermove', function (e) {
      if (!links.hasPointerCapture || !links.hasPointerCapture(e.pointerId)) return;
      markHot(itemAt(e.clientX, e.clientY));
    });
    links.addEventListener('pointerup', function (e) {
      if (!links.hasPointerCapture || !links.hasPointerCapture(e.pointerId)) return;
      try { links.releasePointerCapture(e.pointerId); } catch (err) {}
      var target = dragHot;
      markHot(null);
      if (target) { e.preventDefault(); target.click(); }
    });
    links.addEventListener('pointercancel', function () { markHot(null); });
  }

  /* ── 5. Появление блоков ──────────────────────────────────────────── */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      revealIO.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });

  // Первый экран показываем сразу. Наблюдатель обрезает нижние 7% вьюпорта,
  // и полоса с цифрами, стоящая ровно по нижнему краю, в эту слепую зону
  // попадает и без прокрутки не проявляется вовсе.
  requestAnimationFrame(function () {
    document.querySelectorAll('.hero .reveal').forEach(function (el) {
      revealIO.unobserve(el);
      el.classList.add('in');
    });
  });

  /* ── 5a. Видеофон первого экрана ──────────────────────────────────
     Показываем ролик только когда он реально может играть, иначе под
     ним остаётся снимок. При «уменьшить движение» ставим на паузу —
     полноэкранное видео это ровно то, от чего такая настройка спасает. */
  var heroVid = document.querySelector('.hero-bg video');
  if (heroVid) {
    if (reduced) {
      heroVid.autoplay = false;
      heroVid.pause();
    } else {
      var showVid = function () { heroVid.classList.add('on'); };
      // Ролик, вшитый в страницу как data-URI, успевает догрузиться до того,
      // как скрипт навесит слушателя, — тогда canplay уже не придёт.
      if (heroVid.readyState >= 3) showVid();
      heroVid.addEventListener('loadeddata', showVid);
      heroVid.addEventListener('canplay', showVid);
      // Safari на iOS иногда отказывает в автозапуске молча
      var kick = heroVid.play();
      if (kick && kick.catch) kick.catch(function () {});
    }
  }

  /* ── 6. Параллакс ─────────────────────────────────────────────────── */
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

  /* ── 7. Реестр услуг ──────────────────────────────────────────────
     Широкий экран: слева опись, справа прилипшая сцена. Клик по строке
     переносит её описание на сцену — страница при этом не прыгает.
     Узкий экран: сцены нет, описание раскрывается прямо под строкой.
     Разметка одна, ветвится только поведение.                        */
  var rows = Array.prototype.slice.call(document.querySelectorAll('[data-svc]'));
  var stage = document.getElementById('svcStage');
  var wide = window.matchMedia('(min-width: 981px)');
  var current = rows.filter(function (r) { return r.hasAttribute('data-first'); })[0] || rows[0];

  function paintStage(row) {
    if (!stage || !row) return;
    var src = row.querySelector('.svc-detail');
    if (!src) return;
    var copy = src.cloneNode(true);
    /* Заголовок в карточку не ставим: то же название только что нажато
       в списке слева, и повторять его внутри незачем — освободившееся
       место отдано снимку.                                          */
    stage.innerHTML = '';
    stage.appendChild(copy);
  }

  function setRow(row, on) {
    row.classList.toggle('on', on);
    row.querySelector('.svc-head').setAttribute('aria-expanded', on ? 'true' : 'false');
  }

  function scrollTo(top) {
    window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
  }

  /* Широкий экран. После выбора услуги страница подкручивается так, чтобы
     выполнились два условия сразу: карточка справа видна целиком и
     следующая строка списка показалась под выбранной. Второе и избавляет
     от колеса — идя по списку сверху вниз, следующую кнопку не приходится
     искать, она сама выходит на экран.

     Двигаем ровно на нужное и не больше: выбранная строка не должна уйти
     под шапку, по ней кликают повторно, чтобы вернуться.             */
  function reachNext(row, again) {
    var need = 0;

    if (stage) {
      var sb = stage.getBoundingClientRect();
      need = sb.bottom - (window.innerHeight - 16);
    }

    var next = rows[rows.indexOf(row) + 1];
    if (next) {
      var nb = next.getBoundingClientRect();
      need = Math.max(need, nb.bottom - (window.innerHeight - 18));
    }
    if (need <= 1) return;

    var head = row.querySelector('.svc-head').getBoundingClientRect();
    var room = head.top - (nav.offsetHeight + 12);
    if (room <= 1) return;

    scrollTo(window.pageYOffset + Math.min(need, room));
    if (again) setTimeout(function () { reachNext(row, false); }, 520);
  }

  /* Узкий экран. Ждём конца раскрытия и только потом считаем позицию:
     гармошка едет 0,62 с, и мерить на полпути — значит промахнуться.
     Раскрытая строка встаёт под шапку: так видно и описание, и то, что
     идёт следом, а до следующей кнопки остаётся один короткий жест. */
  function afterOpen(row, run) {
    var body = row.querySelector('.svc-body');
    var done = false;
    function fire() {
      if (done) return;
      done = true;
      if (body) body.removeEventListener('transitionend', onEnd);
      run();
    }
    function onEnd(e) {
      if (e.target === body && e.propertyName === 'grid-template-rows') fire();
    }
    if (body && !reduced) {
      body.addEventListener('transitionend', onEnd);
      setTimeout(fire, 780);        // страховка, если переход не доедет
    } else {
      setTimeout(fire, 40);
    }
  }

  function activate(row) {
    rows.forEach(function (r) { if (r !== row) setRow(r, false); });
    setRow(row, true);
    current = row;
    if (wide.matches) paintStage(row);
  }

  rows.forEach(function (row) {
    row.querySelector('.svc-head').addEventListener('click', function () {
      if (wide.matches) { activate(row); reachNext(row, true); return; }

      // узкий экран — обычная гармошка, одна открытая строка
      var open = row.classList.contains('on');

      /* Отступ сверху решаем здесь, по картинке, которую видит человек в
         момент нажатия, а не после раскрытия: гармошка успевает сдвинуть
         строку, и замер «после» давал ложный ответ. Если строка уходит
         вниз и лежит ниже 640px, шапка при прокрутке спрячется сама —
         значит место под неё не нужно, и строка встаёт вплотную к верху.
         Раньше из-за зарезервированных 82px над карточкой оставался хвост
         предыдущего блока, и она не помещалась в экран.               */
      var atClick = row.querySelector('.svc-head').getBoundingClientRect().top;
      var absTop = window.pageYOffset + atClick;
      var pad = (atClick > 1 && absTop > NAV_HIDES_AFTER) ? 6 : nav.offsetHeight + 12;

      rows.forEach(function (r) { setRow(r, false); });
      if (open) return;
      setRow(row, true);
      current = row;
      afterOpen(row, function () {
        function place(again) {
          var head = row.querySelector('.svc-head').getBoundingClientRect();
          var target = window.pageYOffset + head.top - pad;
          target = Math.max(0, Math.min(target,
            document.documentElement.scrollHeight - window.innerHeight));
          if (Math.abs(target - window.pageYOffset) < 6) return;
          scrollTo(target);
          if (again) setTimeout(function () { place(false); }, 520);
        }
        place(true);
      });
    });
  });

  // На широком экране сцена не должна быть пустой — открываем первую строку.
  // На узком гармошка стартует закрытой: раскрытая по умолчанию строка
  // отодвигает остальные семь за экран.
  if (current && wide.matches) activate(current);

  var onWide = function () {
    if (wide.matches && current) activate(current);
  };
  if (wide.addEventListener) wide.addEventListener('change', onWide);
  else if (wide.addListener) wide.addListener(onWide);

  /* ── 8. Счётчики ──────────────────────────────────────────────────── */
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var node = en.target;
      var to = parseInt(node.getAttribute('data-count'), 10) || 0;
      var t0 = performance.now(), dur = 1400;
      (function step(now) {
        var p = Math.min((now - t0) / dur, 1);
        node.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
      countIO.unobserve(node);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (n) { countIO.observe(n); });

  /* ── 9. Год ───────────────────────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── 9a. Языки ────────────────────────────────────────────────────
     При первом заходе показываем плашку выбора. Язык при этом уже
     применён по данным браузера — посетитель читает её на своём и
     либо соглашается, либо меняет. Выбор запоминается, при следующих
     заходах плашка не появляется.                                   */
  var gate = document.getElementById('langGate');
  var langList = document.getElementById('langList');
  var langCode = document.getElementById('langCode');

  function paintLangList() {
    if (!langList) return;
    langList.innerHTML = '';
    I18N.langs.forEach(function (l) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-lang', l.code);
      if (l.code === I18N.current) b.setAttribute('aria-current', 'true');
      b.innerHTML = '<b>' + l.native + '</b><i>' + l.label + '</i>';
      li.appendChild(b);
      langList.appendChild(li);
    });
  }

  function openGate() {
    if (!gate) return;
    paintLangList();
    gate.hidden = false;
    requestAnimationFrame(function () { gate.classList.add('on'); });
    document.body.style.overflow = 'hidden';
  }

  function closeGate() {
    if (!gate || gate.hidden) return;
    gate.classList.remove('on');
    document.body.style.overflow = '';
    setTimeout(function () { gate.hidden = true; }, 600);
  }

  function setLang(code) {
    I18N.apply(code);
    if (langCode) langCode.textContent = code.toUpperCase();
    paintLangList();
  }

  if (window.I18N) {
    var stored = I18N.saved();
    setLang(stored || I18N.guess());
    if (!stored) setTimeout(openGate, 420);

    if (gate) {
      gate.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-lang]');
        if (b) { setLang(b.getAttribute('data-lang')); closeGate(); return; }
        if (e.target === gate) closeGate();   // клик по фону — принять текущий
      });
    }
    ['langBtn', 'langBtnMob'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function () { closeDrawer(); openGate(); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeGate();
    });

    // форма пересобирается на новом языке, введённое сохраняется
    document.addEventListener('langchange', function () {
      if (window.conciergeForm && window.conciergeForm.relang) window.conciergeForm.relang();
    });
  }

  /* ── 10. Монтаж формы ─────────────────────────────────────────────
     Транспорт по умолчанию — консоль: форма работает и данные видно,
     но никуда не улетают. Бэкенд подключается заменой одной строки.  */
  if (window.RequestForm) {
    window.conciergeForm = RequestForm.mount('#request-form-mount', {
      formId: 'concierge-request',
      whatsappPhone: '5521977770800',
      transport: RequestForm.transports.console()
      // transport: RequestForm.transports.http('https://api.yourdomain.com/requests')
      // transport: RequestForm.transports.telegramBot('BOT_TOKEN', 'CHAT_ID')
    });
  }
})();

/* ── Верх стеклянной полосы витрины ─────────────────────────────
   Полоса начинается по верху прописных в заголовке «Ваше время».
   Расстояние от края сетки до этой линии складывается из скрытой
   строки рубрики и полудюжины clamp'ов — в CSS его не выразить,
   поэтому считаем здесь и отдаём в --lp-glass-top.

   Берём offsetTop, а не getBoundingClientRect: он измеряет саму
   раскладку и не зависит ни от прокрутки, ни от transform, которым
   колонки выезжают при появлении. Отсчёт у offsetTop идёт от
   padding-box ближайшего позиционированного предка — это .lp-grid,
   то есть ровно та же система координат, что у top псевдоэлемента.

   .155em — путь от верха строки до верха прописных: половина
   интерлиньяжа плюс просвет над капителью, снято с метрик шрифта. */
(function(){
  var grid = document.querySelector('.lp-grid');
  var head = document.querySelector('.lp-philosophy .lp-h');
  if (!grid || !head) return;
  var last = null;
  function place(){
    if (window.innerWidth < 981){
      if (last !== null){ grid.style.removeProperty('--lp-glass-top'); last = null; }
      return;
    }
    var fs = parseFloat(getComputedStyle(head).fontSize) || 0;
    var v = Math.round((head.offsetTop + fs * 0.155) * 10) / 10;
    if (v !== last){ last = v; grid.style.setProperty('--lp-glass-top', v + 'px'); }
  }
  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  /* Раскладка витрины устаканивается не сразу: примерно через
     секунду после загрузки содержимое колонки сдвигается вниз на
     десяток пикселей — колонка выстроена флексом со свободным
     местом, и оно перераспределяется, когда доигрывает появление.
     Ни высота колонки, ни высота заголовка при этом не меняются,
     поэтому ResizeObserver молчит: ловим переход и добираем
     несколькими отложенными замерами. */
  grid.addEventListener('transitionend', place);
  [400, 1200, 2500].forEach(function(ms){ setTimeout(place, ms); });
  /* Смотрим не только за сеткой, но и за самим заголовком. Когда
     подгружается начертание, его высота меняется, и место внутри
     колонки перераспределяется: у рубрики margin-bottom:auto, и
     заголовок съезжает вниз на десяток пикселей. Высота колонки при
     этом не меняется — наблюдения за одной сеткой не хватает. */
  if (window.ResizeObserver){
    var ro = new ResizeObserver(place);
    ro.observe(grid); ro.observe(head);
    var col = head.closest('.lp-col'); if (col) ro.observe(col);
  }
})();



/* ── Стеклянные панели витрины ───────────────────────────────────
   Три панели — под левым блоком, под списком услуг и под правым —
   стоят на одной верхней и одной нижней линии.

   Нижняя линия — низ списка услуг: под ним всего несколько пикселей
   до нижней строки витрины, ниже опускаться некуда. Верхняя — самый
   высокий набор из трёх колонок минус поле; выше всех обычно левый
   блок, поэтому по нему всё и равняется.

   Ширину боковых панелей берём одинаковую: наибольшая из двух колонок
   плюс поля. В CSS этого не выразить — колонки разной ширины, строки
   разной длины, и на разных окнах шире оказывается то левая, то
   правая.                                                          */
(function () {
  var grid = document.querySelector('.lp-grid');
  var ph   = document.querySelector('.lp-philosophy');
  var de   = document.querySelector('.lp-dest');
  var list = document.querySelector('.lp-services .lp-list');
  if (!grid || !ph || !de || !list) return;

  var PAD = 26;      /* поля по бокам                             */
  var PAD_TOP = 10;  /* сверху меньше: владелец просил ниже панели */
  var PAD_BOT = 6;   /* столько же снизу у боковых                 */
  var last = '';

  /* Истинные границы набора: по строкам текста, а не по блокам —
     блок всегда во всю колонку и ничего о наборе не говорит.      */
  function ink(root) {
    var l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var n;
    while ((n = walk.nextNode())) {
      if (!n.textContent.trim()) continue;
      /* Рубрика «Философия Montero» стоит в разметке, но погашена
         через visibility:hidden — место занимает, чернил не даёт.
         Панель считалась вместе с ней и начиналась на три десятка
         пикселей выше видимого текста. Такие узлы пропускаем.     */
      var host = n.parentElement;
      if (host && getComputedStyle(host).visibility !== 'visible') continue;
      var rg = document.createRange();
      rg.selectNodeContents(n);
      var boxes = rg.getClientRects();
      for (var i = 0; i < boxes.length; i++) {
        var q = boxes[i];
        if (!q.width || !q.height) continue;
        if (q.left   < l) l = q.left;
        if (q.top    < t) t = q.top;
        if (q.right  > r) r = q.right;
        if (q.bottom > b) b = q.bottom;
      }
    }
    return (l === Infinity) ? null : { l:l, t:t, r:r, b:b };
  }

  function clear() {
    [ph, de].forEach(function (el) {
      el.style.removeProperty('--sg-w');
      el.style.removeProperty('--sg-h');
      el.style.removeProperty('--sg-x');
      el.style.removeProperty('--sg-y');
    });
    list.style.removeProperty('--cg-y');
  }

  function place() {
    if (window.innerWidth < 981) {
      if (last !== 'off') { clear(); last = 'off'; }
      return;
    }
    var a = ink(ph), c = ink(de);
    if (!a || !c) return;
    var lb = list.getBoundingClientRect();

    var top = Math.min(a.t, c.t, lb.top) - PAD_TOP;
    /* Нижняя линия — по самому низкому из трёх наборов. Списку хватает
       его собственного края, боковым добавляем маленькое поле, иначе
       последняя строка упиралась бы в грань.                       */
    var bottom = Math.max(lb.bottom, a.b + PAD_BOT, c.b + PAD_BOT);
    var h = Math.round(bottom - top);
    var w = Math.round(Math.max(a.r - a.l, c.r - c.l) + PAD * 2);

    var pb = ph.getBoundingClientRect(), db = de.getBoundingClientRect();
    var px = Math.round(a.l - PAD - pb.left);
    /* Правая панель прижата к правому краю своего набора, левая — к
       левому: обе смотрят наружу, к краям страницы.               */
    var dx = Math.round(c.r + PAD - w - db.left);
    var py = Math.round(top - pb.top), dy = Math.round(top - db.top);
    var cy = Math.round(top - lb.top);

    var key = [w, h, px, py, dx, dy, cy].join('|');
    if (key === last) return;
    last = key;

    ph.style.setProperty('--sg-w', w + 'px');
    ph.style.setProperty('--sg-h', h + 'px');
    ph.style.setProperty('--sg-x', px + 'px');
    ph.style.setProperty('--sg-y', py + 'px');
    de.style.setProperty('--sg-w', w + 'px');
    de.style.setProperty('--sg-h', h + 'px');
    de.style.setProperty('--sg-x', dx + 'px');
    de.style.setProperty('--sg-y', dy + 'px');
    list.style.setProperty('--cg-y', cy + 'px');
  }

  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  grid.addEventListener('transitionend', place);
  [400, 1200, 2500].forEach(function (ms) { setTimeout(place, ms); });
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(place);
    ro.observe(grid); ro.observe(ph); ro.observe(de); ro.observe(list);
  }
})();

/* ── Первый экран по пиксельной сетке ────────────────────────────
   Владелец увидел ступеньки на скруглениях рамки и рваные буквы.
   Причина не в скруглении, а в дробных координатах: сдвиг знака
   задан в сантиметрах (2cm = 75.59px), поля рамки — в долях кегля,
   ширина — по тексту. Рамка вставала на 409.94 при ширине 1100.13,
   то есть каждая её грань ложилась между экранными точками и
   размазывалась на две с половинной яркостью. Дуга из таких точек и
   читается ступеньками, а текст внутри теряет штрихи.

   Здесь всё, что рисует первый экран, кладётся на сетку экрана:
   сдвиг знака, ширина, высота и левый верхний угол рамки округляются
   до целого числа физических точек (в дробном масштабе Windows —
   125% или 150% — это не целый пиксель CSS, поэтому делим на
   devicePixelRatio). Толщина волоска тоже приводится к целому числу
   точек: при 125% это .8px CSS, ровно одна точка, и линия перестаёт
   быть полупрозрачной.

   Размеры снимаем после сброса прежних значений, иначе замер вернёт
   уже округлённое и ошибка накопится. Пересчёт — на всех событиях,
   которые меняют раскладку: поворот, зум (меняет dpr), подгрузка
   шрифтов, смена языка (следим за размером самой строки).

   Только компьютер: на телефоне рамка своя, её не трогаем.      */
(function () {
  var lock  = document.querySelector('.hero-in .lockup');
  var claim = document.querySelector('.hero-in .lk-claim');
  if (!lock || !claim) return;

  /* Последний экран владелец попросил сделать таким же, как первый:
     то же золото, то же скругление рамки, тот же кегль. Всё это уже
     описано для .hero-in двумя десятками правил, часть из которых
     привязана к высоте окна, — переписывать их второй раз значит
     заводить копию, которая разойдётся с оригиналом при первой же
     правке. Поэтому знаку внизу просто выдаём тот же класс.

     Выдаём его только на компьютере: у .hero-in есть и мобильные
     правила (сдвиг знака, подложка под ним), а телефонная версия
     последнего экрана меняться не должна. */
  var last = document.querySelector('.final-in');
  var lastLock  = last && last.querySelector('.lockup');
  var lastClaim = last && last.querySelector('.lk-claim');

  var SHIFT = 76;            /* два сантиметра, приведённые к целому */
  var rules = [].slice.call(lock.querySelectorAll('.lk-sub i'));
  var lastRules = lastLock ? [].slice.call(lastLock.querySelectorAll('.lk-sub i')) : [];
  var on = false;

  function reset(cl, rl) {
    if (cl) {
      cl.style.removeProperty('translate');
      cl.style.removeProperty('width');
      cl.style.removeProperty('height');
    }
    rl.forEach(function (i) {
      i.style.removeProperty('translate');
      i.style.removeProperty('height');
    });
  }

  function clear() {
    lock.style.removeProperty('translate');
    document.documentElement.style.removeProperty('--hair');
    reset(claim, rules);
    reset(lastClaim, lastRules);
    if (last) last.classList.remove('hero-in');
    on = false;
  }

  /* Кладём рамку и волоски одного знака на сетку экрана */
  function fit(cl, rl, q, hair) {
    if (cl) {
      cl.style.removeProperty('translate');
      cl.style.removeProperty('width');
      cl.style.removeProperty('height');
      var r = cl.getBoundingClientRect();
      cl.style.width  = q(r.width)  + 'px';
      cl.style.height = q(r.height) + 'px';
      var r2 = cl.getBoundingClientRect();
      cl.style.translate = (q(r2.left) - r2.left).toFixed(4) + 'px '
                         + (q(r2.top)  - r2.top ).toFixed(4) + 'px';
    }
    /* Волоски по бокам подписи: высота — целое число точек, верх —
       на границе точки. Иначе линия в одну точку размазывается на
       два ряда вполсилы и рядом со свечением читается грязной. */
    rl.forEach(function (i) {
      i.style.removeProperty('translate');
      i.style.height = hair + 'px';
      var ri = i.getBoundingClientRect();
      i.style.translate = '0 ' + (q(ri.top) - ri.top).toFixed(4) + 'px';
    });
  }

  function snap() {
    if (window.innerWidth < 981) { if (on) clear(); return; }
    on = true;
    if (last) last.classList.add('hero-in');

    var dpr = window.devicePixelRatio || 1;
    var q = function (v) { return Math.round(v * dpr) / dpr; };

    /* Волосок — целым числом физических точек */
    var hair = Math.max(1, Math.round(dpr)) / dpr;
    document.documentElement.style.setProperty('--hair', hair + 'px');

    /* Сдвиг знака: та же формула, что в CSS, но по сетке.
       Внизу сдвига нет — там знак стоит у верхнего края экрана. */
    var shift = Math.min(SHIFT, Math.max(0, (window.innerHeight - 700) / 2));
    lock.style.translate = '0 ' + q(shift) + 'px';

    fit(claim, rules, q, hair);
    fit(lastClaim, lastRules, q, hair);
  }

  snap();
  window.addEventListener('resize', snap, { passive:true });
  window.addEventListener('load', snap);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(snap);
  [400, 1200, 2500].forEach(function (ms) { setTimeout(snap, ms); });
  if (window.ResizeObserver) {
    /* За высотой рамки следить нельзя — мы её сами задаём. Следим за
       строкой внутри: она меняется при смене языка и подгрузке шрифта. */
    var ro = new ResizeObserver(snap);
    var line = claim.querySelector('b');
    if (line) ro.observe(line);
    var lastLine = lastClaim && lastClaim.querySelector('b');
    if (lastLine) ro.observe(lastLine);
  }
})();

/* ── Подчёркивание в заголовках разделов ─────────────────────────
   На телефоне линия под последним словом отмерена от низа строчного
   поля: заголовки там прописными, выносных элементов нет, и .95em
   проходит в трёх пикселях под буквами. На компьютере заголовки
   строчные — у «реализуем» вниз уходят «р» и «у», и та же линия
   резала бы их насквозь.

   Поэтому глубину считаем для каждого заголовка отдельно. Метрики
   берём у самого шрифта через canvas: fontBoundingBoxAscent даёт
   базовую линию от верха строчного поля, actualBoundingBoxDescent —
   насколько ниже неё опускаются буквы именно этого слова. Замер по
   пикселям подтвердил: «реализуем» уходит на 1.12em, «обо всём.» —
   на .89em, разница почти в четверть кегля.

   Просвет под буквами держим тот же, что на телефоне, — .045 кегля.
   Толщина линии — те же .044 кегля (1.5px при 34px), округлённые до
   целого числа точек экрана.

   Шрифт обязан быть загружен, иначе canvas вернёт метрики подменного
   шрифта: пересчитываем после fonts.ready и по смене языка.      */
(function () {
  /* Линия висит на самом заголовке — подчёркнут весь текст. В
     «Консьерже» заголовок в две строки, там линия только под
     нижней, поэтому целью остаётся .h-cap. */
  var caps = [].slice.call(document.querySelectorAll(
    '#services .sec-head h2, #destinations .sec-head h2, ' +
    '#request .sec-head h2, #concierge .sec-head h2'));
  if (!caps.length) return;

  var GAP = .045;            /* просвет под буквами, доля кегля      */
  var WEIGHT = .044;         /* толщина линии, доля кегля            */
  var ctx = null, on = false;

  function measure(el) {
    if (!ctx) {
      var cv = document.createElement('canvas');
      ctx = cv.getContext && cv.getContext('2d');
      if (!ctx) return null;
    }
    var cs = getComputedStyle(el);
    ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    /* Мерить надо то, что видно на экране. textContent отдаёт исходную
       строку — строчными, — а заголовки набраны прописными: у «Что мы
       реализуем» в исходнике есть «у» и «р», и замер добавлял их
       выносные там, где на экране одни капители. Из-за этого линия под
       тремя заголовками уходила ниже, чем под «Консьержем», хотя шрифт
       и кегль одни. Применяем ту же трансформацию, что и CSS. */
    var txt = el.textContent || '';
    var tt = cs.textTransform;
    if (tt === 'uppercase') txt = txt.toUpperCase();
    else if (tt === 'lowercase') txt = txt.toLowerCase();
    var m = ctx.measureText(txt);
    if (!m || m.fontBoundingBoxAscent == null) return null;
    return m.fontBoundingBoxAscent + (m.actualBoundingBoxDescent || 0);
  }

  function place() {
    if (window.innerWidth < 981) {
      if (on) {
        caps.forEach(function (c) {
          c.style.removeProperty('--cap-top');
          c.style.removeProperty('--cap-line');
          c.style.removeProperty('font-size');
        });
        on = false;
      }
      return;
    }
    on = true;
    var dpr = window.devicePixelRatio || 1;
    var q = function (v) { return Math.round(v * dpr) / dpr; };

    /* Первый проход — кегль и глубина букв у каждого заголовка */
    var rows = [];
    caps.forEach(function (c) {
      /* Страховка на чужой язык: доли vw в CSS посчитаны по русским
         строкам, и если перевод окажется длиннее, заголовок вылезет
         за колонку. Меряем и подрезаем кегль до 88% ширины шапки. */
      c.style.removeProperty('font-size');
      var host = c.parentElement;
      var avail = host ? host.getBoundingClientRect().width : 0;
      var wide  = c.getBoundingClientRect().width;
      var fs = parseFloat(getComputedStyle(c).fontSize) || 0;
      if (!fs) return;
      if (avail > 0 && wide > avail * 0.88) {
        fs = q(fs * (avail * 0.88) / wide);
        c.style.fontSize = fs + 'px';
      }
      var ink = measure(c);
      if (ink == null) return;
      rows.push({ el:c, fs:fs, ink:ink });
    });
    if (!rows.length) return;

    /* Глубина у всех одна — по самому «низкому» заголовку.

       В прописной кириллице ноги ниже строки есть у «Д»: в
       «ГЕОГРАФИЯ НАШЕЙ ДЕЯТЕЛЬНОСТИ» и «ОСТАЛЬНОЕ НАШЕ ДЕЛО» буквы
       уходят на .39 кегля, а в «ЧТО МЫ РЕАЛИЗУЕМ» и «ПОЗВОЛЬТЕ НАМ
       ПОЗАБОТИТЬСЯ ОБО ВСЁМ» их нет и линия вставала на .26 — четыре
       раздела выглядели набранными по-разному. Берём наибольшую долю
       и отдаём всем: линия нигде не режет «Д» и везде идёт на одном
       расстоянии от букв. */
    var deep = 0;
    rows.forEach(function (r) { deep = Math.max(deep, r.ink / r.fs); });

    rows.forEach(function (r) {
      /* Линия — низ фигуры высотой .70em, поэтому верх слоя это
         «низ букв + просвет» минус её высота. */
      r.el.style.setProperty('--cap-top',  q((deep + GAP - .70) * r.fs) + 'px');
      r.el.style.setProperty('--cap-line', q(Math.max(1, WEIGHT * r.fs)) + 'px');
    });
  }

  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  [400, 1200, 2500].forEach(function (ms) { setTimeout(place, ms); });
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(place);
    caps.forEach(function (c) { ro.observe(c); });
  }
})();

/* ── Карточки направлений по пиксельной сетке ────────────────────
   Сетка делит свободную ширину на четыре доли, и при окне 1920
   колонка выходила 434.5px — половина точки. Кант карточки на таком
   краю размазывается, а скругление читается ступеньками, ровно как
   было у рамки заявления.

   Считаем колонку сами: берём ширину полосы, вычитаем поля и три
   промежутка, делим на четыре и округляем вниз до целой точки
   экрана. Остаток отдаём боковым полям поровну — карточки остаются
   по центру. Высоту снимка задаём числом: 4/5 от целой ширины опять
   давало половину точки на стыке с текстом.

   Высоту карточек равняем по самой высокой и тоже кладём на сетку,
   чтобы нижний кант был сплошной линией, а не серой полосой.

   Исходные поля полосы запоминаем один раз: если брать их заново
   после того, как мы их переписали, счёт пойдёт от собственного
   результата и колонка поедет с каждым пересчётом.

   Число колонок не зашито: читаем его у самой сетки, поэтому на
   промежуточных ширинах, где колонок меньше, счёт остаётся верным. */
(function () {
  var bands = document.querySelector('#destinations .bands');
  if (!bands) return;
  var ins = [].slice.call(bands.querySelectorAll('.band-in'));
  if (!ins.length) return;

  var base = getComputedStyle(bands);
  var PAD_L = parseFloat(base.paddingLeft)  || 0;
  var PAD_R = parseFloat(base.paddingRight) || 0;
  var GAP   = parseFloat(base.columnGap)    || 0;
  var on = false, last = '';

  function clear() {
    bands.style.removeProperty('grid-template-columns');
    bands.style.removeProperty('column-gap');
    bands.style.removeProperty('padding-left');
    bands.style.removeProperty('padding-right');
    ins.forEach(function (el) {
      el.style.removeProperty('height');
      var pl = el.querySelector('.band-plate');
      if (pl) pl.style.removeProperty('height');
    });
    on = false; last = '';
  }

  function place() {
    if (window.innerWidth < 981) { if (on) clear(); return; }
    on = true;

    var dpr = window.devicePixelRatio || 1;
    var q  = function (v) { return Math.round(v * dpr) / dpr; };
    var qd = function (v) { return Math.floor(v * dpr) / dpr; };

    var n = getComputedStyle(bands).gridTemplateColumns.split(' ').filter(Boolean).length;
    var total = bands.getBoundingClientRect().width;   /* от полей не зависит */
    if (n < 1 || !(total > 0)) return;

    /* Промежуток тоже кладём на сетку: при масштабе 125% тридцать
       пикселей CSS — это 37.5 точки, и вторая, третья и четвёртая
       карточки вставали на половину точки.

       Шаг берём не в одну точку, а в наименьший, который заодно
       представим в 1/64 пикселя CSS — с такой точностью браузер
       хранит раскладку. При 125% это четыре пикселя CSS (пять
       точек): иначе ширину 284.8 он округлит до 284.796875, и к
       четвёртой карточке набежит смещение. */
    var m = 1;
    while (m < 64 && ((m * 64) / dpr) % 1 !== 0) m++;
    var step = m / dpr;
    var qs = function (v) { return Math.floor(v / step) * step; };

    var gap  = qs(GAP);
    var col  = qs((total - PAD_L - PAD_R - gap * (n - 1)) / n);
    if (!(col > 0)) return;
    var side = q((total - (col * n + gap * (n - 1))) / 2);

    var sig = n + ':' + col + ':' + side + ':' + gap + ':' + dpr;
    if (sig !== last) {
      last = sig;
      bands.style.gridTemplateColumns = 'repeat(' + n + ', ' + col + 'px)';
      bands.style.columnGap = gap + 'px';
      bands.style.paddingLeft  = side + 'px';
      bands.style.paddingRight = side + 'px';

      /* Снимок: высота числом, чтобы стык с текстом лёг на точку */
      ins.forEach(function (el) {
        var pl = el.querySelector('.band-plate');
        if (!pl) return;
        var ar = getComputedStyle(pl).aspectRatio.split('/');
        var k = (ar.length === 2 && +ar[1] && +ar[0]) ? (+ar[1] / +ar[0]) : 1.25;
        pl.style.height = q(col * k) + 'px';
      });
    }

    /* Высота карточек — по самой высокой, целым числом точек.
       Пишем только при изменении: наблюдатель за размером иначе
       будил бы сам себя по кругу. */
    ins.forEach(function (el) { el.style.removeProperty('height'); });
    var h = 0;
    ins.forEach(function (el) { h = Math.max(h, el.getBoundingClientRect().height); });
    h = Math.ceil(h * dpr) / dpr;
    ins.forEach(function (el) { el.style.height = h + 'px'; });
  }

  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  [400, 1200, 2500].forEach(function (ms) { setTimeout(place, ms); });
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(place);
    ro.observe(bands);
  }
})();

/* -- Форма заявки на последнем экране ----------------------------
   Владелец попросил перенести форму под знак MONTERO внизу страницы.
   Переносим сам узел, а не копию: обработчики, поля и уже введённый
   текст остаются теми же — событие живёт на элементе, а не на месте
   в разметке.

   Только на компьютере. На телефоне форма должна остаться в «Заявке»,
   поэтому при переходе через 981 узел возвращается на прежнее место —
   для этого запоминаем и родителя, и соседа справа.               */
(function () {
  var mount = document.getElementById('request-form-mount');
  var fin   = document.querySelector('.final-in');
  var fsec  = document.querySelector('.final');
  if (!mount || !fin || !fsec) return;

  var home = mount.parentNode;
  var next = mount.nextSibling;
  var moved = false;

  /* Вместе с формой вниз едет и строка «Оставьте заявку…»: владелец
     попросил поставить её под рамку, над самой формой. Узел тот же,
     дорога та же — запоминаем его прежнее место и возвращаем его
     туда на телефоне. */
  var say = document.querySelector('#request .req-say .sec-lede');
  var sayHome = say ? say.parentNode : null;
  var sayNext = say ? say.nextSibling : null;

  /* Метка «IV · Заявка» встаёт над самим знаком — она объявляет
     раздел, а раздел теперь начинается здесь. Дорога та же. */
  var lab = document.querySelector('#request .sec-head .label');
  var labHome = lab ? lab.parentNode : null;
  var labNext = lab ? lab.nextSibling : null;
  var lock = fin.querySelector('.lockup');

  /* Три кнопки связи встают под левую колонку формы, под строку
     «Без предпочтений», и ростом равняются на неё. */
  var dir = document.querySelector('#request .direct');
  var dirHome = dir ? dir.parentNode : null;
  var dirNext = dir ? dir.nextSibling : null;

  /* Подсказка внутри поля вместо подписи над ним — как у эталона.
     Текст берём из самой подписи, звёздочку обязательности убираем:
     она остаётся в разметке для читалок. У списков подсказка своя —
     первая строка («Выберите…», «Без предпочтений»), их не трогаем. */
  function hints(on) {
    [].forEach.call(mount.querySelectorAll('.rf-field'), function (f) {
      var box = f.querySelector('input, textarea');
      if (!box) return;
      if (on) {
        if (box.dataset.ph == null) box.dataset.ph = box.getAttribute('placeholder') || '';
        if (!box.dataset.ph) {
          var lab = f.querySelector('label');
          if (lab) {
            var t = lab.cloneNode(true);
            var star = t.querySelector('.req');
            if (star) star.remove();
            box.setAttribute('placeholder', t.textContent.trim());
          }
        }
      } else if (box.dataset.ph != null) {
        box.setAttribute('placeholder', box.dataset.ph);
      }
    });
  }

  function place() {
    var wide = window.innerWidth >= 981;
    if (wide && !moved) {
      if (lab) fin.insertBefore(lab, lock);
      if (say) fin.appendChild(say);
      fin.appendChild(mount);
      if (dir) {
        var rf = mount.querySelector('.rf');
        if (rf) rf.appendChild(dir);
      }
      fsec.classList.add('has-form');
      hints(true);
      moved = true;
    } else if (!wide && moved) {
      if (lab) labHome.insertBefore(lab, labNext);
      if (say) sayHome.insertBefore(say, sayNext);
      if (dir) dirHome.insertBefore(dir, dirNext);
      home.insertBefore(mount, next);
      fsec.classList.remove('has-form');
      hints(false);
      moved = false;
    }
  }

  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
})();

/* ── Слоган витрины под рамкой заявления ─────────────────────────
   Знак с рамкой сдвинут вниз на два сантиметра, и величина захода
   рамки в полосу слогана меняется с высотой окна. Считаем зазор
   здесь: ставим полосу в ноль, меряем, и сдвигаем ровно настолько,
   чтобы от нижней грани рамки до первой строки слогана осталось
   тридцать четыре пикселя.                                        */
(function () {
  var band  = document.querySelector('.lp-band-in');
  var claim = document.querySelector('.hero-in .lk-claim');
  var slog  = document.querySelector('.lp-slogan');
  if (!band || !claim || !slog) return;

  var last = null;

  /* Верх стеклянных панелей витрины. Панели нарисованы
     псевдоэлементами, и своих узлов у них нет — спрашиваем
     вычисленный отступ прямо у ::before: он уже в пикселях. */
  function panelTop() {
    var best = null;
    ['.lp-philosophy', '.lp-dest', '.lp-services .lp-list'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      var cs = getComputedStyle(el, '::before');
      var off = parseFloat(cs.top);
      if (!isFinite(off)) return;
      var t = el.getBoundingClientRect().top + off;
      if (best === null || t < best) best = t;
    });
    if (best === null) {
      var g = document.querySelector('.lp-grid');
      if (g) best = g.getBoundingClientRect().top;
    }
    return best;
  }

  function place() {
    if (window.innerWidth < 981) {
      if (last !== null) { band.style.removeProperty('--band-y'); last = null; }
      return;
    }
    band.style.setProperty('--band-y', '0px');
    var top = panelTop();
    if (top == null) return;
    /* Ровно посередине между нижней гранью рамки заявления и верхом
       стеклянных панелей: считаем по самой стеклянной коробке
       слогана, а не по строке текста — у коробки есть свои поля. */
    var free = (claim.getBoundingClientRect().bottom + top) / 2;
    var box  = band.getBoundingClientRect();
    var y = Math.round(free - box.height / 2 - box.top);
    if (y === last) { band.style.setProperty('--band-y', y + 'px'); return; }
    last = y;
    band.style.setProperty('--band-y', y + 'px');
  }

  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  [400, 1200, 2500].forEach(function (ms) { setTimeout(place, ms); });
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(place);
    ro.observe(band); ro.observe(claim);
  }
})();

/* ── Номера шагов — вплотную к первому слову ──────────────────────
   Заголовки шагов выключены по центру, а номера стояли у левого края
   колонки: между цифрой и словом зияло больше сотни пикселей.
   Владелец попросил подтянуть цифры к началу слов.

   Числом это не задать: каждый заголовок своей длины, и его левая
   грань зависит от того, сколько места занял набор. Меряем границы
   самого набора диапазоном (Range) — прямоугольник элемента здесь
   бесполезен, он равен всей ширине колонки, — и ставим цифру слева
   от первой буквы с одинаковым просветом.

   Только компьютер: на телефоне у шагов свой строй, номера там
   стоят по-другому, и скрипт ниже 981 возвращает всё как было.   */
(function () {
  var steps = document.querySelector('#concierge .steps');
  if (!steps) return;
  var items = [].slice.call(steps.querySelectorAll('li'));
  if (!items.length) return;

  var GAP = 14, on = false;

  function clear() {
    if (!on) return;
    items.forEach(function (li) {
      var n = li.querySelector('.st-n');
      if (n) n.style.removeProperty('left');
    });
    on = false;
  }

  function place() {
    if (window.innerWidth < 981) { clear(); return; }
    var dpr = window.devicePixelRatio || 1;
    var q = function (v) { return Math.round(v * dpr) / dpr; };
    items.forEach(function (li) {
      var n = li.querySelector('.st-n');
      var h = li.querySelector('h4');
      if (!n || !h) return;
      var r = document.createRange();
      r.selectNodeContents(h);
      var t = r.getBoundingClientRect();
      if (!t.width) return;
      var nw = n.getBoundingClientRect().width;
      n.style.left = q(t.left - GAP - nw - li.getBoundingClientRect().left) + 'px';
    });
    on = true;
  }

  place();
  window.addEventListener('resize', place, { passive:true });
  window.addEventListener('load', place);
  document.addEventListener('langchange', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  [400, 1200, 2500].forEach(function (ms) { setTimeout(place, ms); });
})();
