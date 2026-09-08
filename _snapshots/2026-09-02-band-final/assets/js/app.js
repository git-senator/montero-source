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
    // Откуда и куда перескакивать, когда раздел дочитан до конца.
    var HOPS = [
      ['services',    'destinations'],
      ['destinations', 'concierge'],
      ['concierge',    'request']
    ];

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

      /* Дочитал раздел до конца — одно движение колеса, и мы в следующем.
         Условие простое: нижняя граница раздела уже вошла в экран, значит
         листать внутри него больше нечего. Пока не вошла, колесо работает
         как обычно, иначе длинный список услуг было бы не прокрутить.  */
      if (e.deltaY > 0) {
        /* Идём снизу вверх: на стыке двух разделов условию отвечают оба,
           и уводить надо от нижнего — иначе прыжок вернёт туда, где мы
           уже стоим.                                                */
        for (var i = HOPS.length - 1; i >= 0; i--) {
          var from = document.getElementById(HOPS[i][0]);
          var to   = document.getElementById(HOPS[i][1]);
          if (!from || !to) continue;
          var box = from.getBoundingClientRect();
          /* Раздел дочитан: его нижняя граница уже в экране, а верх ушёл
             выше середины окна. Второе условие нужно для коротких
             разделов, которые помещаются целиком: без него прыжок
             срабатывал бы, едва раздел появился снизу.            */
          if (box.bottom > 0 && box.bottom <= window.innerHeight + 40 &&
              box.top < window.innerHeight * 0.5) {
            e.preventDefault();
            busy = Date.now() + 900;
            scrollToId(HOPS[i][1]);
            return;
          }
        }
      }
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
