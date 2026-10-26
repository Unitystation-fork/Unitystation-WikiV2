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
- libellés des catégories du menu de gauche : ceux de MENU_ROWS, ni plus ni moins, dans chaque langue ;
- points de contrôle : un texte précis doit apparaître sur une page précise.

    npm run build && npm run serve        # puis, dans un autre terminal :
    npm run test:i18n                     # ou : I18N_URL=https://... npm run test:i18n
    python3 scripts/e2e_i18n.py build https://unitystation-wiki.unionrolistes.fr   # état en ligne

Codes retour : 0 tout va bien · 1 un contrôle échoue ou une page est en erreur ·
2 test impossible (build absent, serveur injoignable dès la page d'accueil, délai dépassé).
"""
import difflib
import html as html_lib
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCALES = ("fr", "ru", "de")
MIN_RATIO = 0.9
SAME = 0.95  # au-dessus : copie de l'anglais (même critère pour les fichiers et les pages)
DEADLINE = 15 * 60  # secondes pour tout le test
# (langue, adresse, texte qui doit apparaître)
CHECKS = [
    ("fr", "/fr/", "Qu'est-ce que Unitystation"),
    ("fr", "/fr/HowToPlay/Jobs/Command_roles/Captain/", "Le rôle de capitaine"),
    ("ru", "/ru/", "Что такое Unitystation"),
    ("de", "/de/", "Was ist Unitystation"),
]
# Libellés des catégories du menu de gauche (clé = libellé anglais) : (en, fr, ru, de).
# Les libellés « Jouer », « Играть », « Cartes officielles des stations » viennent du titre des pages traduites.
MENU_ROWS = [
    ("Play", "Jouer", "Играть", "Spielen"),
    ("Interfaces", "Interfaces", "Интерфейсы", "Oberflächen"),
    ("User Interface", "Interface Utilisateur", "Пользовательский интерфейс", "Benutzeroberfläche"),
    ("Character", "Personnage", "Персонаж", "Charakter"),
    ("Guides", "Guides", "Руководства", "Anleitungen"),
    ("General Guides", "Guides généraux", "Общие руководства", "Allgemeine Anleitungen"),
    ("Jobs", "Métiers", "Профессии", "Berufe"),
    ("RP", "RP", "РП", "RP"),
    ("Universe", "Univers", "Вселенная", "Universum"),
    ("Items", "Objets", "Предметы", "Gegenstände"),
    ("Lore", "Lore", "Лор", "Lore"),
    ("Maps", "Cartes", "Карты", "Karten"),
    ("Gateway Maps", "Cartes du Gateway", "Карты Гейтвея", "Gateway-Karten"),
    ("Official Station Maps", "Cartes officielles des stations", "Официальные карты станций", "Offizielle Stationskarten"),
    ("Mobs", "Mobs", "Мобы", "Mobs"),
    ("Other", "Autres", "Прочее", "Sonstiges"),
    ("Jokes", "Blagues", "Шутки", "Witze"),
    ("Wiki Tools", "Outils du wiki", "Инструменты вики", "Wiki-Werkzeuge"),
    ("Dev", "Développeurs", "Разработчикам", "Entwickler"),
    ("Development", "Développement", "Разработка", "Entwicklung"),
    ("FAQ", "FAQ", "FAQ", "FAQ"),
    ("Introduction", "Introduction", "Введение", "Einführung"),
    ("Contribution Guides", "Guides de contribution", "Руководства по участию", "Anleitungen zum Mitwirken"),
    ("Project Goals", "Objectifs du projet", "Цели проекта", "Projektziele"),
    ("Current Goal Scope", "Objectifs en cours", "Текущие цели", "Aktuelle Ziele"),
    ("Routine", "Routines", "Чек-листы ролей", "Routinen"),
    # métiers (traduits depuis #84)
    ("Command", "Commandement", "Командование", "Kommando"),
    ("Entertainment", "Divertissement", "Развлекательный Отдел", "Unterhaltung"),
    ("Security", "Sécurité", "Служба Безопасности", "Sicherheit"),
    ("Engineering", "Ingénierie", "Инженерный Отдел", "Technik"),
    ("Science", "Science", "Научный Отдел", "Wissenschaft"),
    ("Medical", "Médical", "Медицинский Отдел", "Medizin"),
    ("Cargo", "Cargo", "Отдел Карго", "Cargo"),
    ("Service", "Service", "Сервисный Отдел", "Service"),
    ("Synthetic", "Synthétiques", "Синтетический", "Synthetisch"),
    ("Antagonist", "Antagonistes", "Антагонисты", "Antagonisten"),
    ("Protagonist", "Protagonistes", "Протагонисты", "Protagonisten"),
    ("Centcom", "Centcom", "Центральный Комитет", "Centcom"),
    ("Special", "Spéciaux", "Особые", "Spezial"),
    ("Ghost", "Fantômes", "Роли призраков", "Geister"),
]
MENU = {loc: {row[i] for row in MENU_ROWS} for i, loc in enumerate(("en",) + LOCALES)}
SUBLIST = re.compile(r'<a[^>]*class="[^"]*\bmenu__link--sublist\b[^"]*"[^>]*>(.*?)</a>', re.S)
CONTENT = re.compile(r'class="[^"]*\btheme-doc-markdown\b[^"]*">(.*?)(?:<footer class="theme-doc-footer|</article>)', re.S)
# repéré par sa classe, pas par aria-label (libellé traduisible, donc différent selon la langue)
SIDEBAR = re.compile(r'<nav[^>]*class="[^"]*\bmenu\b[^"]*\bthin-scrollbar\b.*?</nav>', re.S)
MENU_LINK = re.compile(r'class="menu__link[^"]*"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*class="menu__link')
start = time.time()


ERRORS = []  # (page, message) des pages en erreur côté serveur


class Unreachable(Exception):
    pass


class PageError(Exception):
    """Erreur persistante sur une page alors que le serveur répond : défaut de la page."""


ABSENT = (404, 410, 451)
TRIES = 3
MAX_NET_FAILS = 10  # échecs réseau d'affilée avant d'abandonner (serveur tombé)
net_fails = 0


def fetch(base, path):
    """HTML de la page, ou None si elle est absente (404/410/451, ou redirigée ailleurs).

    Erreurs passagères (5xx, 408, 429, réseau) : réessayées. Si elles persistent :
    PageError (la page est signalée, le test continue). Autre erreur 4xx : PageError.
    """
    global net_fails
    url = base + urllib.parse.quote(path)
    expected = urllib.parse.urlparse(base).path.rstrip("/") + path  # site servi sous un sous-chemin
    for attempt in range(TRIES):
        if time.time() - start > DEADLINE:
            raise Unreachable(f"délai de {DEADLINE} s dépassé")
        wait = 1 + attempt
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                net_fails = 0
                # une redirection vers une autre page (ex. /fr/X/ -> /X/) cache une page absente
                if urllib.parse.unquote(urllib.parse.urlparse(r.geturl()).path).rstrip("/") != expected.rstrip("/"):
                    return None
                return r.read().decode("utf8", "replace")
        except urllib.error.HTTPError as e:
            net_fails = 0
            if e.code in ABSENT:
                return None
            if not (e.code >= 500 or e.code in (408, 429)):
                raise PageError(f"HTTP {e.code}")
            err = f"HTTP {e.code}"
            retry_after = e.headers.get("Retry-After", "") if e.headers else ""
            if retry_after.isdigit():
                wait = min(int(retry_after), 10)
        except Exception as e:  # connexion refusée, coupée, délai…
            err = type(e).__name__
            net_fails += 1
            if net_fails >= MAX_NET_FAILS:
                raise Unreachable(f"serveur tombé en cours de test ({err})")
        if attempt < TRIES - 1:
            time.sleep(wait)
    raise PageError(f"{err} après {TRIES} essais")


def fetch_page(base, path, errors):
    """fetch() qui note les pages en erreur au lieu d'arrêter le test."""
    try:
        return fetch(base, path)
    except PageError as e:
        errors.append((path, str(e)))
        return None


def content(page_html):
    m = CONTENT.search(page_html or "")
    body = re.sub(r"<script.*?</script>|<style.*?</style>", "", m.group(1) if m else "", flags=re.S)
    return html_lib.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip())


