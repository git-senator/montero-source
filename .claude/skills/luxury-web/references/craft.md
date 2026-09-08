# Визуальная механика люкса

Готовые приёмы с кодом и грабли, на которые уже наступали в этом проекте.

## Содержание

1. [Металлическое золото](#металлическое-золото)
2. [Палитра и нейтрали](#палитра-и-нейтрали)
3. [Типографика](#типографика)
4. [Ритм и воздух](#ритм-и-воздух)
5. [Движение](#движение)
6. [Фон первого экрана](#фон-первого-экрана)
7. [Ловушки CSS](#ловушки-css)
8. [Ловушки SVG](#ловушки-svg)
9. [Проверка](#проверка)

---

## Металлическое золото

Главное открытие: **металл читается не цветом, а чередованием резких бликов и тёмных полос.** Плавный переход из светлого в тёмное даёт жёлтый пластик. Нужны 12–14 стопов с резкими скачками.

```css
.gold{
  color:#D9BC7A;                    /* фолбэк, если background-clip не поддержан */
  filter:drop-shadow(0 1px 0 rgba(0,0,0,.55)) drop-shadow(0 0 22px rgba(200,169,106,.26));
}
@supports (background-clip:text) or (-webkit-background-clip:text){
  .gold{
    background-image:linear-gradient(177deg,
      #4E3712 0%,  #4E3712 15%,   /* тёмная кромка сверху */
      #A67C2E 21%, #E9D094 28%,
      #FFF9E6 35%,                /* первый блик */
      #E6CB89 42%, #BE9743 48%,
      #7B5A1D 55%,                /* тёмная «талия» */
      #AF8A3B 61%, #E2C886 68%,
      #FFFCF0 75%,                /* второй блик */
      #DCBC72 81%, #8A6828 87%,
      #4E3712 100%);
    -webkit-background-clip:text; background-clip:text;
    -webkit-text-fill-color:transparent;
  }
}
```

**Стопы ставь между 15% и 87%, а не от 0 до 100.** Бокс строки выше самих букв за счёт межстрочного интервала: заглавные занимают примерно 18–84% высоты бокса. Если растянуть градиент на весь бокс, крайние полосы уедут в пустоту и буквы выйдут почти одноцветными.

### Бегущий блик

Два фоновых слоя: узкая светлая полоса поверх металла, анимируется `background-position`.

```css
.gold{
  background-image:
    linear-gradient(104deg, transparent 40%, rgba(255,253,242,.92) 47%,
                    rgba(255,255,255,.62) 51%, transparent 59%),
    linear-gradient(177deg, /* ...металл... */);
  background-size:280% 100%, 100% 100%;
  background-position:-170% 0, 0 0;
  background-repeat:no-repeat;
  animation:glint 7.5s cubic-bezier(.16,1,.3,1) 1.6s infinite;
}
@keyframes glint{
  0%      { background-position:-170% 0, 0 0; }
  36%,100%{ background-position: 280% 0, 0 0; }   /* пауза между проходами */
}
@media (prefers-reduced-motion:reduce){ .gold{ animation:none; } }
```

Интервал 7–9 секунд. Чаще — выглядит дёшево и раздражает.

### Золото — не единственный вариант

Тот же приём с банджированным градиентом работает для серебра (`#3A3A42 → #E8E8EE → #6E6E78`), розового золота (`#6B3A28 → #F2C9B4 → #A0604A`), бронзы. Выбирай под бренд, а не по умолчанию золото.

---

## Палитра и нейтрали

Люкс живёт на трёх цветах: фон, текст, акцент. Четвёртый уже перегружает.

```css
:root{
  --bg:      #0B0B0C;   /* не чистый чёрный: #000 выглядит как дыра */
  --surface: #131315;
  --ink:     #F2EFE9;   /* не чистый белый: тёплый белый мягче */
  --muted:   #8A8780;
  --accent:  #C8A96A;
  --line:    rgba(242,239,233,.12);
}
```

**Нейтрали подкрашивай в сторону акцента.** Чистый серый `#808080` читается как «не выбирали». Тот же серый со сдвигом в тёплое `#8A8780` — как решение.

Тёмная тема — не обязательное условие люкса. Молочный `#F7F5F1` с крупной фотографией работает не хуже (Quintessentially так и сделан). Решай по бренду.

---

## Типографика

**Пара гарнитур, не больше трёх ролей:**

```css
--display: "Playfair Display", "Times New Roman", serif;   /* заголовки */
--sans:    "Tenor Sans", -apple-system, sans-serif;        /* текст и интерфейс */
```

**Шкала.** Задавай через `clamp()`, чтобы не писать десять брейкпоинтов:

```css
.display{ font-size:clamp(2.6rem, 6.2vw, 5.6rem); line-height:1.02; letter-spacing:-.02em; }
.h2     { font-size:clamp(2rem, 4vw, 3.4rem);     line-height:1.1;  letter-spacing:-.015em; }
.h3     { font-size:clamp(1.25rem, 1.8vw, 1.6rem);line-height:1.25; }
.lede   { font-size:clamp(1rem, 1.25vw, 1.1rem);  line-height:1.75; max-width:56ch; }
.label  { font-size:11px; letter-spacing:.2em; text-transform:uppercase; }
```

Три правила, которые дают половину эффекта:

- **Крупный кегль — отрицательный трекинг.** На 60px `letter-spacing:-.02em`, иначе буквы разваливаются.
- **Мелкие капсы — большой трекинг.** `.18em`–`.22em`. Без этого подпись выглядит как ошибка, а не как решение.
- **Строка не длиннее 65 знаков.** `max-width:60ch` на всём длинном тексте.

Заголовкам ставь `text-wrap:balance` — строки разложатся ровнее.

---

## Ритм и воздух

```css
.sec{ padding-block:clamp(72px, 11vw, 150px); }   /* между секциями */
.sec-head{ margin-bottom:clamp(40px, 6vw, 76px); } /* заголовок до контента */
```

Это примерно вдвое больше обычного. Ощущение дороговизны берётся отсюда чаще, чем из цвета.

Раскладывай соседние элементы через `flex`/`grid` и `gap`, а не отступами на каждом элементе — они схлопываются и удваиваются непредсказуемо.

Разделяй волосяной линией `1px solid var(--line)` и воздухом. Сетку карточек делай через `gap:1px` на фоне цвета линии — получаются идеальные разделители без двойных границ:

```css
.grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); }
.card{ background:var(--bg); padding:clamp(28px,3.2vw,44px); }
```

---

## Движение

```css
--ease: cubic-bezier(.16,1,.3,1);   /* быстрый старт,長 мягкое торможение */
```

**Появление при скролле** — базовый приём, работает почти всегда:

```css
.rev{ opacity:0; transform:translateY(26px);
      transition:opacity .85s var(--ease), transform .85s var(--ease); }
.rev.in{ opacity:1; transform:none; }
.rev[data-d="1"]{ transition-delay:.09s } .rev[data-d="2"]{ transition-delay:.18s }
```

```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.14, rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.rev').forEach(el => io.observe(el));
```

`unobserve` после срабатывания обязателен: иначе блоки будут переигрывать анимацию при каждом проходе, и это выглядит нервно.

**Кнопка с заливкой из края** вместо смены цвета:

```css
.btn{ position:relative; overflow:hidden; border:1px solid var(--accent); color:var(--accent);
      background:transparent; transition:color .4s var(--ease); }
.btn::before{ content:''; position:absolute; inset:0; background:var(--accent);
              transform:scaleX(0); transform-origin:right; transition:transform .5s var(--ease); }
.btn:hover{ color:var(--bg); }
.btn:hover::before{ transform:scaleX(1); transform-origin:left; }
.btn > *{ position:relative; z-index:1; }   /* текст поверх заливки */
```

Всегда закрывай блоком `@media (prefers-reduced-motion:reduce)`.

---

## Фон первого экрана

**Слоёные радиальные градиенты** дают глубину без единой картинки — страница при этом открывается офлайн:

```css
.hero-bg::before{
  content:''; position:absolute; inset:0;
  background:
    radial-gradient(120% 85% at 78% 8%,  rgba(200,169,106,.16) 0%, transparent 55%),
    radial-gradient(100% 70% at 12% 92%, rgba(200,169,106,.07) 0%, transparent 60%),
    radial-gradient(150% 100% at 50% 50%, transparent 30%, rgba(6,6,7,.85) 100%);
}
```

**Зерно поверх страницы** убирает «цифровую плоскость» — дешёвый приём с большим эффектом:

```css
body::after{
  content:''; position:fixed; inset:0; z-index:9999; pointer-events:none;
  opacity:.32; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}
```

**Видеофон.** Оставляй разметку слотом, даже если видео ещё нет:

```html
<video class="hero-video" autoplay muted loop playsinline poster="poster.jpg">
  <source src="hero.mp4" type="video/mp4">
</video>
```
```css
.hero-video{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.45; }
```

Где брать — `resources.md`, раздел «Видео». Плюс постер обязателен: без него на медленной сети экран будет чёрным.

---

## Ловушки CSS

**Селектор по тегу ловит вложенные элементы.** Реальный баг из этого проекта: `.tcell span{ font-size:10.5px; display:block }` был написан для подписи под цифрой, но поймал и `<span>` внутри `<b>` с самой цифрой — числа отрисовались десятым кеглем и разъехались по строкам. Лечится дочерним комбинатором:

```css
.tcell > span{ /* только прямые потомки */ }
```

Перед публикацией просматривай стили на предмет селекторов по голому тегу внутри компонента.

**`background-clip:text` не докрашивает вложенные элементы.** Дочерний `<span>` наследует `-webkit-text-fill-color:transparent`, но своего фона не имеет — и становится невидимым. Лечится:

```css
.gold span{ background:inherit; -webkit-background-clip:text; background-clip:text; }
```

**Элементы уезжают за край, а `overflow-x:hidden` это прячет.** Проверка на горизонтальный скролл вернёт «всё чисто», а кнопка меню будет недоступна. Замеряй позиции явно:

```js
const r = document.querySelector('.burger').getBoundingClientRect();
console.log(r.right <= window.innerWidth);   // false = кнопка за экраном
```

**`min-height:100svh` не гарантирует, что контент влезет.** Замеряй реальную высоту первого экрана и сравнивай с вьюпортом.

---

## Ловушки SVG

**Градиент на горизонтальной или вертикальной линии не строится.** По умолчанию `gradientUnits="objectBoundingBox"`, а у линии одна из сторон бокса нулевая — градиент вырождается, и линия не рисуется вовсе. Реальный баг: у глобуса пропали все параллели. Лечится:

```xml
<linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="16" y1="0" x2="72" y2="200">
```

`userSpaceOnUse` работает в координатах `viewBox`, поэтому один градиент корректно обслуживает элемент любого размера на странице.

**Одинаковые `id` при повторе SVG.** Если один и тот же эмблемный SVG стоит в шапке, герое и футере, дублируются `id` градиентов — это невалидно. Объяви `<defs>` один раз скрытым блоком в начале `<body>`, все копии сошлются на него:

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="gold" gradientUnits="userSpaceOnUse" ...>...</linearGradient>
</defs></svg>
```

**Текст поверх узора не читается.** Подложи мягкое затемнение радиальным градиентом, а буквам дай обводку цветом фона:

```css
.mono{ paint-order:stroke fill; stroke:rgba(0,0,0,.5); stroke-width:2.5; stroke-linejoin:round; }
```

---

## Проверка

Код, который выглядит правильным, регулярно оказывается сломанным на экране. **Смотри скриншоты глазами** — не ограничивайся строкой «ошибок нет».

```python
import asyncio, pathlib
from playwright.async_api import async_playwright

URL = pathlib.Path(r"путь/к/index.html").as_uri()
OUT = pathlib.Path(r"путь/к/скриншотам")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for w in (320, 390, 768, 1440, 1920):
            pg = await b.new_page(viewport={"width": w, "height": 900})
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.wait_for_timeout(2500)   # ждём шрифты
            print(w, "h-overflow:",
                  await pg.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth"))
            await pg.screenshot(path=OUT / f"{w}.png")
            await pg.close()
        print("ошибки:", errs or "нет")
        await b.close()

asyncio.run(main())
```

Скриншоты клади в scratchpad-директорию сессии, не в проект.

**Что проверять обязательно:**

- Скриншот каждой секции — и просмотреть их
- Ширины 320 / 390 / 768 / 1440 / 1920
- Реально ли загрузились шрифты: `document.fonts.check('400 24px "Имя"')`
- Позиции элементов, которые могут уехать за край: `getBoundingClientRect().right <= innerWidth`
- Высота первого экрана против вьюпорта
- Переключение языка, если оно есть: пройтись по всем ключам словаря
- Форма: пустая даёт ошибки, заполненная даёт экран «спасибо»
- `pageerror` пуст

**Мультиязычность — отдельная проверка.** Сверь словарь с разметкой: во всех языках одинаковый набор ключей, каждый `data-i18n` в разметке есть в словаре, лишних ключей нет.

```js
const uniq = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]))];
// сравнить с Object.keys(I18N.ru) и Object.keys(I18N.en)
```

---

## Скрипты правок

Правь HTML питоновским скриптом с `assert` на каждую замену:

```python
for old, new in reps:
    assert old in s, old[:50]     # падаем до записи, а не после
    s = s.replace(old, new)
io.open(p, 'w', encoding='utf-8').write(s)
```

`assert` до записи файла означает, что несовпавшая замена оставит файл нетронутым, а не запишет половину правок. Это уже спасало в этом проекте.
