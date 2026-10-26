> 🔗 **Liens**
> - Page d'origine (MediaWiki) : https://wiki.unitystation.org/index.php/Scientist
> - Fiche cible dans le dépôt : [docs/3_HowToPlay/Jobs/Science_roles/Scientist.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/3_HowToPlay/Jobs/Science_roles/Scientist.md)
> - Fiche cible en ligne : https://unitystation-wiki.unionrolistes.fr/HowToPlay/Jobs/Science_roles/Scientist/
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

> ✅ **Vérifié dans le code du jeu (26/10)** : la Techweb / R&D, les artefacts, les slimes et les grenades chimiques existent. Le bandeau « SCIENCE ROLES CURRENTLY CAN NOT DO ANYTHING » de la page actuelle est périmé.

# Fiche 02 : Scientist

- **Source** : [Scientist](https://wiki.unitystation.org/index.php/Scientist)
- **Dernière modification** : 2025-05-05
- **Taille** : 651 mots (compte de l'inventaire)
- **Priorité** : haute (Science)

**Où la mettre**

Fiche métier : `docs/3_HowToPlay/Jobs/Science_roles/Scientist.md`. C'est la fiche qui doit remplacer le stub actuel : remplacer tout le corps (supprimer l'avertissement « CAN NOT DO ANYTHING »), garder le bloc final `import Jobs … <Jobs />`. Sections : Your Laboratories (4 labos, chacun renvoyant au chapitre correspondant : fiches 05, 04, 06), Tips and Tricks, Traitorous Opportunities.

**Ce qui existe déjà dans le wiki**

`Scientist.md` : 40 mots, uniquement l'avertissement. Même avertissement dans `Research-Director.md`, `Medical_roles/Virologist.md`, `Medical_roles/Geneticist.md` : à retirer ensemble si les rôles sont fonctionnels (à confirmer en jeu). Le rôle « Traitorous Opportunities » existe sur d'autres fiches (par exemple « Traitorneering » dans `Engineer.md`) : reprendre ce modèle de titre.

**À vérifier**

- Le tableau d'en-tête (modèle `Role Header`) donne : département Science, supérieur Research Director, difficulté Medium, accès Public/Science/Research, complétion 65 %. Voir comment les autres fiches du wiki actuel affichent ces infos (ligne « Role type / Access / Difficulty »).
- Incohérence interne : cette page dit « over 450u of Liquid dark matter » forme une singularité, la fiche 04 (Ordnance) dit « over 400 units ». À trancher en jeu.
- La page a la catégorie « Needs Revision » : contenu pas validé par l'ancien wiki.
- Le laboratoire Xenobiology est décrit ici mais aucun guide associé n'existe (voir fiche 01).
- Plusieurs astuces (canon pneumatique, lunettes de science, combinaison d'anomalie) sont à confirmer dans la version actuelle du jeu.
- Image manquante : Mapping_Scientist.png (portrait du rôle).

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner dans `Scientist.md` (remplacement du stub)
- [ ] abandonner

---

**Contenu converti en Markdown (anglais, non réécrit)**

---

| Champ du modèle `Role Header` | Valeur |
|---|---|
| departmentcolor | #987a92 |
| department | Science |
| Role | Scientist |
| Image | 🖼️ Mapping_Scientist.png (image manquante) |
| superior | Research Director (ancien lien : Research Director) |
| difficulty | Medium |
| guides | Category:Research Guides (ancien lien : Category:Research Guides) |
| access | Public, Science, Research |
| completion | 65% |

As a station scientist, you will conduct various dangerous experiments onboard the station to accrue research points used to unlock new technologies. You will use these technologies to upgrade and enhance the station and it's crew.

## Your Laboratories

As a scientist you have access to several different labs used for various different kinds of research. They are as follows:

### The High Energy Lab

The simplest of all the experiments to perform but nonetheless crucial. In the high energy lab you will subject various objects to intense energies via the R&D laser projector. By redirecting and collecting the scattered energy from these collisions you will obtain valuable research data. But be warned, a lack of care can have devastating concequences.

### The Ordnance Lab

A lab of patience and careful preparation culminating in explosive results. In the ordnance lab you will formulate very specific explosives from bounties provided by centcomm. Formulating these explosives and measuring their detonations via the blast yield detector yields valuable data for Nanotrasen. The Ordnance lab tests your chemical skills and demands careful planning to ensure bounties are met. 

### The Xenoarcheology Lab

Arguably the most dangerous lab for its inhabitants, the xenoarcheology lab sees you record observations and sample bizarre artifacts obtained from off the station. Analyzing sampled artifacts will award RP and correct observations a substantial monetary reward. Great care must be taken when handling artifacts lest you lose your life, or cause others to lose theirs. Xenoarcheolgy requires cargo to supply research with artifacts to study and thus might not be available to conduct all of the time. 

### The Xenobiology Lab

The most questionable and most alive of the labs. The xenobiology lab focuses on the breeding of slimes and using their harvested cores to synthesise rare and valuable materials. No neglectful scientists will be tolerated here as the slimes require appropriate care to remain alive and not escape. Negligence can lead to the lab becoming inoperable, losing all of its specimens, or crew members getting hurt. 

## Tips & Tricks

- In a pickle? You can stop a slime from absorbing you by punching it! 

- Science goggles allow you to examine the exact contents of any reagent container by right clicking on the container and pressing "Contents"

- If fellow scientists are working on xenoarcheology, it might be wise to take an anomaly suit for yourself, some artifacts can affect a large area and you might find yourself without a head otherwise! (Literally)

- The pneumatic cannon works with any pressurised gas container and will release a portion of its contents on use. 

- Almost every machine can be upgraded with more advanced stock parts. Help out the station crew and they will remember it! 

- You can find the primary guide to R&D here Guide to Research and Development (ancien lien : Guide to Research and Development)

## Traitorous Opportunities

As a scientist you have many tools at your disposal when it comes to traitorous acts, but many which may trace back to you. 

Ordnance provides a steady supply of not only deadly, but useful utility explosives aswell that may be synthesised without much suspicion. Flash powder and sonic powder make great explosives to confuse and get the jump on opponents. With over 450u of Liquid dark matter detonating at once a singularity will be formed, not only that, but placing a bag of holding inside another bag of holding will have the same effect! 

The pneumatic cannon can be used to force feed objects to other players, you can use this to stealthily deliver poisons in packages people might not expect.

Slimes, bots, the protolathe itself, all provide many opportunities for havoc, become familiar with your labs and use your superior scientific intellect to get the jump on your foes. That is the way of the science department.