def sidebar(page_html, loc="", prefix=""):
    """Liens du menu de gauche, sans le sous-chemin du site (baseUrl) ni le préfixe de langue."""
    m = SIDEBAR.search(page_html or "")
    out = []
    for h in (a or b for a, b in MENU_LINK.findall(m.group(0) if m else "")):
        if prefix and h.startswith(prefix + "/"):
            h = h[len(prefix):]
        if loc and h.startswith(f"/{loc}/"):
            h = h[len(loc) + 1:]
        out.append(h)
    return out


def categories(page_html):
    """Libellés des catégories du menu de gauche d'une page."""
    m = SIDEBAR.search(page_html or "")
    return {html_lib.unescape(re.sub(r"<[^>]+>", "", t)).strip() for t in SUBLIST.findall(m.group(0) if m else "")}


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


def differs(a, b):
    return difflib.SequenceMatcher(None, a, b, autojunk=False).quick_ratio() < SAME


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
            if b.strip() and differs(a, b):
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
        for p, msg in ERRORS[:10]:
            print(f"   en erreur avant l'arrêt : {p} ({msg})")
        print(f"test impossible : {e} — {base}")
        return 2


def run(build, base):
    try:
        fetch(base, "/")
    except PageError as e:
        raise Unreachable(f"la page d'accueil ne répond pas ({e})")
    prefix = urllib.parse.urlparse(base).path.rstrip("/")  # site servi sous un sous-chemin
    errors = ERRORS
    en_html = {r: fetch_page(base, r, errors) for r in sorted(routes(build))}
    en_errors = {p for p, _ in errors}
    unserved = sorted(r for r, h in en_html.items() if h is None and r not in en_errors)
    if len(unserved) == len(en_html):
        raise Unreachable("aucune page anglaise servie")
    if unserved:
        print(f"[en] {len(unserved)} page(s) non servie(s) même en anglais, ignorée(s) : {', '.join(unserved[:5])}")
    en = [r for r in en_html if en_html[r] is not None]
    if not any(sidebar(en_html[r], prefix=prefix) for r in en):
        raise Unreachable("menu de gauche introuvable dans les pages anglaises (thème modifié ?)")
    failed = False
    seen = {"en": set()}
    for r in en:
        seen["en"] |= categories(en_html[r])
    for loc in LOCALES:
        seen[loc] = set()
        translated, missing, order = 0, [], []
        for r in en:
            n_err = len(errors)
            h = fetch_page(base, f"/{loc}{r}", errors)
            if h is None:
                if len(errors) == n_err:  # vraiment absente (une page en erreur est listée à part)
                    missing.append(r)
                continue
            seen[loc] |= categories(h)
            t = content(h)
            if t and differs(content(en_html[r]), t):
                translated += 1
            if sidebar(h, loc, prefix) != sidebar(en_html[r], prefix=prefix):
                order.append(r)
        extra = sorted(routes(build, loc) - set(en_html)) if os.path.isdir(os.path.join(build, loc)) else []
        expected = really_translated(loc)
        floor = max(0, min(int(expected * MIN_RATIO), expected - 2))  # marge d'au moins 2 pages (comparaison approchée)
        print(f"[{loc}] pages traduites affichées : {translated}/{len(en)} (minimum attendu {floor})"
              f" · absentes : {len(missing)} · en double : {len(extra)} · menu dans un autre ordre : {len(order)}")
        for label, items in (("double", extra), ("absente", missing), ("ordre du menu", order)):
            for e in items[:10]:
                print(f"   {label} : /{loc}{e}")
        failed |= bool(extra or missing or order) or translated < floor
    for loc in ("en",) + LOCALES:
        manque, en_trop = sorted(MENU[loc] - seen[loc]), sorted(seen[loc] - MENU[loc])
        print(f"[{'KO' if manque or en_trop else 'OK'}] [{loc}] libellés du menu : {len(seen[loc])} vus, {len(MENU[loc])} attendus, {len(manque)} absents, {len(en_trop)} en trop")
        for label, items in (("attendu mais absent", manque), ("vu mais inattendu", en_trop)):
            for e in items:
                print(f"   {label} : {e}")
        failed |= bool(manque or en_trop)
    for loc, path, needle in CHECKS:
        t = content(fetch_page(base, path, errors))
        ok = needle in t
        print(f"[{'OK' if ok else 'KO'}] {path} contient « {needle} »")
        failed |= not ok
    if errors:
        print(f"[erreur] {len(errors)} page(s) en erreur côté serveur :")
        for p, msg in errors[:10]:
            print(f"   {p} ({msg})")
    return 1 if failed or errors else 0


if __name__ == "__main__":
    sys.exit(main())
