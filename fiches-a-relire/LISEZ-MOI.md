# Fiches à relire : pages de l'ancien wiki qui manquent

## À quoi sert ce dossier

L'ancien wiki (MediaWiki) a 15 pages qui manquent au wiki Docusaurus actuel, ou dont il manque des parties. Ce dossier contient **une fiche par page**. Chaque fiche te dit quoi faire, puis donne le texte déjà converti en Markdown, sans réécriture. Tu décides, fiche par fiche : copier, réécrire, fusionner ou abandonner.

Ce dossier est **hors du dépôt** : rien n'est mélangé avec `docs/`. Les textes d'origine restent dans `articles-a-convertir/`, que je n'ai pas touché.

## Règle suivie

Les « guides » doivent disparaître : leur contenu devient un **chapitre de la fiche métier** concernée (Scientist, Research Director, Virologist, Engineer...). C'est pourquoi la cible proposée est presque toujours une fiche métier existante, avec le nom de la section à créer. Une nouvelle page n'est proposée que si rien ne convient (Notable Versions).

## Ordre de lecture

1. La Science d'abord (fiches 01 à 08) : le wiki actuel dit que « les rôles de science ne peuvent rien faire », alors que l'ancien wiki a des guides complets. C'est le plus gros manque.
2. Le reste du joueur (fiches 09 à 12).
3. Le développement (fiches 13 à 15).

Commence par la 01 (techweb) : les fiches 02 à 06 s'y rattachent.

## Tableau récapitulatif

| Fiche | Cible proposée | Taille | Priorité |
|---|---|---|---|
| [01-research-and-development.md](01-research-and-development.md) | `Scientist.md` : chapitre Research and Development | 921 mots | haute (Science) |
| [02-scientist.md](02-scientist.md) | `Scientist.md` : remplace le stub | 651 mots | haute (Science) |
| [03-research-director.md](03-research-director.md) | `Research-Director.md` : remplace le stub | 660 mots | haute (Science) |
| [04-ordnance.md](04-ordnance.md) | `Scientist.md` : chapitre Ordnance Lab (tableau chimie vers `Chemist.md`) | 2094 mots | haute (Science) |
| [05-high-energy-lab.md](05-high-energy-lab.md) | `Scientist.md` : chapitre High Energy Lab | 1155 mots | haute (Science) |
| [06-xenoarcheology.md](06-xenoarcheology.md) | `XenoBiologist.md` : mise à jour (version plus ancienne déjà là) | 1257 mots | haute (Science) |
| [07-virology.md](07-virology.md) | `Virologist.md` : remplace le stub | 1487 mots | haute (Science et Médical) |
| [08-chemistry.md](08-chemistry.md) | `Chemist.md` : section Chemistry (doublon avec 04) | 385 mots | moyenne |
| [09-gateway.md](09-gateway.md) | `AnatomyOfStation.md` : section Gateway (vide) | 185 mots | moyenne |
| [10-abandoned-crates.md](10-abandoned-crates.md) | `Curator.md` : section Abandoned crates | 373 mots | moyenne |
| [11-construction.md](11-construction.md) | `Engineer.md` : section Construction | 1316 mots | moyenne |
| [12-atmospheric-technician.md](12-atmospheric-technician.md) | `Atmospherics-Technician.md` : déjà présent, abandon conseillé | 549 mots | basse (probablement déjà présent) |
| [13-dev-mapping.md](13-dev-mapping.md) | `5_Dev/.../How-to-Map.md` : nouveau chapitre | 863 mots | dev |
| [14-dev-host-a-server.md](14-dev-host-a-server.md) | `5_Dev/.../Hosting-a-Server.md` : fusion | 1056 mots | dev |
| [15-dev-notable-versions.md](15-dev-notable-versions.md) | nouvelle page `5_Dev/.../Notable-Versions.md` | 228 mots | dev |
| [16-hierarchie-de-commandement.md](16-hierarchie-de-commandement.md) | `Jobs.md` : schéma sous le tableau des métiers (image de Fr_Dae ou version Mermaid) | schéma | moyenne |

## Comment faire pour chaque fiche

1. Lire l'en-tête : la cible, ce qui existe déjà, la liste « À vérifier ».
2. Cocher une décision dans la fiche (copier, réécrire, fusionner, abandonner).
3. Si tu copies ou fusionnes : reprendre la partie sous la ligne « Contenu converti », puis régler les points de « À vérifier » (images, chiffres, liens).
4. Ne pas oublier de retirer l'avertissement « SCIENCE ROLES CURRENTLY CAN NOT DO ANYTHING » dans `Scientist.md`, `Research-Director.md`, `Virologist.md` et `Geneticist.md` une fois les rôles décrits (à confirmer en jeu).

## Points d'attention

- **Fiche 12 (Atmospheric Technician)** : l'inventaire la disait manquante, mais le texte est déjà dans `Atmospherics-Technician.md` (97 % identique). Abandon conseillé.
- **Fiche 06 (Xenoarcheology)** : la page actuelle `XenoBiologist.md` contient déjà une version plus ancienne du guide. Il y a un conflit (disque de données ou rapport imprimé) à trancher.
- **Doublon 04 et 08** : le tableau de produits chimiques est dans les deux. N'en garder qu'un.
- **Contradiction 02 et 04** : singularité à 450 unités ou à 400 unités de matière noire liquide.
- **Sections « Mapping »** à la fin des guides 04, 05, 06 et 07 : pour les développeurs, pas pour les joueurs. À déplacer vers `How-to-Map.md` ou à supprimer.
- **Images** : aucune n'a été téléchargée. Chaque image est remplacée par une ligne `🖼️ image manquante : nom.png`.

## Conventions de conversion

- Textes en anglais, non réécrits. Les titres commencent à `##`. Les tableaux sont en Markdown.
- Lien interne `[[Page|texte]]` devenu `texte (ancien lien : Page)`. Les liens vers une ancre de la même page deviennent du texte simple.
- Modèles `{...}`, balises `translate` et marques `T:n` retirés. Le modèle `Role Header` (fiches 02, 03 et 12) est gardé sous forme de petit tableau. Le modèle `TechwebNode` (fiche 01) est gardé sous forme de tableau.
- Les tableaux de construction (fiche 11) à cellules fusionnées sont remplacés par une fiche par élément.
- Le Markdown est prévu pour MDX v1 : pas de balise ou d'accolade nue (les accolades de l'URL de la fiche 14 ont été remplacées par `PLATFORM` et `VERSION_NUMBER`).
- Les catégories de l'ancien wiki (Research Guides, Needs Revision, etc.) sont retirées.
