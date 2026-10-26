# Bilan du wiki Unitystation — où on en est (26 octobre 2026)

Le but, tel que tu l'as posé : **un seul wiki** à la place des trois qui se marchent dessus, propre, facile à mettre à jour, traduisible, aussi complet que possible et **simple à naviguer**.

Ce bilan compare le wiki actuel aux trois anciens et liste ce qui reste à faire. Les chiffres ont été comptés, pas estimés.

---

## 1. Les trois anciens wikis face au nôtre

| Wiki | Pages | Dernière modif | Ce qui est repris chez nous |
|---|---|---|---|
| **Ancien wiki MkDocs** (unitystation.github.io/unitystation-wiki) | 101 | mai 2022 (gelé) | **Tout** : 87 pages reprises, les 14 autres fusionnées dans les fiches métier (Space Law, Atmospherics, Singularity, Botany, Food…). Il ne manque qu'une ébauche de 150 mots sur la chirurgie. |
| **MediaWiki** (wiki.unitystation.org) | ~95 pages de contenu | **juin 2026, encore modifié** | Environ 25 pages fusionnées chez nous (Combat, Space Law, Jargon, Not Dying, Species, guides d'ingénierie, de cuisine et de chirurgie…). **9 guides joueur et 3 pages dev n'existent pas chez nous** (voir § 2). |
| **Docs dev du dépôt du jeu** (unitystation.github.io/unitystation) | 74 | **25 octobre 2026, toujours actif** | 65 pages communes : 39 identiques, 26 qui ont changé depuis. 8 pages manquantes sont ajoutées par la PR [#364](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/364). Il ne reste que la licence (AGPLv3) et une liste d'emojis générée. |

👉 **Votre travail de fusion est quasi complet pour l'ancien wiki MkDocs.** Les fiches métier ont bien absorbé les guides, et « Roles » est devenu « Jobs ». Le seul vrai écart est avec le **MediaWiki**, qui a continué d'être enrichi en 2024-2025, surtout pour la **Science**.

## 2. Articles manquants (mis de côté pour conversion)

Pour chaque page, j'ai vérifié que ses mots-clés n'apparaissent nulle part dans notre `docs/`, au cas où le sujet aurait été fusionné dans une autre page (« techweb », « catwalk », « H.I.E.C.A », « abandoned crate »… : 0 occurrence). Le texte brut de chaque page est dans [`articles-a-convertir/`](articles-a-convertir/) ; la version lisible, en fiches, est dans [`fiches-a-relire/`](fiches-a-relire/).

**Pour les joueurs**
| Page MediaWiki | Mots | Modifiée | Ce qu'elle apporte |
|---|---|---|---|
| Guide to Research and Development | 921 | 2025-05 | La techweb et les points de recherche : rien chez nous |
| Guide to Ordnance | 2 094 | 2025-07 | Les grenades chimiques et le labo Ordnance |
| Guide to the High Energy Lab | 1 155 | 2025-05 | Le H.I.E.C.A et le projecteur laser |
| Guide to Xenoarcheology | 1 257 | 2025-05 | Les consoles et les rapports d'anomalie (notre page n'en a qu'une partie) |
| Guide to Virology | 1 487 | 2025-07 | La virologie |
| Guide to Chemistry | 385 | 2025-07 | Le tableau des recettes |
| Abandoned crates | 373 | 2024-09 | Les mini-jeux des caisses verrouillées |
| The Gateway | 185 | 2024-09 | Le portail vers les « away sites » |
| Guide to construction | 1 316 | 2024-02 | Les sections Catwalk, Plating, sols et Hidden Door, absentes chez nous |

Sections en plus dans les versions MediaWiki de **Scientist** (les 5 labos) et de **Research Director** (la supervision des labos). (Atmospheric Technician, signalé au départ, est en fait déjà complet chez nous.)

📁 **Les fiches à relire une par une sont dans [`fiches-a-relire/`](fiches-a-relire/)** : 15 fiches, chacune avec la page d'origine convertie en Markdown, la fiche métier où la fusionner, ce qui existe déjà, les points à vérifier et une case de décision. Commence par [`LISEZ-MOI.md`](fiches-a-relire/LISEZ-MOI.md).

**Pour les devs** : Guide to Mapping (Map Editor via StationHub), Host a Server (serveur Docker), Notable Versions (builds archivés).

Ces pages contiennent des modèles MediaWiki (`{{Role Header}}`, `<translate>`) à retirer, et beaucoup portent le bandeau « copie de l'ancien wiki, à revoir ». Les images ne sont pas récupérées.

## 3. Ce qui a été fait depuis hier (PR)

| PR | Ce que ça change pour le lecteur | État |
|---|---|---|
| [#346](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/346), [#347](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/347) | Contrôle des liens ; adresse du site en https | ✅ fusionnées, en ligne |
| [#349](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/349) | Plus de restes du modèle Docusaurus (footer « Inc. », faux liens) | ✅ fusionnée |
| [#350](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/350) | 517 liens à antislash réparés ; le menu des métiers remarche | ✅ fusionnée |
| [#354](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/354) | Chaque PR est construite dans les 4 langues et ses liens vérifiés | ✅ fusionnée |
| [#356](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/356) | 3 pages Dev « Page Not Found » réparées | ✅ fusionnée |
| [#353](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/353) | **Les traductions fr, ru, de fonctionnent enfin** (elles n'avaient jamais été chargées) | prête, **à fusionner en premier** |
| [#358](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/358) | La recherche surligne le mot cherché sur la page | prête |
| [#359](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/359) | Commande d'installation macOS à jour | prête |
| [#361](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/361) | 18 images mortes récupérées des archives web, 3 barrées | prête |
| [#364](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/364) | 8 pages Dev manquantes ajoutées depuis le dépôt du jeu | prête |
| [#367](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/367) | **Tableau des métiers construit à partir du menu** : toutes les pages (Cyborg, Xeno…), même ordre, catégories cliquables, traduit | prête, après [#353](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/353) |
| [#368](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/368) | **Menu de gauche traduit** en fr, ru, de (il ne l'était dans aucune langue) | prête, après [#367](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/367) |

Quand le lot sera fusionné, je prépare la note de version pour la mise en ligne.

## 4. Ce que j'ai trouvé d'étrange

1. **Les pages Science disent « SCIENCE ROLES CURRENTLY CAN NOT DO ANYTHING »** (Scientist, Research Director, Geneticist, Virologist). Le MediaWiki de 2025 décrit pourtant 5 labos complets. C'est sûrement périmé.
2. **Le MediaWiki est toujours vivant** : des modifications datent de 2025, et même de juin 2026. Tant qu'il est modifié, les deux wikis vont continuer à diverger.
3. **Les docs dev du dépôt du jeu bougent encore** : il y a eu une modification hier. 26 pages ont déjà divergé de notre copie.
4. **`XenoBiologist.md` parle de xénoarchéologie**, pas de xénobiologie. Je l'ai titrée « Xenoarcheology » ; ce n'est pas vraiment un métier.
5. **Le menu affiche « Cargonia »** là où l'ancien tableau disait « Revolutionary » (c'est le titre de la page).
6. **« Cargo Bounties »** (un guide) est rangé avec les métiers Cargo.
7. **Dans Dev/Routine, des dossiers ont des noms français** (Antagoniste, Protagoniste, Sciences, Services) au milieu de noms anglais (Cargo, Command…).
8. **Des noms de dossier s'affichent tels quels dans le menu anglais** : `General_guides`, `Gateway_Maps`, `tools`, et « Offical » (avec la faute) dans Offical Station Maps.
8b. **« User interface » contient une sous-catégorie « User Interface »** : le menu affiche deux fois la même entrée, l'une dans l'autre. **« tools »**, rangé dans Univers (côté joueur), ne contient qu'un mode d'emploi de scripts pour développeurs (craftableLister).
9. **13 pages gardent du code de l'ancien MediaWiki** (`[[Page]]`, `[[File:…]]`), qui s'affiche tel quel.
10. **Les traductions sont partielles** : 65 pages sur 214 en français, 91 en russe, 9 en allemand. Certaines pages traduites n'ont pas le tableau des métiers (Capitaine en français).
11. **La licence** : le jeu est passé en AGPLv3 en novembre 2025, mais le wiki affiche toujours une page GPLv3.
12. **61 liens anglais mènent à des pages qui n'existent pas** (dont 16 vers une ancienne page « Nuclear-Emergency »). Ils sont à corriger ou à barrer.

## 4 bis. Vérifié dans le code du jeu (dépôt unitystation/unitystation)

| Sujet | Ce que dit le code | Conséquence |
|---|---|---|
| **Science** | Techweb / R&D branchée (`Systems/Research/Techweb.cs`, serveur de recherche, protolathe, circuit imprinter, exosuit fabricator) ; artefacts de recherche (analyseur, console, rapports d'anomalie vendus au cargo) ; slimes (`SlimeProcessor`, labo Xenobiology) ; grenades chimiques ; projecteur laser de recherche | **La science fait bien quelque chose** : le bandeau « CAN NOT DO ANYTHING » est périmé. « H.I.E.C.A » n'existe pas dans le code (fiche 05 à vérifier). |
| **Xénoarchéologie / xénobiologie** | Le mot « xenoarcheology » n'est pas dans le code, mais les artefacts oui ; les slimes (xénobiologie) existent aussi. **Aucun métier « Xenobiologist »**. | Les deux activités existent ; ce sont des chapitres de Scientist, pas des métiers. |
| **Cargonia** | Le mode s'affiche **« Rebellion »** pour le joueur, l'antagoniste **« Rebel »**. « Revolutionary » n'apparaît nulle part. | La page dit « Cargonia is the current in-game name » : c'est faux. |
| **Redshield** | `REDSHIELD_OFFICER` existe ; **« Blueshield » n'existe nulle part** (c'est le nom de /tg/station). | Ticket [#365](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/365) mis en attente. |
| **Lawyer** | Département **Civilian** dans le jeu. | Le wiki le range dans Security. |
| **Geneticist** | Catégorie Medical, mais listé dans le département Research. | Double rattachement confirmé. |
| **Psychologist** | Le jeu dit **Psychiatrist**. | Nom de page à revoir ? |
| **Modes sans page** | Changeling, Vampires, Extended, Highlander, Map Editor, Mixed | Pages manquantes. |

**Qui écrit encore ailleurs** :
- MediaWiki : 1 251 modifications depuis 2023 (322 en 2023, 599 en 2024, 99 en 2025, 3 en 2026). Il est quasi à l'arrêt depuis juillet 2025 ; les principaux auteurs sont Atner (383 modifications, dernière en juillet 2025), Gilles, Eatham et Golub4ikRU.
- Ancien wiki GitHub Pages : dépôt archivé, rien depuis 2022.
- Docs dev du jeu : 10 à 12 commits par an (MaxIsJoe, Bod9001…), surtout sur CONTRIBUTING et la cartographie.

## 4 ter. Déjà tranché depuis (26/10)
- **Lawyer** : reste dans Security.
- **Geneticist** : sa fiche reste dans Medical, et une courte page dans Science renvoie vers elle, parce que le RD le supervise souvent : [#373](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/373).
- **Redshield** : le code dit Redshield, pas Blueshield. [#365](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/365) est en attente de ta réponse.
- **Licence** : passage en AGPLv3, comme le jeu : [#370](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/370).
- **Organigramme cliquable et traduit**, d'après ton schéma : [#374](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/374).
- **Contenu manquant** : les fiches à relire, avec le suivi dans [#372](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372).
- **Design** (couleurs, ergonomie) : une phase dédiée à la fin. D'ici là, on fait du fonctionnel et du contenu.

## 5. Questions pour toi

1. **Le MediaWiki** : qui le tient encore à jour ? Le but est-il qu'il renvoie vers notre wiki à terme ? Sinon, faut-il prévoir d'y reprendre régulièrement les nouveautés ?
2. **Les docs dev** : on les recopie régulièrement depuis le dépôt du jeu (comme dans [#364](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/364)), ou on renvoie vers leur site pour la partie dev ?
3. **La Science** : le code dit que oui (§ 4 bis). Je retire le bandeau « CAN NOT DO ANYTHING » ?
4. **Les articles du § 2** : lesquels veux-tu reprendre, et dans quel ordre ? Je propose de commencer par la Science (R&D, puis Scientist et Research Director).
5. **Xenoarcheology** : on la laisse dans les métiers Science, ou on la déplace dans un guide Science ?
6. **Cargonia** : le jeu affiche « Rebellion » (§ 4 bis). On titre la page « Rebellion », en citant Cargonia comme surnom ?
7. **Le classement du menu** suit les dossiers : Lawyer dans Security, Geneticist et Psychologist dans Medical, Fugitive dans Antagonist. C'est bon pour toi, ou faut-il déplacer des fichiers ?
8. **Les noms de dossier moches** (§ 4, points 7 et 8) : je peux les corriger dans une petite PR. Ça ne change aucune adresse pour la plupart ; je vérifierai chacun.
9. **La licence** : on passe la page en AGPLv3 comme le jeu ? C'est à décider avec mortifia.

10. **Redshield / Blueshield** : le jeu dit Redshield (§ 4 bis). On garde Redshield ?
11. **Lawyer** : le jeu le classe Civilian. On le déplace dans Service (le menu et le tableau suivront), ou on le laisse avec la Sécurité, avec qui il travaille ?
