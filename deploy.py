# -*- coding: utf-8 -*-
u"""Выкладывает v2/ на GitHub Pages.

Зачем скрипт, а не пара команд копирования. Браузер держит style.css и
скрипты в кэше и не спрашивает сервер, поменялись ли они. Из-за этого
владелец видел новый HTML со старым оформлением и справедливо считал,
что правка не сделана. Здесь к каждой ссылке подставляется отпечаток
самого файла: меняется файл — меняется адрес — браузер обязан скачать
заново. Ничего помнить и обновлять руками не нужно.

Запуск:  python deploy.py "текст коммита"
"""
import hashlib
import io
import os
import re
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "v2")
DST = os.path.join(ROOT, "_publish")
# Ролик пока не используется, а весит девять мегабайт — в публикацию не идёт.
SKIP = {"hero.mp4"}


def run(*args, **kw):
    return subprocess.run(args, cwd=DST, check=True, capture_output=True,
                          text=True, encoding="utf-8", errors="replace", **kw)


def stamp(path):
    u"""Восемь знаков от sha1 — достаточно, чтобы адрес менялся при любой
    правке и не менялся, когда файл тот же."""
    with open(path, "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


def main():
    msg = sys.argv[1] if len(sys.argv) > 1 else u"Обновление сайта"

    # ── 1. Копируем исходники ────────────────────────────────────────
    shutil.copy2(os.path.join(SRC, "index.html"), os.path.join(DST, "index.html"))

    # Настройка кэша хостинга живёт в корне проекта и едет в сборку:
    # без неё DDoS-Guard отдаёт посетителю вчерашнюю страницу.
    ht = os.path.join(ROOT, ".htaccess")
    if os.path.isfile(ht):
        shutil.copy2(ht, os.path.join(ROOT, "_publish", ".htaccess"))
    dst_assets = os.path.join(DST, "assets")
    if os.path.isdir(dst_assets):
        shutil.rmtree(dst_assets)
    shutil.copytree(os.path.join(SRC, "assets"), dst_assets,
                    ignore=lambda d, names: [n for n in names if n in SKIP])

    # ── 2. Штампуем ссылки отпечатком файла ──────────────────────────
    page = os.path.join(DST, "index.html")
    html = io.open(page, encoding="utf-8").read()
    stamped = []

    def mark(m):
        rel = m.group(2)
        full = os.path.join(DST, rel.replace("/", os.sep))
        if not os.path.isfile(full):
            # Ссылка на файл, которого в публикации нет: например ролик из
            # закомментированного блока. Оставляем как есть, не падаем.
            return m.group(0)
        v = stamp(full)
        stamped.append("%s?v=%s" % (rel, v))
        return '%s="%s?v=%s"' % (m.group(1), rel, v)

    html = re.sub(r'(href|src)="(assets/(?:css|js|img)/[^"?]+)(?:\?v=[0-9a-f]+)?"', mark, html)

    # srcset — не одна ссылка, а список «адрес размер», поэтому правим
    # каждую по отдельности. Без этого замена фотографии не доходит до
    # браузера: адрес прежний, и он берёт снимок из кэша.
    def mark_srcset(m):
        parts = []
        for item in m.group(1).split(","):
            item = item.strip()
            if not item:
                continue
            bits = item.split()
            rel = bits[0].split("?")[0]
            full = os.path.join(DST, rel.replace("/", os.sep))
            if os.path.isfile(rel and full):
                v = stamp(full)
                bits[0] = "%s?v=%s" % (rel, v)
                stamped.append(bits[0])
            parts.append(" ".join(bits))
        return 'srcset="%s"' % ", ".join(parts)

    html = re.sub(r'srcset="([^"]+)"', mark_srcset, html)
    io.open(page, "w", encoding="utf-8").write(html)

    # Картинки, на которые ссылаются стили (url(...)), тоже надо штамповать.
    # Иначе один и тот же файл едет по двум адресам — со штампом из srcset и
    # без штампа из CSS — и телефон качает его дважды.
    css = os.path.join(DST, "assets", "css", "style.css")
    if os.path.isfile(css):
        text = io.open(css, encoding="utf-8").read()

        def mark_css(m):
            rel = m.group(1)
            full = os.path.join(DST, "assets", "img", os.path.basename(rel))
            if not os.path.isfile(full):
                return m.group(0)
            v = stamp(full)
            stamped.append("assets/img/%s?v=%s" % (os.path.basename(rel), v))
            return 'url("%s?v=%s")' % (rel, v)

        text = re.sub(r'url\("(\.\./img/[^"?]+)(?:\?v=[0-9a-f]+)?"\)', mark_css, text)
        io.open(css, "w", encoding="utf-8").write(text)
    for x in sorted(set(stamped)):
        print(u"  штамп:", x)

    # ── 3. Коммит и отправка ─────────────────────────────────────────
    run("git", "add", "-A")
    if not run("git", "status", "--porcelain").stdout.strip():
        print(u"нечего выкладывать — изменений нет")
        return
    run("git", "commit", "-q", "-m",
        msg + u"\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>")
    run("git", "push", "-q", "origin", "HEAD")
    sha = run("git", "rev-parse", "--short", "HEAD").stdout.strip()
    print(u"отправлено:", sha, u"—", msg)
    print(u"проверить сборку: gh api repos/git-senator/la-concierge/pages/builds/latest")


if __name__ == "__main__":
    main()
