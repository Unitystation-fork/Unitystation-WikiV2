#!/usr/bin/env python3
"""Vérifie les liens .md et les images des docs, sans build (quelques secondes).

Reproduit la résolution de Docusaurus : un lien est cherché d'abord dans le
dossier localisé (i18n/<lang>/.../current), puis dans docs/ (repli).
Sortie : un compte par catégorie et par langue ; code retour 1 s'il reste des erreurs.

    python3 scripts/check_links.py            # résumé
    python3 scripts/check_links.py -v         # détail de chaque lien
    python3 scripts/check_links.py --lang fr  # une seule langue
"""
import argparse
import os
import re
import sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
STATIC = os.path.join(ROOT, "static")
LOCALES = {"en": DOCS}
for lang in ("fr", "ru", "de"):
    for cand in (lang, lang.upper()):
        p = os.path.join(ROOT, "i18n", cand, "docusaurus-plugin-content-docs", "current")
        if os.path.isdir(p):
            LOCALES[lang] = p
            break

LINK = re.compile(r"(!?)\[[^\]]*\]\(\s*<?((?:[^()\s>]|\([^()]*\))+)>?(?:\s+\"[^\"]*\")?\s*\)")
FENCE = re.compile(r"^(```|~~~)")
EXTERNAL = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//|#)", re.I)


def exists(path):
    return os.path.exists(path)


def exists_nocase(path):
    """Vrai si le chemin existe en ignorant la casse (détecte Jobs vs jobs)."""
    cur = os.path.abspath(os.sep)
    for part in os.path.normpath(path).split(os.sep)[1:]:
        try:
            names = os.listdir(cur)
        except OSError:
            return False
        match = next((n for n in names if n.lower() == part.lower()), None)
        if match is None:
            return False
        cur = os.path.join(cur, match)
    return True


def candidates(target, src_file, locale_root):
    """Chemins possibles pour un lien : relatif au fichier, ou depuis la racine docs."""
    t = target.split("#")[0].split("?")[0]
    bases = []
    if t.startswith("/"):
        bases = [t.lstrip("/")]
    else:
        rel = os.path.relpath(os.path.dirname(src_file), locale_root)
        bases = [os.path.normpath(os.path.join(rel, t))]
    out = []
    for b in bases:
        for root in dict.fromkeys([locale_root, DOCS]):
            out.append(os.path.join(root, b))
    return out


def check_file(path, locale_root, errors):
    in_fence = False
    with open(path, encoding="utf8", errors="replace") as f:
        for n, line in enumerate(f, 1):
            if FENCE.match(line.strip()):
                in_fence = not in_fence
            if in_fence:
                continue
            for bang, target in LINK.findall(line):
                if EXTERNAL.match(target):
                    continue
                kind = None
                if "\\" in target:
                    kind = "antislash"
                    target_n = target.replace("\\", "/")
                else:
                    target_n = target
                is_image = bool(bang) or target_n.lower().endswith(
                    (".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg")
                )
                if is_image:
                    cands = candidates(target_n, path, locale_root)
                    cands += [os.path.join(ROOT, target_n.lstrip("/")),
                              os.path.join(STATIC, target_n.lstrip("/").removeprefix("static/"))]
                else:
                    if not target_n.split("#")[0].endswith((".md", ".mdx")) and "." in os.path.basename(target_n.split("#")[0]):
                        continue  # autre type de fichier (pdf, zip...) : hors périmètre
                    cands = candidates(target_n, path, locale_root)
                if any(exists(c) for c in cands) and kind is None:
                    continue
                if kind is None:
                    kind = "casse" if any(exists_nocase(c) for c in cands) else (
                        "image-absente" if is_image else "cible-absente")
                elif not any(exists(c) for c in cands):
                    kind = "antislash" if any(exists_nocase(c) for c in cands) else "antislash+absente"
                errors.append((kind, os.path.relpath(path, ROOT), n, target))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-v", "--verbose", action="store_true")
    ap.add_argument("--lang", choices=sorted(LOCALES))
    ap.add_argument("--fail-on", default="all",
                    help="catégories qui font échouer, séparées par des virgules (défaut : toutes)")
    args = ap.parse_args()

    total = 0
    summary = defaultdict(Counter)
    detail = []
    for lang, root in LOCALES.items():
        if args.lang and lang != args.lang:
            continue
        errs = []
        for d, _, fs in os.walk(root):
            for f in fs:
                if f.endswith((".md", ".mdx")):
                    check_file(os.path.join(d, f), root, errs)
        for kind, *_ in errs:
            summary[lang][kind] += 1
        detail += [(lang, *e) for e in errs]
        total += len(errs)

    for lang, c in summary.items():
        print(f"[{lang}] {sum(c.values()):5d} liens en erreur : " + ", ".join(f"{k}={v}" for k, v in c.most_common()))
    if args.verbose:
        for lang, kind, f, n, t in detail:
            print(f"{kind:18s} {f}:{n}  {t}")
    if total == 0:
        print("OK : aucun lien en erreur")
    wanted = None if args.fail_on == "all" else set(args.fail_on.split(","))
    bad = [d for d in detail if wanted is None or d[1] in wanted]
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
