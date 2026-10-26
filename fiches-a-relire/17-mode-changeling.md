> 🔗 **Liens**
> - Source : le code du jeu (aucune page dans les anciens wikis). Dépôt [unitystation/unitystation](https://github.com/unitystation/unitystation), branche `develop`
> - Fiche cible proposée : nouvelle page `docs/3_HowToPlay/Jobs/Antagonist_roles/Changeling.md` (même dossier que [Traitor.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/3_HowToPlay/Jobs/Antagonist_roles/Traitor.md))
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

# Fiche 17 : mode et antagoniste Changeling

- **Source** : le code du jeu uniquement (relevé le 26/10). Les chemins ci-dessous sont relatifs à `UnityProject/Assets/`.
- **Priorité** : moyenne (un antagoniste existe dans le jeu et n'a aucune page)

**Où la mettre**

`docs/3_HowToPlay/Jobs/Antagonist_roles/Changeling.md` : une page d'antagoniste, comme Traitor ou Wizard. Le mode de jeu et l'antagoniste portent le même nom ; une seule page suffit.

**Ce qui existe déjà dans le wiki** (recherche dans `docs/` de `origin/main`)

Rien de dédié. Le mot « Changeling » n'apparaît que dans `Security-Officer.md` (conseil : tirer à distance sur les Wizards et les Changelings ; ennemi de la corporation « The Changeling Hivemind ») et dans les deux pages Bartender (`3_HowToPlay/.../Bartender.md` et `5_Dev/Routine/Services/Bartender.md`, boisson « Changeling Sting »). `Antagonist_roles.md` est un simple index.

## Ce que le code prouve

**Le mode de jeu** (`ScriptableObjects/GameModes/Changeling.asset`)

| Champ | Valeur | 
|---|---|
| `gameModeName` | Changeling |
| `description` | vide |
| `minPlayers` | 4 |
| `antagRatio` | 0.3 (30 % des joueurs) |
| `minAntags` / `maxAntags` | 1 / 4 |
| `forceMinAntags` | 1 (le mode n'est possible que si le nombre de joueurs × 0,3 arrondi au-dessus donne au moins 1) |
| `midRoundAntags` | 1, chance 50 (un joueur qui arrive en cours de partie peut devenir changeling) |
| `canRespawn` | 0 |
| `allocateJobsToAntags` | 1 : le changeling a un vrai métier, tiré parmi ceux qui sont permis |
| Métiers interdits aux antagonistes | Captain, HoP, HoS, Warden, Security Officer, Detective, CMO, RD, AI (liste `nonAntagJobTypes` décodée avec `Scripts/US13/Systems/Occupations/JobType.cs`) |
| `randomSicknesses` | 1, ratio 0.01 |

La classe du mode (`Scripts/US13/Systems/GameModes/Changeling.cs`) est **vide** : tout le comportement vient de la classe de base `GameMode.cs`.

**Est-il dans la rotation ?** Non. `ScriptableObjects/GameModes/GameModeData.asset` liste 7 modes en rotation (Cargonia, NukeOps, Mixed, Wizard, Vampires, Blob, BloodBrothers ; identifiants recoupés avec les `.asset.meta`). Changeling n'y est pas. Et `GameModeData.GetGameMode` ne cherche que dans la rotation (plus Extended si le serveur l'autorise) et renvoie Mixed si le nom n'est pas trouvé, donc le mode n'est pas non plus choisissable dans la liste des modes de l'admin (`GameManager.GameMode.cs`, `GetAvailableGameModeNames`). **Vérifié : le mode Mixed ne contient PAS le changeling** (voir fiche 19).

**Comment un changeling apparaît quand même** : par un admin. La page admin de réapparition (onglet antagonistes, `Scripts/US13/UI/Systems/AdminTools/AntagRespawnTab.cs`) propose les antagonistes de `Resources/ScriptableObjectsSingletons/adminJobsList.asset`, et le Changeling est dans cette liste (avec Vampire, Highlander, Swapper…). Le serveur fait alors réapparaître le joueur en changeling (`PlayerNetworkActions.ServerRespawnPlayerAntag` → `AntagManager.ServerRespawnAsAntag`). Je n'ai pas trouvé d'autre chemin dans le code (l'antagoniste Changeling n'est référencé que par `GameModes/Changeling.asset`, `AntagData.asset` et `adminJobsList.asset`) : aujourd'hui, un changeling est donc **un antagoniste posé par un admin**, pas un mode tiré au hasard. À vérifier en jeu : qu'aucun autre moyen (événement, etc.) n'en crée.

**L'antagoniste** (`ScriptableObjects/Antagonists/Antags/Changeling.asset`, classe `Scripts/US13/Systems/Antagonists/Antags/ChangelingImposter.cs`)

- Nom affiché : Changeling ; visible dans les préférences d'antagoniste du joueur (`showInPreferences: 1`).
- 2 objectifs (`numberOfObjectives: 2`) **tirés au hasard** (`AntagData.GenerateObjectives`, tirage pondéré, poids 1 par défaut dans `Objective.cs`) parmi l'objectif propre au changeling, **Get DNA** (« Extract DNA by using your abilities. », **5 ADN** à avoir en réserve : `Antagonists/Objectives/GetDNA.asset`, `dnaNeedCount: 5` ; le compteur est le nombre d'ADN stockés, `ChangelingMain.ExtractedDna`), et les objectifs partagés de `Antagonists/AntagData.asset` (Steal, Assassinate, Maroon, HungryCrew), car `canUseSharedObjectives: 1`. Get DNA n'est donc **pas garanti**.
- Plus **un** objectif de fin tiré au hasard dans la liste `EscapeObjectives` de `AntagData.asset` (`needsEscapeObjective: 1`) : Survive, Escape, Glorious Death, Hijack, Not Cuffed ou un des trois « Prevent Everyone From Escaping… ». Ce n'est donc pas forcément « s'évader sur la navette ». Pas d'objectif « gimmick » (`chanceForGimmickObjective: 0`).
- À la création du personnage, si l'espèce choisie n'est pas autorisée (`allowedToChangeling`), le jeu génère un personnage aléatoire avec une espèce autorisée (`ChangelingImposter.ServerSpawn`).
- Ressources (`Antags/Changeling/ChangelingMain.cs`) : produits chimiques (« chems ») 25 au départ, 75 au maximum ; points d'évolution (EP) 10 au départ ; 1 « reset » de pouvoirs disponible (`resetCountMax = 1`).
- Régénération : `Tick` est appelé **toutes les secondes** (`UpdateManager.Add(Tick, 1f)`) et ajoute 1 chem tous les 2 ticks (`CHEM_ADD_PER_TIME = 1`, `CHEM_ADD_TIME_BASE = 2`), soit **+1 chem toutes les 2 secondes**. Chaque pouvoir actif qui « ralentit » ajoute 2 secondes (`CHEM_ADD_TIME_BASE_SLOWED`) ; un pouvoir qui « arrête » la régénération la met à 0 (`RefreshChemRegeneration`).
- **Absorb** (`AbsorbAbility.cs`) : impossible sur un corps mort (« You cannot absorb a dead body! ») ; barre de progression de 20 s (`stingTime: 20` dans `Absorb.asset`) ; à la fin la victime est **tuée** (999 de dégâts oxy, brute et clone), son sang est entièrement vidé et son cerveau supprimé. Le changeling gagne l'ADN, des souvenirs et **+50 chems** (sans dépasser le maximum ; `ChangelingMain.AbsorbDna`).
- Absorber **un autre changeling** : on récupère tous ses ADN et souvenirs, +1 reset, +50 chems maximum, +50 chems, **+5 EP**.
- **Store** : on achète un pouvoir avec ses EP (`CmdBuyAbility` → refus si EP insuffisants). Le **reset** (`CmdResetAbilitiesAdmin`) retire les pouvoirs achetés (ceux qui ne sont pas « de départ ») et rend leurs EP ; il consomme un reset, sauf s'il n'y avait rien à retirer.
- **Écart avec les textes du jeu** : la description de magasin d'Absorb (`descriptionStore`) et le conseil de `tips.txt` disent qu'absorber quelqu'un permet de re-choisir ses pouvoirs. Le code ne donne un reset supplémentaire **que** si la victime est un changeling (`resetCountMax++` seulement dans `AbsorbDna(PlayerScript, ChangelingMain)`). Il faut croire le code.

**Pouvoirs** (`ScriptableObjects/Antagonists/Changeling/*.asset`, coût en chems / en EP)

| Pouvoir | Description (champ `description`) | Chems | EP |
|---|---|---|---|
| Absorb | Absorbs body for DNA (barre de 20 s) | 0 | 0 |
| Extract DNA Sting | Extracts body DNA (barre de 4 s) | 25 | 0 |
| Transform | Transformation to one of your stored DNA (l'asset `OpenTransform` ouvre le choix, l'asset `TransformAbility` coûte 5 chems) | 0 puis 5 | 0 |
| Regenerate | Regenerate your body from damage | 10 | 0 |
| Reviving Stasis | Fakes death and enters into stasis (recharge 15 ; utilisable en état critique ; arrête la régénération des chems, `isStopingChemRegeneration: 1`) | 15 | 0 |
| Memories | Absorbed memories of victims | 0 | 0 |
| Store | Store for getting abilities | 0 | 0 |
| Augmented Eyesight | Enables x-ray and night vision (ralentit la régénération des chems quand actif) | 0 | 2 |
| Hallucination Sting | Extracts body DNA with injection large doses of hallucinogenic chemicals (35 unités de produit, `reagentCount: 35` ; effet « after 30 to 60 seconds » d'après `descriptionStore`) | 5 | 1 |

Pouvoirs de départ (`startAbility: 1`) : tous sauf Augmented Eyesight et Hallucination Sting, qui s'achètent au Store avec les EP.

Les conseils du jeu (`Strings/tips.txt`, lignes 28, 185, 186) disent : on absorbe quelqu'un en l'étranglant puis en utilisant « Absorb » ; cela donne la possibilité de re-choisir ses pouvoirs (**contredit par le code**, voir plus haut), l'ADN et la mémoire de la victime ; le « Extract DNA » compte pour l'objectif d'ADN mais ne permet pas de re-choisir ses pouvoirs ; un docteur qui ne peut pas tirer de sang d'un corps « husk » a la preuve d'un changeling (cohérent avec le code : Absorb vide tout le sang). L'étranglement n'est pas vérifié dans le code d'Absorb (il cherche seulement un joueur vivant sous le clic).

## Brouillon de page (anglais)

```md
---
title: Changeling
---

# Changeling

The Changeling is an antagonist who extracts and stores the DNA of other crew members, then takes their appearance. A changeling starts with a small pool of chemicals ("chems", 25 at the start, 75 at most) that refill by 1 every 2 seconds, and spends them on its abilities. It also starts with 10 evolution points (EP) to buy extra abilities in the Store.

## Objectives

A changeling receives two random objectives, picked from "Get DNA" (hold the DNA of 5 people) and the usual shared objectives (steal, assassinate, maroon...), plus one random end-of-round objective (for example survive, escape on the shuttle, or hijack).

## Abilities

| Ability | What it does | Cost |
|---|---|---|
| Absorb | Absorb a living victim (20 seconds): you get its DNA, some memories and 50 chems. The victim dies and is drained of all blood. | Free |
| Extract DNA Sting | Take a target's DNA with a sting. | 25 chems |
| Transform | Take the appearance of one of your stored DNA. | 5 chems |
| Regenerate | Heal your body from damage. | 10 chems |
| Reviving Stasis | Fake your death and enter stasis. Stops chem regeneration while active. | 15 chems |
| Hallucination Sting | Extract DNA while injecting hallucinogens. | 5 chems, 1 EP |
| Augmented Eyesight | X-ray and night vision (slows chem regeneration). | 2 EP |

Evolution points (EP) are spent in the Store. You have one reset: it removes the abilities you bought and gives their EP back. Absorbing another changeling gives you one more reset, 50 more maximum chems, 50 chems and 5 EP.

## How to spot one

A Medical Doctor who cannot draw any blood from a husk has confirmed a changeling.
```

## À vérifier

- À vérifier en jeu : la portée du Sting et d'Absorb (le code prend le joueur sous le clic, `GetPlayerOnClick`) ; les temps de recharge réels.
- À vérifier en jeu : si Absorb demande vraiment d'étrangler la victime (ce que dit `tips.txt`, pas le code lu).
- Le mode Changeling n'est ni en rotation ni choisissable par l'admin (voir plus haut) : on décrit l'antagoniste, posé par un admin, et on ne parle pas de « mode » tant que ce n'est pas changé dans le jeu.
- À vérifier en jeu : les espèces autorisées (`allowedToChangeling`).
- Les chiffres (chems, EP, coûts) viennent des fichiers de données et peuvent bouger avec les versions.
- Aucune image proposée.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner avec une autre fiche (laquelle : ____)
- [ ] abandonner
