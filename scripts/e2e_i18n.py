#!/usr/bin/env python3
"""Test de bout en bout des traductions, sur le site servi (local ou en ligne).

Pour chaque langue, compare le texte de chaque page à la page anglaise :
- pages réellement traduites (texte différent de l'anglais) ;
- pages en double : adresses qui n'existent qu'en traduction (ex. /fr/HowToPlay/jobs/),
  signe qu'un fichier traduit ne remplace pas la page anglaise ;
- points de contrôle : un texte précis doit apparaître sur une page précise.

    npm run build && npm run serve        # puis, dans un autre terminal :
    python3 scripts/e2e_i18n.py build http://localhost:3000
    python3 scripts/e2e_i18n.py build https://unitystation-wiki.unionrolistes.fr   # état en ligne

Code retour 1 si un point de contrôle échoue ou s'il existe des pages en double.
"""
import html as html_lib
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

LOCALES = ("fr", "ru", "de")
# (langue, adresse, texte qui doit apparaître)
CHECKS = [
    ("fr", "/fr/", "Qu'est-ce que Unitystation"),
    ("fr", "/fr/HowToPlay/Jobs/Command_roles/Captain", "Le rôle de capitaine"),
    ("ru", "/ru/", "Что такое Unitystation"),
    ("de", "/de/", "Was ist Unitystation"),
]


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


def text(base, path):
    try:
        with urllib.request.urlopen(base + urllib.parse.quote(path), timeout=15) as r:
            html = r.read().decode("utf8", "replace")
    except (urllib.error.URLError, OSError):
        return None
    # Seul le contenu de la page compte : l'article contient aussi le fil d'Ariane et
    # la pagination, que l'interface traduit même quand le contenu est resté en anglais.
    m = re.search(r'class="theme-doc-markdown markdown">(.*?)(?:<footer|</article>)', html, flags=re.S)
    body = m.group(1) if m else ""
    body = re.sub(r"<script.*?</script>|<style.*?</style>", "", body, flags=re.S)
    return html_lib.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip())


def main():
    build, base = sys.argv[1], sys.argv[2].rstrip("/")
    en_text = {r: text(base, r) for r in sorted(routes(build))}
    # une page que le serveur ne sert déjà pas en anglais n'est pas un défaut de traduction
    unserved = sorted(r for r, t in en_text.items() if t is None)
    if unserved:
        print(f"[en] {len(unserved)} page(s) non servie(s) même en anglais, ignorée(s) : {', '.join(unserved[:5])}")
    en = [r for r in en_text if en_text[r] is not None]
    failed = False
    for loc in LOCALES:
        translated = missing = 0
        for r in en:
            t = text(base, f"/{loc}{r}")
            if t is None:
                missing += 1
            elif t and t != en_text[r]:
                translated += 1
        extra = []
        if os.path.isdir(os.path.join(build, loc)):
            extra = sorted(routes(build, loc) - set(en))
        print(f"[{loc}] pages traduites affichées : {translated}/{len(en)}"
              f" · pages absentes : {missing} · pages en double : {len(extra)}")
        for e in extra[:10]:
            print(f"   double : /{loc}{e}")
        failed |= bool(extra)
    for loc, path, needle in CHECKS:
        t = text(base, path)
        ok = t is not None and needle in t
        print(f"[{'OK' if ok else 'KO'}] {path} contient « {needle} »")
        failed |= not ok
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
