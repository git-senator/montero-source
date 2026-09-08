# -*- coding: utf-8 -*-
u"""
Ставит кадр в макет: обрезает под нужный размер и вписывает в разметку.

    python apply_photo.py rio 01                     из фотобанка, в оба варианта
    python apply_photo.py rio 01 --to v2             только во второй
    python apply_photo.py rio --file "C:\\фото\\rio.jpg"   свой файл

Размеры фиксированные:
    услуги              1600x900
    фоны и направления  2400x1350
Кадрируем по центру с подъёмом на 8% — горизонт уходит чуть ниже
середины, так кадр читается спокойнее.

Что делает:
  1. режет под размер и кладёт в <вариант>/assets/img/<слот>.jpg
  2. вписывает <img class="media"> в блок разметки вместо заглушки
"""
import io, json, pathlib, re, shutil, sys
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = pathlib.Path(__file__).parent
PHOTOS = ROOT / "photos"
VARIANTS = {"v1": ROOT, "v2": ROOT / "v2"}

WIDE = (1600, 900)
BG = (2400, 1350)
BG_SLOTS = {"hero", "final", "floripa", "rio", "saopaulo", "angra", "noronha"}


def target_size(slot):
    return BG if slot in BG_SLOTS else WIDE


def crop_to(im, size):
    u"""Режем под пропорцию, но НЕ растягиваем: если исходник мельче цели,
    оставляем его родное разрешение. Апскейл в PIL с последующим
    уменьшением в браузере даёт только мыло и лишние мегабайты.

    Вертикальный исходник под горизонтальный слот не режем вовсе —
    иначе от кадра остаётся узкая полоса. Обрезкой займётся CSS,
    и на телефоне снимок ляжет целиком."""
    tw, th = size
    ratio = tw / float(th)
    w, h = im.size
    if w / float(h) < 1 and ratio > 1:
        return im
    if w < tw:
        tw, th = w, int(round(w / ratio))
    if w / float(h) > ratio:
        nw = int(h * ratio); x = (w - nw) // 2
        im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w / ratio); y = int((h - nh) * 0.42)
        im = im.crop((0, y, w, y + nh))
    return im.resize((tw, th), Image.LANCZOS)


def put(html, slot, alt):
    u"""Меняет подпись-заглушку этого слота на <img>. Если картинка уже
    стоит — не трогает."""
    marker = 'assets/img/%s.jpg' % slot
    if '<img class="media" src="%s"' % marker in html:
        return html, False
    pat = re.compile(r'(<div class="[^"]*"[^>]*>)\s*<span class="slot">' + re.escape(marker) + r'</span>')
    if pat.search(html):
        tag = '<img class="media" src="%s" alt="%s">' % (marker, alt)
        return pat.sub(lambda m: m.group(1) + tag, html, count=1), True
    return html, False


def main(slot, num, src_file, targets):
    size = target_size(slot)

    if src_file:
        src = pathlib.Path(src_file)
    else:
        src = PHOTOS / slot / ("%02d.jpg" % int(num))
    if not src.exists():
        sys.exit(u"нет файла: %s" % src)

    im = Image.open(src).convert("RGB")
    out = crop_to(im, size)
    if out.width < size[0]:
        print(u"исходник %dpx — оставляю как есть, не растягиваю; "
              u"на широком экране будет мягко" % im.width)

    alt = slot.replace("-", " ").title()
    for name in targets:
        base = VARIANTS[name]
        d = base / "assets" / "img"
        d.mkdir(parents=True, exist_ok=True)
        out.save(d / ("%s.jpg" % slot), "JPEG", quality=84, optimize=True)

        page = base / "index.html"
        html = io.open(page, encoding="utf-8").read()
        html, changed = put(html, slot, alt)
        io.open(page, "w", encoding="utf-8").write(html)
        print(u"%s: %s.jpg %dx%d%s" % (name, slot, size[0], size[1],
                                       u" + разметка" if changed else u""))


if __name__ == "__main__":
    argv = sys.argv[1:]
    src_file = None
    if "--file" in argv:
        i = argv.index("--file"); src_file = argv[i + 1]; del argv[i:i + 2]
    to = "v1 v2"
    if "--to" in argv:
        i = argv.index("--to"); to = argv[i + 1]; del argv[i:i + 2]
    if not argv or (len(argv) < 2 and not src_file):
        sys.exit(__doc__)
    main(argv[0], argv[1] if len(argv) > 1 else None, src_file, to.split())
