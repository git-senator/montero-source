# -*- coding: utf-8 -*-
u"""
Собирает вариант лендинга в один самодостаточный HTML.

    python build.py          # корень — вариант №1
    python build.py v2       # вариант №2

На выходе два файла:
    <dir>/dist/index.html     полный документ — залить на хостинг, открыть локально
    <dir>/dist/artifact.html  без <html>/<head>/<body> — для публикации артефактом

CSS и JS вклеиваются внутрь, локальные картинки — как data-URI.
"""
import base64
import io
import mimetypes
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent


def read(base, rel):
    return io.open(base / rel, encoding="utf-8").read()


def inline_local_media(html, base):
    u"""Локальные <source src="assets/..."> и poster="..." → data-URI.
    Без этого видеофон в артефакте остаётся битой относительной ссылкой."""
    def to_uri(src):
        if src.startswith(("http", "data:", "//")):
            return None
        path = base / src
        if not path.exists():
            return None
        mime = mimetypes.guess_type(str(path))[0] or "application/octet-stream"
        return "data:%s;base64,%s" % (mime, base64.b64encode(path.read_bytes()).decode())

    def repl_source(m):
        u = to_uri(m.group(2))
        return m.group(0) if u is None else '%ssrc="%s"%s' % (m.group(1), u, m.group(3))
    html = re.sub(r'(<source[^>]*?\s)src="([^"]+)"([^>]*>)', repl_source, html)

    def repl_poster(m):
        u = to_uri(m.group(2))
        return m.group(0) if u is None else '%sposter="%s"%s' % (m.group(1), u, m.group(3))
    return re.sub(r'(<video[^>]*?\s)poster="([^"]+)"([^>]*?>)', repl_poster, html, flags=re.S)


def inline_local_images(html, base):
    u"""Локальные <img src="assets/img/..."> → data-URI."""
    def repl(m):
        src = m.group(2)
        if src.startswith(("http", "data:", "//")):
            return m.group(0)
        path = base / src
        if not path.exists():
            return m.group(0)
        mime = mimetypes.guess_type(str(path))[0] or "application/octet-stream"
        b64 = base64.b64encode(path.read_bytes()).decode()
        return "%ssrc=\"data:%s;base64,%s\"%s" % (m.group(1), mime, b64, m.group(3))
    return re.sub(r'(<img[^>]*?\s)src="([^"]+)"([^>]*>)', repl, html)


def to_artifact(html):
    u"""Артефакт получает готовую обвязку <html><head><body> от хоста.
    Отдаём только содержимое: title, шрифты, стили и разметку тела."""
    head = re.search(r"<head[^>]*>(.*?)</head>", html, re.S)
    body = re.search(r"<body[^>]*>(.*?)</body>", html, re.S)
    if not head or not body:
        return html

    keep = []
    for pat in (r"<title>.*?</title>", r"<link[^>]*fonts\.google[^>]*>", r"<style>.*?</style>"):
        keep += re.findall(pat, head.group(1), re.S)
    return "\n".join(keep) + "\n" + body.group(1).strip() + "\n"


def build(where):
    base = (ROOT / where).resolve()
    html = read(base, "index.html")

    # Комментарии срезаем до склейки: иначе data-URI подставляются и внутрь
    # закомментированных блоков, и выключенный видеофон продолжает весить
    # свои мегабайты. Делаем это до вклейки CSS и JS, чтобы не задеть их.
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)

    css = read(base, "assets/css/style.css")
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/style.css">',
        "<style>\n%s\n</style>" % css,
    )

    for src in ("assets/js/i18n.js", "assets/js/request-form.js", "assets/js/app.js"):
        html = html.replace(
            '<script src="%s"></script>' % src,
            "<script>\n%s\n</script>" % read(base, src),
        )

    html = inline_local_images(html, base)
    html = inline_local_media(html, base)

    dist = base / "dist"
    dist.mkdir(exist_ok=True)
    full = dist / "index.html"
    art = dist / "artifact.html"
    io.open(full, "w", encoding="utf-8").write(html)
    io.open(art, "w", encoding="utf-8").write(to_artifact(html))

    visible = re.sub(r"<!--.*?-->", "", html, flags=re.S)   # слоты в комментариях не считаем
    left = re.findall(r'(?:href|src)="(assets/[^"]+)"', visible)
    print(u"собрано: %s (%.0f КБ)" % (full, full.stat().st_size / 1024))
    print(u"артефакт: %s (%.0f КБ)" % (art, art.stat().st_size / 1024))
    print(u"несклеенных локальных ссылок:", left or u"нет")


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else ".")
