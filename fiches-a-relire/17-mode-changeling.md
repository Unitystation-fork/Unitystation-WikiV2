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

Rien de dédié. Le mot « Changeling » n'apparaît que dans `Security-Officer.md` (conseil : tirer à distance sur les Wizards et les Changelings ; ennemi de la corporation « The Changeling Hivemind ») et dans le tableau du Bartender (boisson « Changeling Sting »). `Antagonist_roles.md` est un simple index.

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

**Est-il dans la rotation ?** Non. `ScriptableObjects/GameModes/GameModeData.asset` liste 7 modes en rotation (Cargonia, NukeOps, Mixed, Wizard, Vampires, Blob, BloodBrothers). Changeling n'y est pas. Et `GameModeData.GetGameMode` ne cherche que dans la rotation (plus Extended), donc le mode ne semble pas non plus choisissable dans la liste des modes de l'admin (`GameManager.GameMode.cs`, `GetAvailableGameModeNames`). Le changeling apparaît donc dans le jeu seulement si un autre mode le contient comme antagoniste. **Vérifié : le mode Mixed ne contient PAS le changeling** (voir fiche 19). À vérifier en jeu : comment un joueur peut réellement tomber sur un changeling aujourd'hui.

**L'antagoniste** (`ScriptableObjects/Antagonists/Antags/Changeling.asset`, classe `Scripts/US13/Systems/Antagonists/Antags/ChangelingImposter.cs`)

- Nom affiché : Changeling ; visible dans les préférences d'antagoniste du joueur (`showInPreferences: 1`).
- 2 objectifs (`numberOfObjectives: 2`) dont un objectif de base **Get DNA** : « Extract DNA by using your abilities. », **5 ADN** à obtenir (`Antagonists/Objectives/GetDNA.asset`, `dnaNeedCount: 5`). Objectifs partagés permis (`canUseSharedObjectives: 1`) et objectif d'évasion obligatoire (`needsEscapeObjective: 1`), pas d'objectif « gimmick ».
- À la création du personnage, si l'espèce choisie n'est pas autorisée (`allowedToChangeling`), le jeu génère un personnage aléatoire avec une espèce autorisée (`ChangelingImposter.ServerSpawn`).
- Ressources (`Antags/Changeling/ChangelingMain.cs`) : produits chimiques (« chems ») 25 au départ, 75 au maximum ; points d'évolution (EP) 10 au départ ; 1 « reset » de pouvoirs disponible (`resetCountMax = 1`). La vitesse de régénération des chems est `+1` toutes les `2` unités de temps (constantes `CHEM_ADD_PER_TIME` et `CHEM_ADD_TIME_BASE` ; l'unité n'est pas précisée dans le code).

**Pouvoirs** (`ScriptableObjects/Antagonists/Changeling/*.asset`, coût en chems / en EP)

| Pouvoir | Description (champ `description`) | Chems | EP |
|---|---|---|---|
| Absorb | Absorbs body for DNA | 0 | 0 |
| Extract DNA Sting | Extracts body DNA | 25 | 0 |
| Transform | Transformation to one of your stored DNA (l'asset `OpenTransform` ouvre le choix, l'asset `TransformAbility` coûte 5 chems) | 0 puis 5 | 0 |
| Regenerate | Regenerate your body from damage | 10 | 0 |
| Reviving Stasis | Fakes death and enters into stasis (recharge 15) | 15 | 0 |
| Memories | Absorbed memories of victims | 0 | 0 |
| Store | Store for getting abilities | 0 | 0 |
| Augmented Eyesight | Enables x-ray and night vision (ralentit la régénération des chems quand actif) | 0 | 2 |
| Hallucination Sting | Extracts body DNA with injection large doses of hallucinogenic chemicals | 5 | 1 |

Les conseils du jeu (`Strings/tips.txt`) confirment : on absorbe quelqu'un en l'étranglant puis en utilisant « Absorb » ; cela donne la possibilité de re-choisir ses pouvoirs, l'ADN et la mémoire de la victime ; le « Extract DNA » compte pour l'objectif d'ADN mais ne permet pas de re-choisir ses pouvoirs ; un docteur qui ne peut pas tirer de sang d'un corps « husk » a la preuve d'un changeling.

## Brouillon de page (anglais)

```md
---
title: Changeling
---

# Changeling

The Changeling is an antagonist who extracts and stores the DNA of other crew members, then takes their appearance. A changeling starts with a small pool of chemicals ("chems", 25 at the start, 75 at most) that refill over time, and spends them on its abilities.

## Objectives

Every changeling receives a "Get DNA" objective (extract the DNA of 5 people) and a second objective, plus an objective to escape on the shuttle.

## Abilities

| Ability | What it does | Cost |
|---|---|---|
| Absorb | Absorb a body for its DNA, memories and speech samples. | Free |
| Extract DNA Sting | Take a target's DNA with a sting. | 25 chems |
| Transform | Take the appearance of one of your stored DNA. | 5 chems |
| Regenerate | Heal your body from damage. | 10 chems |
| Reviving Stasis | Fake your death and recover. | 15 chems |
| Hallucination Sting | Extract DNA while injecting hallucinogens. | 5 chems, 1 EP |
| Augmented Eyesight | X-ray and night vision (slows chem regeneration). | 2 EP |

Absorbing someone lets you reset and re-pick your abilities in the Store. Evolution points (EP) are spent in the Store.

## How to spot one

A Medical Doctor who cannot draw any blood from a husk has confirmed a changeling.
```

## À vérifier

- À vérifier en jeu : la portée du Sting (le code dit seulement « Extracts body DNA ») ; la portée, les temps de recharge réels ; ce que font précisément « Store » (achat de pouvoirs avec les EP, d'après `CmdBuyAbility`) et le « reset ».
- À vérifier en jeu : le second objectif (tiré au hasard parmi quoi ?) et si l'objectif d'ADN suffit à gagner.
- À vérifier en jeu : le mode est-il jouable aujourd'hui (voir plus haut) ? Si non, on décrit l'antagoniste mais on ne parle pas de « mode ».
- À vérifier en jeu : les espèces autorisées (`allowedToChangeling`).
- Les chiffres (chems, EP, coûts) viennent des fichiers de données et peuvent bouger avec les versions.
- Aucune image proposée.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner avec une autre fiche (laquelle : ____)
- [ ] abandonner
