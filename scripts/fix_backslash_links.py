#!/usr/bin/env python3
"""Réécrit les liens à antislash (`\\3_HowToPlay\\Jobs\\...\\Captain.md`) en `/3_HowToPlay/Jobs/.../Captain.md`.

Docusaurus ne résout pas les antislashs (chemins Windows hérités de la conversion).
Pour chaque lien : antislashs → `/`, puis recherche du fichier réel (casse exacte,
sinon casse corrigée, sinon table MOVED des pages fusionnées), puis écriture du
chemin depuis la racine des docs. Ce qui ne se résout pas est laissé tel quel et listé.

Limites connues (aucun cas dans docs/ ni i18n/ à ce jour) : les blocs ``` sont
ignorés mais pas le code en ligne `...` ni le HTML brut ; les liens de référence
(`[r]: chemin`) et les crochets imbriqués (`[a [b]](...)`) ne sont pas traités.

    python3 scripts/fix_backslash_links.py --lang en --dry-run
    python3 scripts/fix_backslash_links.py --lang en --report rapport.md
"""
import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_links import DOCS, FENCE, LOCALES, STATIC, exists_nocase  # noqa: E402

LINK = re.compile(r"(!?)\[([^\]]*)\]\(\s*<?((?:[^()\s>]|\([^()]*\))+)>?(\s+\"[^\"]*\")?\s*\)")

# Guides fusionnés dans les pages métier (dd41389, 8e957fb) et pages déplacées (763a639).
# Clé : ancien chemin depuis la racine docs, en minuscules.
MOVED = {
    "3_howtoplay/guides/security_guides/space-law.md": "3_HowToPlay/Jobs/Security_roles/Security-Officer.md#space-law",
    "3_howtoplay/guides/security_guides/security-officer-guide.md": "3_HowToPlay/Jobs/Security_roles/Security-Officer.md",
    "3_howtoplay/guides/engineering_guides/construction.md": "3_HowToPlay/Jobs/Engineering_roles/Engineer.md#construction",
    "3_howtoplay/guides/engineering_guides/guide-to-electricity.md": "3_HowToPlay/Jobs/Engineering_roles/Engineer.md#guide-to-electricity",
    "3_howtoplay/guides/engineering_guides/hacking-guide.md": "3_HowToPlay/Jobs/Engineering_roles/Engineer.md#hacking-guide",
    "3_howtoplay/guides/engineering_guides/guide-to-the-nuclear-reactor.md": "3_HowToPlay/Jobs/Engineering_roles/Chief-Engineer.md#guide-to-the-nuclear-reactor",
    "3_howtoplay/guides/engineering_guides/guide-to-atmospherics.md": "3_HowToPlay/Jobs/Engineering_roles/Atmospherics-Technician.md#guide-to-atmospherics",
    "3_howtoplay/guides/medical_guides/chemistry.md": "3_HowToPlay/Jobs/Medical_roles/Chemist.md#chemistry",
    "3_howtoplay/guides/science_guides/robotics-guide.md": "3_HowToPlay/Jobs/Science_roles/Roboticist.md#robotics-guide",
    "3_howtoplay/jobs/science_roles/geneticist.md": "3_HowToPlay/Jobs/Medical_roles/Geneticist.md",
}


# Liens dont le texte promet une page mais qui en visent une autre (erreur d'origine) :
# texte du lien (minuscules) → (page visée à tort, bonne page dans le même dossier).
WRONG_TARGET = {
    "hos": ("Security-Officer.md", "Head-of-Security.md"),
    "head of security": ("Security-Officer.md", "Head-of-Security.md"),
}


def real_case(path):
    """Chemin existant avec la vraie casse, ou None."""
    if os.path.exists(path):
        return path
    if not exists_nocase(path):
        return None
    cur = os.sep
    for part in os.path.normpath(path).split(os.sep)[1:]:
        cur = os.path.join(cur, next(n for n in os.listdir(cur) if n.lower() == part.lower()))
    return cur


def resolve(target, src_file, locale_root):
    """(chemin absolu réel, ancre, méthode) ou (None, ancre, None)."""
    t = target.replace("\\", "/")
    path, _, anchor = t.partition("#")
    if path.startswith("/"):
        rels = [path.lstrip("/")]
    else:
        rels = [os.path.normpath(os.path.join(os.path.relpath(os.path.dirname(src_file), locale_root), path))]
    roots = list(dict.fromkeys([locale_root, DOCS]))
    for rel in rels:
        for root in roots:
            found = real_case(os.path.join(root, rel))
            if found:
                method = "direct" if found == os.path.join(root, rel) else "casse"
                return found, anchor, method
        moved = MOVED.get(rel.replace(os.sep, "/").lower())
        if moved:
            mpath, _, manchor = moved.partition("#")
            for root in roots:
                if os.path.exists(os.path.join(root, mpath)):
                    return os.path.join(root, mpath), anchor or manchor, "fusionné"
    # images : chemin depuis static/
    found = real_case(os.path.join(STATIC, path.lstrip("/")))
    if found:
        return found, anchor, "static"
    return None, anchor, None


