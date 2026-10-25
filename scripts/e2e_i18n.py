#!/usr/bin/env python3
"""Test de bout en bout des traductions, sur le site servi (local ou en ligne).

Pour chaque langue, compare chaque page à la page anglaise :
- pages réellement traduites (texte du contenu différent de l'anglais), avec un
  minimum : au moins MIN_RATIO des pages dont le fichier traduit diffère vraiment
  de l'anglais doivent s'afficher traduites (sinon : retombée silencieuse en anglais) ;
- pages en double : adresses qui n'existent qu'en traduction (ex. /fr/HowToPlay/jobs/),
  signe qu'un fichier traduit ne remplace pas la page anglaise ;
- pages absentes : servies en anglais mais pas dans la langue ;
- ordre du menu de gauche : identique à l'anglais (un fichier traduit remplace aussi
  les métadonnées, dont sidebar_position) ;
- points de contrôle : un texte précis doit apparaître sur une page précise.

    npm run build && npm run serve        # puis, dans un autre terminal :
    npm run test:i18n                     # ou : I18N_URL=https://... npm run test:i18n
    python3 scripts/e2e_i18n.py build https://unitystation-wiki.unionrolistes.fr   # état en ligne

Codes retour : 0 tout va bien · 1 un contrôle échoue · 2 test impossible (build absent,
serveur injoignable).
"""
import difflib
import html as html_lib
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCALES = ("fr", "ru", "de")
MIN_RATIO = 0.75
DEADLINE = 15 * 60  # secondes pour tout le test
# (langue, adresse, texte qui doit apparaître)
CHECKS = [
    ("fr", "/fr/", "Qu'est-ce que Unitystation"),
    ("fr", "/fr/HowToPlay/Jobs/Command_roles/Captain", "Le rôle de capitaine"),
    ("ru", "/ru/", "Что такое Unitystation"),
    ("de", "/de/", "Was ist Unitystation"),
]
CONTENT = re.compile(r'class="[^"]*\btheme-doc-markdown\b[^"]*">(.*?)(?:<footer class="theme-doc-footer|</article>)', re.S)
SIDEBAR = re.compile(r'<nav[^>]*aria-label="Docs sidebar".*?</nav>', re.S)
MENU_LINK = re.compile(r'class="menu__link[^"]*"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*class="menu__link')
start = time.time()


class Unreachable(Exception):
    pass


fails = 0


def fetch(base, path):
    """HTML de la page, ou None si elle n'existe pas. Arrête tout si le serveur ne répond plus."""
    global fails
    if time.time() - start > DEADLINE:
        raise Unreachable(f"délai de {DEADLINE} s dépassé")
    try:
        with urllib.request.urlopen(base + urllib.parse.quote(path), timeout=15) as r:
            fails = 0
            return r.read().decode("utf8", "replace")
    except urllib.error.HTTPError:
        fails = 0
        return None
    except Exception as e:  # connexion refusée, coupée, délai…
        fails += 1
        if fails >= 5:
            raise Unreachable(f"serveur injoignable ({type(e).__name__})")
        return None


def content(page_html):
    m = CONTENT.search(page_html or "")
    body = re.sub(r"<script.*?</script>|<style.*?</style>", "", m.group(1) if m else "", flags=re.S)
    return html_lib.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip())


def sidebar(page_html, loc=""):
    m = SIDEBAR.search(page_html or "")
    hrefs = [a or b for a, b in MENU_LINK.findall(m.group(0) if m else "")]
    return [h[len(loc) + 1:] if loc and h.startswith(f"/{loc}/") else h for h in hrefs]


def routes(build, prefix=""):
    """Adresses des pages d'un build (dossiers contenant index.html), sans les autres langues."""
    base = os.path.join(build, prefix)
    out = set()
    for d, dirs, fs in os.walk(base):
        rel = os.path.relpath(d, base)
        if not prefix and rel.split(os.sep)[0] in LOCALES + ("assets", "img"):
            dirs[:] = []
            continue
        if "index.html" in fs:
            out.add("/" + ("" if rel == "." else rel.replace(os.sep, "/") + "/"))
    return out


def really_translated(loc):
    """Fichiers traduits dont le texte diffère vraiment de l'anglais (pas une copie)."""
    root = os.path.join(ROOT, "i18n", loc, "docusaurus-plugin-content-docs", "current")
    norm = lambda s: re.sub(r"\s+", " ", re.sub(r"\]\([^)]*\)|^import .*$", "", s, flags=re.M))  # noqa: E731
    n = 0
    for d, _, fs in os.walk(root):
        for f in fs:
            if not f.endswith((".md", ".mdx")) or f.startswith("_"):
                continue
            rel = os.path.relpath(os.path.join(d, f), root)
            en = os.path.join(ROOT, "docs", rel)
            if not os.path.isfile(en):
                continue
            a, b = (norm(open(p, encoding="utf8").read()) for p in (en, os.path.join(d, f)))
            if b.strip() and difflib.SequenceMatcher(None, a, b, autojunk=False).quick_ratio() < 0.95:
                n += 1
    return n


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    build, base = sys.argv[1], sys.argv[2].rstrip("/")
    if not os.path.isdir(build) or not routes(build):
        print(f"build absent ou vide : {build} (lancer npm run build)")
        return 2
    try:
        return run(build, base)
    except Unreachable as e:
        print(f"test impossible : {e} — {base}")
        return 2


def run(build, base):
    en_html = {r: fetch(base, r) for r in sorted(routes(build))}
    unserved = sorted(r for r, h in en_html.items() if h is None)
    if len(unserved) == len(en_html):
        raise Unreachable("aucune page anglaise servie")
    if unserved:
        print(f"[en] {len(unserved)} page(s) non servie(s) même en anglais, ignorée(s) : {', '.join(unserved[:5])}")
    en = [r for r in en_html if en_html[r] is not None]
    failed = False
    for loc in LOCALES:
        translated, missing, order = 0, [], []
        for r in en:
            h = fetch(base, f"/{loc}{r}")
            if h is None:
                missing.append(r)
                continue
            t = content(h)
            if t and t != content(en_html[r]):
                translated += 1
            if sidebar(h, loc) != sidebar(en_html[r]):
                order.append(r)
        extra = sorted(routes(build, loc) - set(en)) if os.path.isdir(os.path.join(build, loc)) else []
        expected = really_translated(loc)
        floor = int(expected * MIN_RATIO)
        print(f"[{loc}] pages traduites affichées : {translated}/{len(en)} (minimum attendu {floor})"
              f" · absentes : {len(missing)} · en double : {len(extra)} · menu dans un autre ordre : {len(order)}")
        for label, items in (("double", extra), ("absente", missing), ("ordre du menu", order)):
            for e in items[:10]:
                print(f"   {label} : /{loc}{e}")
        failed |= bool(extra or missing or order) or translated < floor
    for loc, path, needle in CHECKS:
        t = content(fetch(base, path))
        ok = needle in t
        print(f"[{'OK' if ok else 'KO'}] {path} contient « {needle} »")
        failed |= not ok
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