def new_target(found, anchor, locale_root, src_file):
    """Nouveau texte du lien, ou None si la cible est hors de static/ et des docs.

    Pages .md : chemin depuis la racine des docs (`/3_HowToPlay/...`), comme l'écrivaient
    les auteurs. Docusaurus résout `/fichier.md` depuis le dossier de la langue puis docs/
    (@docusaurus/utils markdownLinks.js) : une fois les dossiers i18n bien nommés, le même
    lien mène à la page traduite si elle existe, à l'anglaise sinon. Ce n'est vrai que pour
    les .md : un autre fichier rangé dans docs/ garde un chemin relatif.
    Fichiers de static/ : `/img/...`.
    """
    found = os.path.normpath(found)
    if os.path.isdir(found):  # Docusaurus ne résout pas un lien vers un dossier
        return None
    suffix = "#" + anchor if anchor else ""
    if found.startswith(STATIC + os.sep):
        return "/" + os.path.relpath(found, STATIC).replace(os.sep, "/") + suffix
    for root in (locale_root, DOCS):
        if found.startswith(root + os.sep):
            if found.endswith((".md", ".mdx")):
                return "/" + os.path.relpath(found, root).replace(os.sep, "/") + suffix
            return os.path.relpath(found, os.path.dirname(src_file)).replace(os.sep, "/") + suffix
    return None


def title_of(path, anchor):
    """Titre de la page (front matter ou premier #), ou de la section visée par l'ancre."""
    if not path.endswith((".md", ".mdx")):
        return ""
    with open(path, encoding="utf8", errors="replace") as f:
        lines = f.read().splitlines()
    if anchor:
        for line in lines:
            m = re.match(r"^#+\s+(.*?)\s*#*\s*$", line)
            if m and re.sub(r"[^a-z0-9]+", "-", m.group(1).lower()).strip("-") == anchor:
                return "§ " + m.group(1)
        return "§ ANCRE INTROUVABLE"
    for line in lines[:15]:
        m = re.match(r"^title:\s*(.+)$", line)
        if m:
            return m.group(1).strip("'\"")
    for line in lines:
        m = re.match(r"^#\s+(.*?)\s*#*\s*$", line)
        if m:
            return m.group(1)
    return os.path.basename(path)


def fix_file(path, locale_root, changes, unresolved, dry_run):
    with open(path, encoding="utf8", newline="") as f:
        lines = f.read().split("\n")
    in_fence = False
    changed = False
    for i, line in enumerate(lines):
        if FENCE.match(line.strip()):
            in_fence = not in_fence
        if in_fence or "\\" not in line:
            continue

        def repl(m):
            nonlocal changed
            bang, text, target, title = m.group(1), m.group(2), m.group(3), m.group(4) or ""
            if "\\" not in target or re.match(r"^[a-z][a-z0-9+.-]*:", target, re.I):
                return m.group(0)
            found, anchor, method = resolve(target, path, locale_root)
            if not found:
                unresolved.append((path, i + 1, text, target))
                return m.group(0)
            wrong = WRONG_TARGET.get(text.strip().lower())
            if wrong and os.path.basename(found) == wrong[0]:
                # bonne page dans le dossier de la langue, sinon en anglais (repli Docusaurus)
                dirs = [os.path.dirname(found)]
                if found.startswith(locale_root + os.sep):
                    dirs.append(os.path.join(DOCS, os.path.dirname(os.path.relpath(found, locale_root))))
                for d in dirs:
                    if os.path.isfile(os.path.join(d, wrong[1])):
                        found, method = os.path.join(d, wrong[1]), "cible corrigée"
                        break
            nt = new_target(found, anchor, locale_root, path)
            if nt is None:
                unresolved.append((path, i + 1, text, target))
                return m.group(0)
            changes.append((path, i + 1, text, target, nt, method, title_of(found, anchor)))
            changed = True
            return f"{bang}[{text}]({nt}{title})"

        lines[i] = LINK.sub(repl, line)
    if changed and not dry_run:
        with open(path, "w", encoding="utf8", newline="") as f:
            f.write("\n".join(lines))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="en", choices=sorted(LOCALES))
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--report", help="écrit un tableau markdown texte du lien → cible → titre de la cible")
    args = ap.parse_args()

    root = LOCALES[args.lang]
    changes, unresolved = [], []
    for d, _, fs in os.walk(root):
        for f in sorted(fs):
            if f.endswith((".md", ".mdx")):
                fix_file(os.path.join(d, f), root, changes, unresolved, args.dry_run)

    by_method = {}
    for c in changes:
        by_method[c[5]] = by_method.get(c[5], 0) + 1
    print(f"[{args.lang}] {len(changes)} liens réécrits " + str(by_method) + f", {len(unresolved)} non résolus")
    for p, n, text, t in unresolved:
        print(f"  NON RÉSOLU {os.path.relpath(p, root)}:{n}  [{text}]({t})")
    if args.report:
        with open(args.report, "w", encoding="utf8") as f:
            f.write("| fichier:ligne | texte du lien | nouvelle cible | méthode | titre de la cible |\n|---|---|---|---|---|\n")
            for p, n, text, t, nt, method, title in changes:
                f.write(f"| {os.path.relpath(p, root)}:{n} | {text} | {nt} | {method} | {title} |\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
