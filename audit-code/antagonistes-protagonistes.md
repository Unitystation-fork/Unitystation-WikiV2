# Audit antagonistes-protagonistes — wiki contre le code du jeu (develop, commit 31ad5f54, 2026-10-26)

Vérifié par une 2e relecture : 60 verdicts confirmés (45 FAUX/PÉRIMÉ/ABSENT marqués ✔ + 15 JUSTE contrôlés, dont 3 marqués « ✔ contrôlé »), 8 corrigés, 0 passé en À VÉRIFIER EN JEU. Six preuves ont aussi été rectifiées dans des verdicts confirmés : déclenchement de l'événement Blob, Replicating Foam, équipement du Nuclear Operative, mêlée du Death Squad, tirage du mode, équipement de l'Intern.
3e passe : 12 lignes À VÉRIFIER tranchées (A+B) sur 21, 9 restent : 5 en D (comportement en partie : Cargonia équipement dépendant des cartes, Rally Spores, devenir xéno par réapparition admin, reste du texte TG des xénos, vision nocturne du Death Squad) , 4 en C (règle de serveur / pas dans le code : conseils Fugitive, conseils Traître, hiérarchie Officier/capitaine, page Admin). Le code du jeu local (develop, commit 31ad5f54) a été lu : prefabs, ScriptableObjects, cartes `StreamingAssets/Maps`.
Vérif. 3e passe : 18 confirmés, 5 corrigés (Blood Brothers : PÉRIMÉ → FAUX ; Wizard : l'invocation de Rockdrop est dans le wiki, ABSENT → JUSTE ; xénos : ventilation tranchée, Hunter FAUX, ajout d'un FAUX ; Cargonia : comptes par carte rectifiés (combinaisons 4 à 8, casiers de mineur sur 3 cartes seulement), D maintenu ; ERT par console : FAUX maintenu mais preuve rectifiée, un admin peut faire réapparaître un joueur en métier spécial). Les 5 lignes D et les 4 C restantes sont confirmées.

Résumé (recompté ligne par ligne après la 2e relecture, tableaux par page, sans le tableau des modes) : 16 pages (8 antagonistes, 8 protagonistes ; les index de catégorie sont exclus). 22 FAUX (dont 1, le nom « Cargonia », couvert par la PR #382 et non recompté : 21 à traiter), 12 PÉRIMÉS, 14 ABSENTS, 20 À VÉRIFIER EN JEU (+ la page Admin), 65 JUSTE, 3 non jugés. S'y ajoutent les 10 lignes du tableau final des éléments absents du wiki. (Avant la 2e relecture : 20 FAUX, 13 PÉRIMÉS, 14 ABSENTS, 25 À VÉRIFIER EN JEU, 64 JUSTE ; l'ancien résumé annonçait « environ 24 / 9 / 17 / 22 ».)

Résumé après la 3e passe (même méthode de comptage, une étiquette par cellule de la colonne Verdict, « était À VÉRIFIER » exclu ; la 3e passe a ajouté 1 ligne, Debris Devourer) : 25 FAUX (dont 1, « Cargonia », couvert par la PR #382), 13 PÉRIMÉS, 18 ABSENTS, 8 À VÉRIFIER EN JEU (+ la page Admin), 80 JUSTE, 3 non jugés. Après la vérification de la 3e passe : 27 FAUX (dont 1 « Cargonia »), 12 PÉRIMÉS, 17 ABSENTS, 8 À VÉRIFIER EN JEU (+ la page Admin), 81 JUSTE, 3 non jugés (Blood Brothers PÉRIMÉ → FAUX ; Rockdrop ABSENT → JUSTE ; Hunter ventilation : FAUX ajouté). Avant, avec la même méthode : 22 FAUX, 12 PÉRIMÉS, 15 ABSENTS, 20 À VÉRIFIER EN JEU (+ la page Admin), 70 JUSTE.

Chemins du jeu : tous sous `UnityProject/Assets/` (Scripts sous `Scripts/US13/...`, assets sous `ScriptableObjects/...`).
Lecture des difficultés : `Occupation.cs` enum `OccupationDifficulty` = Zero 0, Low 1, Medium 2, High 3, Extreme 4 (relu par la 2e relecture).
Département : tous les métiers de ce groupe (antagonistes, CentCom, ERT, rôles fantômes) ont `jobCategory: 0` (« Other », par défaut ; `JobType.cs` enum `JobCategory`, Other = 0) ; aucun n'a de département Security/Medical/etc. Rien à signaler de ce côté.
Accès : listes `issuedClearance` décodées par la 2e relecture (entiers 32 bits petit-boutistes, enum `Clearance.cs`, 93 valeurs). L'accès « basse population » s'AJOUTE à l'accès normal (`IClearanceSource.GetCurrentClearance` : `IssuedClearance.Concat(LowPopIssuedClearance)`).

## Vue d'ensemble : modes de jeu (source : `ScriptableObjects/GameModes/*.asset`)

Rotation (`GameModeData.asset`, liste `rotation`, résolue par les `.meta`) : Rebellion (Cargonia.asset), NukeOps, MixedRound, Wizard, Vampires, Blob, BloodBrothers. Mode par défaut : MixedRound. Le serveur tire le mode parmi la rotation : avec la config livrée (`StreamingAssets/Config/gameConfig.json` : `"InitialGameMode": "AppleShuffle"`), `GameModeData.PickFromAppleShuffleGameMode()` mélange la rotation et prend le premier mode dont `IsPossible()` est vrai (nombre de joueurs suffisant) ; `ChooseGameMode()` (tirage au hasard simple) ne sert que pour « Random ». (Précision de la 2e relecture.)
Hors rotation : Traitor (mode pur), Changeling, Highlander, Extended (ajouté seulement si `allowExtended`, `false` dans la config), MapEditor. `GetGameMode(nom)` ne cherche que dans la rotation + Extended : le mode « Traitor » pur n'est donc pas sélectionnable ; des traîtres n'apparaissent que via MixedRound (`AntagonistDatas` : Traitor ratio 0,75 dès 1 joueur, Swapper et Vampire chacun 10 % de chance, dès 3 joueurs).

| Page wiki | gameModeName | minPlayers | antagRatio / min / max | En rotation | Preuve |
|---|---|---|---|---|---|
| Cargonia | Rebellion (antag `Rebel`) | 15 | 0,2 / 3 / 100, forceMinAntags 1 | OUI (1re entrée) | `GameModes/Cargonia.asset`, `Antagonists/Antags/Cargonian.asset` |
| Nuclear Operative | Nuclear Emergency | 8 | 0,1 / 1 / 100 | OUI | `GameModes/NukeOps.asset` |
| Traitor | Traitor | 1 | 0,2 / 1 / 100 | NON (seulement via MixedRound) | `GameModes/Traitor.asset`, `MixedRound.asset` |
| Wizard | Wizard | 3 | 0,1 / 1 / 10000 | OUI | `GameModes/Wizard.asset` |
| Blob | Blob | 5 | ratio 1 / 1 / 1 | OUI | `GameModes/Blob.asset` |
| BloodBrother | Blood Brothers | 6 | 0,2 / 2 / 4, hardNumber 2 | OUI | `GameModes/BloodBrothers.asset` |
| Fugitive | aucun (événement + rôle fantôme) | min 1 / max 3 joueurs fantômes | — | n/a | `Systems/GhostRoles/Antagonists/Fugitive.asset` |
| Xenomorph | aucun (rôles fantômes Alien*) | — | — | n/a | `Systems/GhostRoles/Alien/*.asset` |

---

## Cargonia (mode Rebellion) — `docs/3_HowToPlay/Jobs/Antagonist_roles/Cargonia.md` ↔ `GameModes/Cargonia.asset`, `Antagonists/Antags/Cargonian.asset`, `Scripts/US13/Systems/GameModes/Cargonia.cs`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Déclenchement | « The gamemode can currently only be triggered manually by an admin. » | `GameModeData.asset` rotation contient `fbbefa05…` = `Cargonia.asset.meta` (1re entrée). `minPlayers: 15`. Tirage automatique parmi les modes possibles (AppleShuffle avec la config livrée, voir plus haut). | FAUX ✔ |
| Nom du mode | « Cargonia is the current in-game name » | `gameModeName: Rebellion` ; `antagName: Rebel` | FAUX ✔ (PR #382 couvre déjà les titres : non recompté) |
| Département choisi | « A random department (excluding security and command) » | `Cargonia.cs` : `rnd.Next(5)` sur l'enum privé `Departments` = Engineering, Science, Medical, Service, Supply (chance égale, 1 sur 5). Les chefs de ces départements (CE, RD, CMO, QM) sont dans les listes de métiers rebelles ; Captain, HoP, HoS, Security non. | PÉRIMÉ ✔ (JUSTE pour security ; imprécis pour « command » : les chefs de département sont rebelles) |
| Département Cargo | « The eponymous rogue department » (Cargo toujours rebelle) | Cargo (`Supply`) n'est qu'1 des 5 départements possibles ; Engineering, Science, Medical, Service peuvent aussi se rebeller. | FAUX ✔ |
| Objectifs | « steal an item and escape on the shuttle with at least 50 % of the department alive » | Objectifs : `Cargo Men Survival` (« at least 50% of all rebels are alive by round end ») + objectif d'équipe `CaptureCapsHatTeam` (équipe `Cargo Rebelion Team.asset`). Pas d'objectif « s'échapper » (`needsEscapeObjective: 0`, `canUseSharedObjectives: 0`). | PÉRIMÉ ✔ (50 % : JUSTE ; « voler un objet » = le chapeau du capitaine ; pas d'objectif d'évasion) |
| Équipement Cargo (labo, hardsuits, expédition, PKA, achats) | liste | 3e passe : dépend des cartes et du contenu des casiers. Comptage des prefabs posés dans `StreamingAssets/Maps/MainStations/*.json` : `SuitStorageUnitMiningEVA` Box 4, Cave 6, Fall 3, Gate 2, Mini 3, Outpost 4, Pog 5, Square 4, Starship 4, UnReal 5 ; `SuitStorageUnitMiningLavaland` en plus : Fall 3, Gate 2, Mini 2, Outpost 3, Square 3, Starship 3, UnReal 3 (0 sur Box, Cave, Pog) ; `MinersEquipmentLocker` 2 à 5 selon la carte (Cave 0) ; `ProtoKineticAccelerator` posé directement : Cave 4, Mini 2, Starship 3 (les autres cartes les mettent dans les casiers) ; `DepartmentProtolatheCargo` seulement sur StarshipStation et UnRealStation, sinon `Autolathe` (2 à 4 par carte, place non vérifiée) ; `MiningEquipment` (distributeur) 1 par carte sauf Cave ; la navette d'expédition est une scène à part (`AdditionalScenes`), non lue | À VÉRIFIER EN JEU (comportement en partie) (3e passe : le code donne les nombres de combinaisons spatiales de mineur par carte, 4 à 9 selon la carte, mais « un labo propre à Cargo », la navette d'expédition et « acheter ce qu'on veut » (crédits de départ 1000) dépendent de la partie) (vérif. 3e passe : D maintenu, preuve corrigée. Combinaisons EVA + Lavaland par carte : Box 4, Cave 6, Fall 6, Gate 4, Mini 5, Outpost 7, Pog 5, Square 7, Starship 7, UnReal 8, donc 4 à 8, pas 4 à 9. `MinersEquipmentLocker` n'existe que sur Gate (2), Mini (3) et Starship (3), 0 sur les 7 autres cartes (pas « 2 à 5, Cave 0 ») ; les PKA ne sont donc pas « dans les casiers » sur les autres cartes, ils viennent du distributeur `MiningEquipment` ou des commandes. `Autolathe` : Box, Cave, Fall 2 ; Gate, Mini, Pog, Square, Starship 3 ; Outpost 4 ; UnReal 0. Crédits de départ : `CargoManager.cs` l. 155 `Credits = 1000` ✔) |
| Conseil « All Access du HoP, 50 % du temps » | blague | — | non jugé |

Correction proposée : "The gamemode is called Rebellion in game. It is part of the normal round rotation and starts with at least 15 players. A random department among Engineering, Science, Medical, Service and Supply rebels (its heads included). Objectives: keep at least 50% of the rebels alive and capture the captain's hat." Retirer la phrase « only triggered manually by an admin ».

## Blob — `…/Antagonist_roles/Blob.md` ↔ `Antagonists/Antags/Blob.asset`, `Scripts/US13/Systems/Antagonists/Antags/Blob/BlobPlayer.cs`, `Prefabs/Player/Resources/Blob.prefab`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Mode / apparition | (non dit) | Mode Blob en rotation, 5 joueurs mini, 1 blob ; aussi événement « Blob » (30 %, min 5 joueurs, `CanRandomlyTrigger: 1`) dans `InGameEventsManager.prefab` | ABSENT ✔ (corrigé : la règle `DoNotTriggerOnAMode` + `IfGameModeRequiredPop: 30` bloque l'événement en mode Blob quand il y a PLUS de 30 joueurs, pas moins de 31 : `EventStartGhostRole.CustomTriggerCriteria` renvoie faux si `!(30 >= joueurs)`. Le mode courant étant une copie `Instantiate`, la comparaison avec l'asset ne semble jamais vraie : à ne pas écrire dans le wiki) |
| Accès | « anywhere they can teleport to » | Occupation fantôme `735550ff…` ; pas d'accès ID ; 3e passe : `Antags/Blob.asset` `ghostRoleOccupation` = `Occupations/Assistant.asset` ; `BlobPlayer.cs` : l'overmind ne peut agir que sur ou à côté d'une tuile blob (`ValidateAction`), s'il s'en éloigne il est ramené au noyau (`TeleportPlayerBack`, ligne 309) | JUSTE (précisable) (3e passe : aucun accès ID ; le « teleport » du wiki = la caméra du blob est limitée à ses tuiles et leurs voisines) ✔ (vérif. 3e passe : `Blob.asset` `ghostRoleOccupation` `735550ff…` = `Assistant.asset` ; `BlobPlayer.cs` l. 309-313 : `ValidateAction` faux → `TeleportPlayerBack`) |
| Coût Build Strong / Reflective | 15 / 15 | `strongBlobCost: 15`, `reflectiveBlobCost: 15` (`Blob.prefab`) | JUSTE |
| Coût Build Node | 50 | `nodeBlobCost: 50` | JUSTE |
| Coût Build Factory | 50 | `factoryBlobCost: 60` (code ligne 64 ET `Blob.prefab` ligne 460, relu sur develop) | FAUX ✔ |
| Coût Build Resource | 40 | `resourceBlobCost: 40` | JUSTE |
| Coût Relocate Core | 80 | `moveCoreCost: 80` | JUSTE |
| Readapt / Reroll strain | 40 / 20 | `adaptStrainCost: 40`, `rerollStrainsCost: 20` | JUSTE |
| Masse critique | « 400 tiles » | `numOfTilesForVictory = 400` (tuiles hors espace) ; prefab 400 aussi | JUSTE |
| « 250 tiles = victoire probable » | conseil | — | non jugé |
| Rally Spores « doesn't as of 4116 » | note de version | 3e passe : `BlobPlayer.CmdRally` existe (`#region Rally`, ligne 2171) : toutes les spores du blob dans un rayon de 15 cases reçoivent `blobAI.SetTarget(worldPos)`, message « You command N of your underlings to move! » ; bouton `UI_Blob.RallySpores` | À VÉRIFIER EN JEU (comportement en partie) (3e passe : la note « doesn't as of 4116 » est une note de version ancienne ; le code implémente le ralliement, seul un essai dit s'il marche) ✔ (vérif. 3e passe : `CmdRally` l. 2174 : rayon 15, `SetTarget` sur les spores du même overmind ; D maintenu) |
| Souches (nombre) | 11 listées | 14 assets dans `Antagonists/BlobStrains/`, tous les 14 dans la liste `blobStrains` de `Blob.prefab` : manquent Blazing Oil, Cryogenic Poison, Energized Jelly | PÉRIMÉ / ABSENT (3) ✔ |
| Debris Devourer | 20 brute, 50 objets | `playerDamages 20 type 0`, objets 50 | JUSTE |
| Distributed Neurons | 5 brute + 15 toxin | 5 type 0 + 15 type 2 (Tox, `HealthEnums.cs`) | JUSTE |
| Electromagnetic Web | 5 brute + 25 **toxin**, 25 % faiblesse feu | 5 brute + 25 type 1 = **Burn** ; `customArmor: 1`, `Fire: -25` | FAUX ✔ (toxin → burn ; la faiblesse au feu de 25 % est juste) |
| Explosive Lattice | 20 brute ; bombe 100 %, feu +50 % | idem, `customArmor: 1`, `Bomb: 100`, `Fire: -50` | JUSTE |
| Networked Fibers | 20 brute + 15 **toxin** | 20 type 0 + 15 type 1 = **Burn** | FAUX ✔ |
| Pressurized Slime | 15 brute, 10 oxy, **15 stamina**, 50 % mêlée | 15 brute, 10 oxy, stamina `damageDone: 0` ; `customArmor: 1`, `Melee: 50` | FAUX ✔ (stamina 0, pas 15) |
| Reactive Spines | 5 dégâts, 25 % partout | 5 ; `Melee..Bio: 25` | JUSTE |
| Regenerative Materia | 5 brute + 17 toxin | idem | JUSTE |
| Replicating Foam | 22 brute ; « 50 % resistance to melee » | 22 ; l'asset porte `Melee: -50` mais `customArmor: 0`, donc cette armure n'est **jamais appliquée** (`BlobPlayer.SetStrainData` ne remplace l'armure que si `customArmor` est vrai) : la souche garde l'armure normale du blob | FAUX ✔ (corrigé : ni résistance ni faiblesse en mêlée, « no extra armour ») |
| Shifting Fragments | 22 | 22 | JUSTE |
| Synchronous Mesh | 17 ; « 50 % bombes, 25 % feu » de résistance | 17 ; `customArmor: 1`, `Bomb: -25`, `Fire: -25`. Une valeur négative est une faiblesse : `Armor.GetRating` garde le négatif, dégâts × (1 − (−25)/100) = × 1,25 | FAUX ✔ (25 % de dégâts en plus par bombe et par feu) |
| Description des effets (éclairs EMP « nonfunctional », zombies) | notes | 3e passe : `BlobPlayer.OnDamageReceived` (ligne 1752) ne traite que ReactiveSpines, BlazingOil, PressurizedSlime, ReplicatingFoam, ShiftingFragments et SynchronousMesh ; aucun code (`grep` dans `Scripts`) ne référence `ElectromagneticWeb`, `DistributedNeurons`, `DebrisDevourer`, `ExplosiveLattice`, `EnergizedJelly` ni `CryogenicPoison` hors de l'enum `StrainTypes` ; aucune gestion de zombie blob | JUSTE (3e passe : éclairs EMP et zombies « nonfunctional » : aucun effet codé) ✔ (vérif. 3e passe : `OnDamageReceived` ne traite que 6 souches ; les 6 noms cités n'apparaissent hors enum que pour NetworkedFibers/RegenerativeMateria, pas pour ces souches ; aucun code de zombie blob) |
| Debris Devourer : « lance des objets sur les attaquants » | notes | 3e passe : même preuve, aucun code pour `DebrisDevourer` (seuls les dégâts de l'asset) | FAUX ✔ (3e passe : capacité non implémentée) ✔ (vérif. 3e passe : `BlobStrains/Debris Devourer.asset` décrit « throw debris at attacking beings » mais aucun code ne lit `StrainTypes.DebrisDevourer`) |

Correction proposée : fix Factory cost to 60; Electromagnetic Web and Networked Fibers deal burn (not toxin); Pressurized Slime deals no stamina damage; Replicating Foam has no extra armour (remove "50% resistance to melee"); Synchronous Mesh takes 25% more damage from bombs and fire (weakness, not resistance); add Blazing Oil, Cryogenic Poison, Energized Jelly.

## Blood Brothers — `…/BloodBrother.md` ↔ `Antagonists/Antags/BloodBrother.asset`, `BloodBrothers/BloodBrother.cs`, `Objectives/BloodBrotherMainObjective.cs`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Deux frères | « two players are spawned » | `hardNumberOfAntagsToSpawn: 2`, `minAntags 2`, `maxAntags 4`, `teamGameMode 1` | JUSTE |
| Moins de TC | « much less TC » | `initialTC: 8` (Traitor 20, Nukie 25) | JUSTE |
| Lore : santé + sort ou paranoïa | idem | `extraHealthForBrothers: 550`, capacités ImmuneToAllExplosions/Heat/Stuns, StartParanoid, StartWithBlinding (« Blinding Light », cooldown 225), StartWithRandomSpell | JUSTE (et bien plus riche : immunités, lumière aveuglante) |
| Objectif 70 % | « at least 70 % of their objectives » | `BloodBrothers…Main… return ratio > 0.7f` (strictement supérieur à 70 %) | JUSTE (quasi : « more than 70 % ») |
| Si un frère meurt, l'autre aussi | idem | `OnBrotherDeath` appelle `playerHealth.Death(false)` sur l'autre | JUSTE |
| « Objectives about the same as Traitors » | idem | 5 objectifs partagés possibles + objectif principal + « Not Cuffed » ; chance gimmick 50 % ; pas d'objectif d'évasion obligatoire ; Glorious Death blacklisté ; 3e passe : `Antags/Traitor.asset` : `numberOfObjectives: 2`, `needsEscapeObjective: 1`, `chanceForGimmickObjective: 5` ; `Antags/BloodBrother.asset` : `numberOfObjectives: 5`, `needsEscapeObjective: 0`, `chanceForGimmickObjective: 50`, 2 objectifs `AlwaysStartWith`, 1 blacklisté ; les deux ont `canUseSharedObjectives: 1` | FAUX ✔ (vérif. 3e passe : corrigé de PÉRIMÉ en FAUX, aucune preuve que l'égalité ait existé avant. Valeurs relues : Traitor 2 objectifs + évasion, gimmick 5 % ; BloodBrother 5 + 2 `AlwaysStartWithObjectives`, sans évasion, gimmick 50 %, 1 blacklisté ; `AntagData.GenerateObjectives` ajoute les objectifs fixes après les 5 tirés) |
| Mode | (non dit) | En rotation (`603078f3…`), `minPlayers: 6` | ABSENT ✔ (info) |

Correction proposée : optionnelle ; ajouter "the brothers get 550 extra health, immunity to explosions, heat and stuns, and a Blinding Light ability".

## Fugitive — `…/Fugitive.md` ↔ `Occupations/Antag/Fugitive.asset`, `Antagonists/Antags/Fugitive.asset`, `Fugitive.cs`, `GhostRoles/Antagonists/Fugitive.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Fugitive | `antagName: Fugitive` (`displayName` de l'occupation vide) | JUSTE |
| Difficulté | « Frustratingly hard » | `difficulty: 4` (Extreme) | JUSTE |
| Accès | aucun | `issuedClearance: []` (relu) | JUSTE |
| Objectifs | rester hors des menottes et être sur la navette | coreObjective = `Not Cuffed` ; `needsEscapeObjective: 1` | JUSTE |
| Alerte station | « A few minutes after the beginning » | `timeToSendWarning: {x: 5, y: 15}` minutes (aléatoire), rapport de commandement | JUSTE (précis : 5 à 15 min) |
| Équipement | caisse à outils mécanique, câbles, gants isolants « budget » | `FugitivePopulator` : BlackShoes, PrisonersJumpsuit, MechanicalToolbox, 2 MediumCableCoil, BudgetInsulatedGloves | JUSTE |
| Comment on devient fugitif | (non dit) | Événement « Fugitives » 30 %, min 1 joueur, `CanRandomlyTrigger: 1` (`InGameEventsManager.prefab`) ; rôle fantôme min 1 / max 3 (`GhostRoles/Antagonists/Fugitive.asset`), `limit: 2` côté métier | ABSENT ✔ (info) |
| Conseils (nourriture, souris…) | tactique | — | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : conseils de jeu) ✔ (vérif. 3e passe : conseils de jeu, C maintenu) |

## Nuclear Operative — `…/Nuclear-Operative.md` ↔ `Occupations/Antag/Syndicate Operative.asset`, `Antagonists/Antags/NuclearOperative.asset`, `GameModes/NukeOps.asset`, `Objects/Consoles/SyndicateOpConsole.cs`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Nuclear Operative | antag `Nuclear Operative` ; métier `Syndicate Operative` (limit 10) ; mode « Nuclear Emergency » | JUSTE (le métier s'appelle Syndicate Operative) |
| TC de départ | 25 | `initialTC: 25` | JUSTE |
| Code d'uplink | « Kilo-350 », sensible à la casse, à saisir dans la sonnerie | `Uplink.GenerateUplinkUnlockCode` : mot OTAN + `-` + nombre 111 à 998 (`UplinkPasswordList.asset` : « Kilo- »…) | JUSTE |
| Déclaration de guerre | 280 TC sur 20 min | `SyndicateOpConsole.cs` : `tcToGive 280`, `TcIncrement 14` toutes les 60, `timer 1200` ; niveau d'alerte rouge | JUSTE (14 TC par minute, 20 minutes) |
| Équipement de base | uniforme, lunettes de vision nocturne, casque, masque syndicate, hardsuit rouge, **magboots rouges ou jackboots**, casque radio, gants, bouteille d'oxygène, **Stalker SMG**, PDA, **pistolet Stechkin** | `SyndicateOperativePopulator` : radio Syndicate, CombatGloves, SyndicateHardsuit + casque, **CombatBoots**, SyndicateTacticalTurtleneck, SyndicateDuffelBag, NightVisionGoggles, ChestRig, **MakarovPistol** (rangement de combinaison), IDCardAgent, PDASyndicate. Le sac (`SyndicateDuffelBag.prefab` → `SyndicateBackpackPopulator`) contient une `SyndicateSurvivalBox` (= `SyndicateMask`, `EmergencyOxygenTankExtendedCapacity`, `EpinephrineMedipen`) et un `NuclearDiskPinpointer`. Le Stalker SMG et les `MagBootsSyndicate` ne sont pas sur l'opérateur : ils sont dans les casiers `SyndicateArmoryCloset` (liste `SpawnableLists/Closets/Syndicate.asset`) placés sur les 4 cartes de base Syndicate (`SyndicateOutpost`, `Ministation Syndicate`, `Fallstation Syndicate`, `CaveStationSyndicate`) ; Stalker aussi à l'uplink (10 TC). Aucun Stechkin donné ni placé. | FAUX ✔ (précisé par la 2e relecture : pistolet = Makarov, bottes = Combat Boots ; masque et bouteille JUSTE, dans la boîte de survie du sac ; Stalker et magboots dans l'armurerie de la base, pas sur soi) |
| Balise du disque | « nuke disk pinpointers » ; « the pinpointer in your pack » | `NuclearDiskPinpointer` dans `SyndicateBackpackPopulator` (sac de départ) | JUSTE (corrigé : était À VÉRIFIER EN JEU ; preuve `SyndicateDuffelBag.prefab` `itemStoragePopulator` = `cab7233c…` = `SyndicateBackpackPopulator.asset`) |
| Mode | (non dit) | En rotation, 8 joueurs mini, 1 opérateur par tranche de 10 joueurs | ABSENT ✔ (info) |
| Objectifs | disque + code + bombe | `NuclearOperative.asset` : coreObjective `Survive` ; équipe `TriggerNukeTeam` ; `NukeCodeObjective` ; 3e passe : `Teams/Nuclear Operative Team.asset` coreObjective = `TeamObjectives/TriggerNukeTeam.asset` (« Trigger the nuke », « Destroy the station with a nuclear device ») : `TriggerNukeTeam.cs` envoie le code `AntagManager.SyndiNukeCode` dans le canal Syndicate et se valide quand `Nuke.Detonated` ; `Nuke.cs` ligne 139 : il faut un objet avec le trait `NukeDisk` pour l'armer ; objectif personnel `Survive` | JUSTE (3e passe : disque, code et bombe sont bien l'objectif ; l'opérateur doit aussi survivre) ✔ (vérif. 3e passe : `Nuclear Operative Team.asset` coreObjectives = `ba4e5d4d…` = `TriggerNukeTeam.asset` ; `TriggerNukeTeam.cs` l. 16-26 ; `Nuke.cs` l. 139 trait `NukeDisk`) |

Correction proposée : replace "stetchkin pistol" by "Makarov pistol" and "magboots or jackboots" by "combat boots"; say that the mask and oxygen tank are in the survival box in your bag, and that the Stalker SMG and red magboots are in the armory lockers of the Syndicate base.

## Traitor — `…/Traitor.md` ↔ `Antagonists/Antags/Traitor.asset`, `GameModes/Traitor.asset`, `MixedRound.asset`, `Systems/Antagonists/AntagData.cs`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Accès | celui du métier | `Traitor.asset` : pas d'occupation propre ; garde son métier | JUSTE |
| « one of the three types of Antagonist … Nuke Ops and Cargonia » | 3 antagonistes | `AntagData.asset` : 10 antagonistes (Rebel, NukeOp, Traitor, Fugitive, Wizard, Blob, Highlander, BloodBrother, Changeling, Vampire) + Swapper/Survivor/Welder | PÉRIMÉ ✔ |
| Nombre d'objectifs | « 3 objectives: steal, assassinate, survive » | `numberOfObjectives: 2`, `coreObjectives: []`, `canUseSharedObjectives: 1` : 2 tirés dans `Steal`, `Assassinate`, `Maroon`, `HungryCrew` (`AntagData.GenerateObjectives`) + 1 objectif d'évasion tiré au hasard (`needsEscapeObjective: 1` : Survive, Escape, GloriousDeath, Hijack, Not Cuffed, 3 variantes « Prevent… Escaping ») + 5 % de chance d'un objectif gimmick (`chanceForGimmickObjective: 5` : BetterClown, RemoveLights, RemovePlants, SabotageSecurity, StealBack, WeaponsTrade) | FAUX ✔ (2 + 1 tirés au hasard, types variables ; pas toujours « voler + tuer + survivre ») |
| TC | 20 | `initialTC: 20` | JUSTE |
| Code (lettre OTAN + 3 chiffres) | idem | « Mot OTAN- » + 3 chiffres | JUSTE |
| Gagner des TC en tuant un autre traître | « functionally improbable » | 3e passe : aucun gain de TC lié à un meurtre dans `Scripts` ; les TC ne viennent que de `Uplink.UplinkTC` (solde de l'uplink), de télécristaux (`PDALogic` : un télécristal pressé dans un PDA déverrouillé s'ajoute au solde) et de la `SyndicateTelecrystalStation` ; `UplinkCategoryList.asset` vend aussi des « Raw Telecrystal » (1, 5, 10, 20) | JUSTE (3e passe : pas de récompense de meurtre ; le butin est le solde de l'uplink de la victime, s'il est déverrouillé). Les télécristaux achetables sont ABSENTS du wiki ✔ (vérif. 3e passe : seuls ajouts au solde : `PDALogic.cs` l. 395 (télécristaux) et `SyndicateTelecrystalStation.cs` l. 44 ; `Uplink.cs` l. 71 installation ; « Raw Telecrystal » 1/5/10/20 dans `UplinkCategoryList.asset` l. 799-824) |
| Mode | (non dit) | Pas de mode « Traitor » en rotation (`a07c32cf…` absent de la liste) ; apparaît via MixedRound (Traitor ratio 0,75) | ABSENT ✔ (info) |
| Conseils (viser, pistolets verrouillés, caméras, IA) | tactique | — | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : conseils de jeu) ✔ (vérif. 3e passe : conseils de jeu, C maintenu) |

Correction proposée : "Traitors usually get 2 random objectives (for example steal an item, assassinate someone) plus one escape objective, and sometimes a gimmick objective." and replace the "three types of antagonist" sentence by a link to the antagonist list.

## Wizard — `…/Wizard.md` ↔ `Occupations/Antag/Wizard.asset`, `Antagonists/Antags/Wizard.asset`, `Items/SpellBook/**`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Wizard | `displayName: Wizard`, limit 1, difficulté High (3) | JUSTE |
| Accès | « anywhere they can teleport to » | `issuedClearance: []` (aucun accès) | JUSTE (en pratique) |
| Objectifs | « typically 4 » | `numberOfObjectives: 3` (Assassinate, Steal, Maroon) + 1 évasion (`needsEscapeObjective: 1`) | JUSTE |
| Nom modifiable au miroir | idem | `assignRandomNameOnSpawn: 1` (nom aléatoire au départ) ; 3e passe : `Objects/Other/MagicMirror.cs` : « Allows the wizard to change their name and prints out a new identity paper » (`SetPlayerName` : au moins 3 caractères, `SetPermanentName`) ; `UI/Objects/Common/GUI_MagicMirror.cs` propose aussi un nom aléatoire ; prefab `Objects/Wallmounts/MagicMirror.prefab` posé dans `AdditionalScenes/Wizard/WizardShip.json` et `WizardAsteroid.json` | JUSTE (3e passe : le Wizard change son nom au miroir magique) ✔ (vérif. 3e passe : `MagicMirror.cs` l. 15, 40 (au moins 3 caractères), 54 `SetPermanentName` ; présent dans `WizardShip.json` et `WizardAsteroid.json`) |
| Coûts : Fireball 2 ; Lesser Summon Guns 3 ; Lightning Bolt 1 ; Spell Blade 2 ; Forcewall 1 ; Rockdrop 1 ; Mastercrafted Armor 2 ; Stunning Bolt 2 ; Teleport 2 ; Blink 2 ; Instant Summons 1 ; Contract of Apprenticeship 2 ; Summon Guns 2 ; Summon Magic 2 | idem | `cost:` des assets `Items/SpellBook/Spells|Artifacts|Rituals` : identiques pour les 14 | JUSTE |
| Cris d'invocation (ONI'SOMA, P'WAH…) | idem | `invocationMessage` Fireball « ONI'SOMA! », Lightning « P'WAH, UNLIM'TED P'WAH! » (« UNLIMITED » dans le wiki) | JUSTE |
| Temps de recharge | 6 s, 10 s, 75 s, 45 s… | 3e passe : `ScriptableObjects/Spells/Wizard/*.asset` `cooldownTime` : Fireball 6, Lesser Summon Guns 75, Lightning Bolt 10, Forcewall 10, Rockdrop 45, Stunning Bolt 1.5, Teleport 60, Blink 2, Instant Summons 10 : identiques aux 9 temps du wiki. Invocations identiques (ONI'SOMA, TARCOL MINTI ZHER, SCYAR NILA, GAR YOK, LIGHTNINGBOLT) ; Rockdrop : « BALDERDASH! » absente du wiki. Sorts absents du wiki : Charge 60, Disable Technology 40, Knock 10, Magic Missile 20, The Traps 25 | JUSTE ✔ (vérif. 3e passe : 9 temps de recharge sur 9 relus dans `Spells/Wizard/*.asset`). Invocation de Rockdrop : JUSTE, corrigé (la 3e passe la disait absente, mais la ligne Rockdrop du wiki a bien « BALDERDASH! » dans sa colonne Invocation). Sorts absents du wiki (Charge 60, Disable Technology 40, Knock 10, Magic Missile 20, The Traps 25) : déjà dans le tableau ABSENTS, ils ont tous une entrée `Items/SpellBook/Spells/*.asset` |
| Sorts du livre absents du wiki | — | Charge (1), Disable Technology (1), Knock (1), Magic Missile (2), The Traps (1), Mind Swap (2), Staff of Healing (1), Scrying Orb (2), Staff of Door Creation (1), Summon Events (2) ; tous référencés par `SpellBookData.asset` | ABSENT (10) ✔ |
| Mode | (non dit) | En rotation, 3 joueurs mini ; aussi événements « Ragin' Mages » (5 %, 20 joueurs mini) et « Wizard - Summon Guns/Magic » (0 %, admin) | ABSENT ✔ (info) |
| Wizard Apprentice | (non dit) | `Occupations/Antag/WizardApprentice.asset`, limit 1 ; rôle fantôme `GhostRoles/Antagonists/WizardApprentice.asset` | ABSENT ✔ |

## Xenomorph — `…/Xenomorph.md` ↔ `Antagonists/Alien/*.asset`, `Occupations/Aliens/*.asset`, `Scripts/US13/Systems/Antagonists/AlienPlayer.cs`
La page est un brouillon (liste en anglais approximatif) puis un copier-coller du wiki TG (« From TG wiki »). Le texte TG décrit un jeu différent ; ci-dessous seulement ce que le code tranche.
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| « not a true antagonist » | idem | Pas d'`Antag` pour les xénos dans `Antags/` (absent d'`AntagData.asset`) ; rôles fantômes `Alien*` | JUSTE |
| Comment devenir xéno | infecté par un facehugger ; réapparition admin | rôles fantômes `AlienLarva/Drone/Hunter/Sentinel/Praetorian/Queen` (`GhostRoles/Alien/`, `canBeAddedByAdmin: 0`) ; infection `XenomorphLarvae.cs`/`FacehuggerImpregnation.cs` ; 3e passe : `Items/Implants/Xenomorphs/XenomorphLarvae.cs` : à l'éclosion, le compte de l'hôte infecté est transféré dans la larve (`TransferAccountToSpawnedMind`) ; `Scripts/US13/ScriptableObjects/GhostRoleData.cs` + `GhostRoleAdminPage.cs` ligne 145 : la page admin des rôles fantômes n'affiche que les rôles `CanBeAddedByAdmin` ; les 6 rôles Alien l'ont à 0 | JUSTE (infection par un facehugger : le joueur infecté devient la larve) / À VÉRIFIER EN JEU (comportement en partie : « réapparu par un admin » ne passe pas par la page des rôles fantômes admin, un autre outil admin n'est pas lu) (3e passe) ✔ (vérif. 3e passe : `XenomorphLarvae.cs` l. 109 `TransferAccountToSpawnedMind` ; `GhostRoleAdminPage.cs` l. 145 `CanBeAddedByAdmin` ; les 6 rôles Alien à 0. Il existe aussi une réapparition admin « Antag » (`RequestRespawnPlayer` → `ServerRespawnPlayerAntag`, liste `SOAdminJobsList`) dont l'asset est absent de la copie locale : D maintenu) |
| Types listés | queen, praetorian, sentinel, hunter, drone, « lavea », « hacehugger » | Types joueurs : Larva1/2/3, Hunter, Sentinel, Praetorian, Drone, Queen (`AlienTypes`). Facehugger = PNJ (`FaceHuggerAI.cs`), pas un rôle joueur. | JUSTE (nom « Larva », 3 stades) |
| Évolutions (texte TG) | Larve → hunter / sentinel / drone ; Drone → Praetorian seulement ; Praetorian → Queen | `EvolvedFrom` (drapeaux, `AlienTypes` : Larva3 = 4, Praetorian = 32, Drone = 64) : Hunter/Sentinel/Drone ← 4 ; Praetorian ← 64 ; **Queen ← 96 = Praetorian OU Drone** (test `HasFlag`, `AlienPlayer.cs` l. 579) ; refus s'il y a déjà une reine (`queenInHive`) | FAUX ✔ pour « Drone seulement vers Praetorian » (un Drone peut devenir Queen) |
| Plasma (texte TG) | Sentinel stocke plus que Hunter | `MaxPlasma` : Hunter 150, Sentinel 250, Drone/Praetorian/Queen 500, Larva 100 | JUSTE |
| Crachat neurotoxine / acide | existent | `NeurotoxinSpitCost` Hunter/Sentinel 10, autres 50 ; `AcidSpitCost` 5 / 10 | JUSTE (existence) |
| Reste du texte TG (ventilation, vision à travers les murs, reine immobile, chirurgie, tail swing…) | — | non tranchable par les assets ; 3e passe : `AlienPlayer.cs` : message de départ « Use :a to communicate with the hivemind », plasma de base `MinimumPlasmaRegen` hors des herbes et gain complet sur les herbes (`onWeeds`), herbes 50 plasma (`WeedPlasmaCost`), une seule reine (`queenInHive`) ; `PlayerScript.cs` ligne 180 : `canVentCrawl` existe ; vision à travers les murs, invisibilité du Sentinel, ouverture forcée des portes, queue : non retrouvés dans `AlienPlayer.cs` | À VÉRIFIER EN JEU (comportement en partie) (3e passe : hivemind `:a`, herbes et reine unique confirmés dans le code ; le reste du texte TG n'est pas retrouvé dans le code) (vérif. 3e passe : D maintenu, avec un point tranché : ventilation. `canVentCrawl` vaut 1 dans `New Alien Larvae.prefab` (la larve, référencée par `Occupations/Aliens/AlienLarva.asset`) et 0 dans AlienDrone, AlienHunter, AlienSentinel, AlienPraetorian et AlienQueen ; aucun autre code de ventilation dans `AlienPlayer.cs`. « Hunters … ventcrawling through the station » : FAUX ✔ (seule la larve passe par les conduits) ; la larve qui se cache dans les conduits : JUSTE) |
| Page hors format | bloc « From TG wiki » avec syntaxe MediaWiki (`[[File:…]]`, `{{Rightclick}}`) | — | PÉRIMÉ ✔ (contenu non adapté au jeu) |

## Centcom Intern — `…/Centcom_roles/Centcom-Intern.md` ↔ `Occupations/Centcom/Centcom Intern.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Centcom Intern | `displayName: Centcom Intern` | JUSTE |
| Accès | « Public » | `issuedClearance` décodé : 60 accès (quasi tout, y compris Captain, Armory, Heads, Vault, Hop, Hos…) + CentGeneral, la même liste que l'Officer ; curieusement sans `BasicPublicAccess` ni `Pharmacy` | FAUX ✔ |
| Difficulté | « Extreme » | `difficulty: 1` (Low) | FAUX ✔ |
| Département | — | `jobCategory` Other | — |
| Équipement | sections vides | `CentcomInternPopulator` : `CentComHeadInternBeancap`, LaceupShoes, CentComInternsJumpsuit, RadioHeadsetCentCom, CircleGlasses, matraque télescopique (`x_Telescopic`), menottes, mallette, **Badmin Brew**, sacoche en cuir, gants noirs, ID CentCom | ABSENT ✔ (liste complétée par la 2e relecture : casquette, Badmin Brew) |
| Non roundstart / événements admin | idem | `limit: -1`, pas dans les modes ; 3e passe : `Managers/JobAllocator.cs` ligne 93 : `slotsLeft = Limit - filledSlots` ; avec `limit: -1`, `slotsLeft < 1` : le métier n'est jamais attribué au début de manche ; `Occupations/AllowedOccupationsSingleton.asset` ne contient pas le GUID `2b58a814…` du Centcom Intern | JUSTE (3e passe : ni attribué au début de manche, ni dans la liste des métiers choisissables ; le wiki dit « accessible par événement admin », ce que `limit: -1` (illimité) permet) ✔ (vérif. 3e passe : `JobAllocator.cs` l. 93 ; GUID `2b58a814…` absent de `AllowedOccupationsSingleton.asset` ; `GameManager.GetRandomFreeOccupation` traite `Limit == -1` comme illimité) |

## Central Command Officer — `…/Central-Command-Officer.md` ↔ `Occupations/Centcom/Centcom Officer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | « Central Command Officer » | `displayName: Centcom Officer` | PÉRIMÉ ✔ (nom en jeu : Centcom Officer) |
| Accès | « Everything » | 60 accès décodés (CentGeneral, pas les autres Cent*) | JUSTE (presque tout) |
| Difficulté | Extreme | `difficulty: 4` | JUSTE |
| Revolver « Mateba, comme les .357 » | « A Mateba revolver which acts identically to the .357 revolvers » | `CentcomOfficialPopulator` : aucun revolver ; armes = `Punisher44Mag` (« Punisher .44 Mag pistol », un pistolet) en poche et `TaserHybridV43` en poche, ceinture de sécurité pleine. Le revolver .357 du jeu (`P357AutoMag`) est donné au Death Squad, pas à l'officier. | FAUX (corrigé : était À VÉRIFIER EN JEU ; l'officier a un pistolet Punisher .44 Mag et un taser, pas de revolver) |
| « Badmin Brew » | idem | `BadminBrew` dans `CentcomOfficialPopulator` (rangement de combinaison, slot 18) | JUSTE (corrigé : était À VÉRIFIER EN JEU, « non trouvé ») |
| Vêtements = « tenue du capitaine retexturée » | idem | `CentComOfficersJumpsuit`, `CentComBeret`, Sunglasses, LaceupShoes ; 3e passe : `Prefabs/Items/Clothing/Uniforms/CentComOfficersJumpsuit.prefab` et `CaptainsJumpsuit.prefab` sont deux variantes du même `Uniform.prefab`, sans autre surcharge que le nom | JUSTE (3e passe : mêmes valeurs que la combinaison du capitaine ; seul l'aspect change) ✔ (vérif. 3e passe : les deux sont des variantes de `Uniform.prefab` (`de234d79…`) ; seules différences : nom, description, sprites, et `exportCost: 711` pour celle du capitaine) |
| Au-dessus du capitaine | rôle | hiérarchie non codée | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : hiérarchie) ✔ (vérif. 3e passe : chaîne de commandement non codée, C maintenu) |
| Centcom Commander | (non dit) | `Centcom Commander.asset` (`displayName: CentCom Commander`, difficulté 4) : 67 accès (dont CentCaptain, CentSpecops…), jumpsuit commandant, `CentComCarapace`, Punisher44Mag, taser, cache-œil, Badmin Brew | ABSENT ✔ |

## Death Squad — `…/Death-Squad.md` ↔ `Occupations/Centcom/Deathsquad.asset`, `DeathSquadOperativePopulator.asset`, `GhostRoles/Antagonists/DeathSquad.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Death Squad | `displayName: Death Squad` | JUSTE |
| Accès | « Everything » | 61 accès décodés dont CentSpecops ; accès bas pop (ajouté) : CentBar/Living/Medical/Storage/Teleporter/Thunder | JUSTE |
| Difficulté | « Stupid Easy-Extreme » | `difficulty: 2` (Medium) | FAUX (corrigé : était À VÉRIFIER EN JEU ; c'est une valeur de données, comme pour les autres fiches : le jeu affiche Medium) |
| Arme | « Mateba revolver » | `P357AutoMag` (`initialName: P357 AutoMag`, « A retro high-powered autorevolver … Uses .357 ammo ») | PÉRIMÉ ✔ (nom en jeu : P357 AutoMag) |
| Disruptor cannon | « 50 burn damage per shot » | 3e passe : `Guns/Energy/EnergyRifles/DisruptorCannon.prefab` : 3 modes de tir `firemodeProjectiles` = `Bullet_Pulse` (dégâts `Bullet_PulseLaserShot.asset` : damage 50, damageType 1 = Burn, attackType 2 = Laser, armorPenetration 20 ; 100 contre les tuiles), `Bullet_Laser` (damage 20, Burn) et `Bullet_Electrode` (taser) | JUSTE (3e passe : 50 de brûlure par tir au mode impulsion, le 1er mode ; les modes laser (20) et électrode sont ABSENTS ✔) ✔ (vérif. 3e passe : `firemodeProjectiles` data[0] = `Bullet_Pulse` (→ `Bullet_PulseLaserShot.asset` damage 50, damageType 1 = Burn d'après `HealthEnums.cs`), data[1] = `Bullet_Laser` (20, Burn) ; donné par `DeathSquadOperativePopulator`) |
| Casque/armure SWAT MK3, magboots | idem | `MKIIISWATHelmet`, `MKIIISWATSuit`, `MagBootsSWAT` | JUSTE |
| Résistance balles 80 % | idem | `MKIIISWATSuit.prefab` et `MKIIISWATHelmet.prefab` : `Bullet: 80` | JUSTE |
| Résistance mêlée 90 % (« including the underclothes ») | idem | `Melee: 80` (combinaison et casque) ; le sous-vêtement `HeadOfSecuritysTurtleneck` hérite de `HeadOfSecuritysJumpsuit` `Melee: 10` ; les armures se multiplient (`Armor.GetTotalDamage`) : 1 − 0,2 × 0,9 = 82 % | FAUX ✔ (80 %, environ 82 % avec le sous-vêtement) |
| Résistance bombe 100 %, « zéro dégât » | idem | `Bomb: 90` (6 parties de la combinaison, casque 90) | FAUX ✔ (90) |
| Énergie 50 % | idem | `Laser: 50`, `Energy: 60`, `StunImmunity: 1` | PÉRIMÉ ✔ (laser 50, énergie 60 ; immunité au stun) |
| Disque / pinpointer | « disk tracker » | `NuclearDiskPinpointer` dans le populateur | JUSTE |
| Vision nocturne « ne marche pas » | idem | `NightVisionSecHud` équipé ; bug non vérifiable ; 3e passe : `NightVisionSecHud.prefab` est une variante de `NightVisionGoggles.prefab` (`Clothing/Eyewear/NightVisionGoggles.cs`, caméra `NightVisionCamera.cs`) | À VÉRIFIER EN JEU (comportement en partie) (3e passe : le code de vision nocturne existe et est le même que celui des lunettes ordinaires ; seul un essai dit si le bug existe) ✔ (vérif. 3e passe : `NightVisionSecHud.prefab` a pour source `NVGs/NightVisionGoggles.prefab` ; scripts `Scripts/US13/Clothing/Eyewear/NightVisionGoggles.cs` et `Core/Camera/NightVisionCamera.cs` ; D maintenu) |
| « Pas de bombe fournie » | idem | non dans le populateur | JUSTE |
| Rôle événementiel | idem | rôle fantôme `DeathSquad` min 2 / max 4 ; `canBeAddedByAdmin` par défaut | JUSTE (admin) |

## Emergency Response Team — `…/Emergency-Response-Team.md` ↔ `Occupations/ERT/*.asset`, `Inventory/Populators/ERT*BackpackPopulator.asset`
Tous les ERT : `difficulty: 4` (Extreme), accès 60 (quasi tout + CentGeneral), Commander 67 (+CentCaptain etc.). Les ERT Commander, Security et Clown portent aussi une `SecurityBeltFull` (`SecurityBeltFullPopulator` : Pepperspray, Handcuffs, FlashbangGrenade, Seclite, matraque `x_Stun`, FlashHandheld).
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Difficulté / accès | Extreme / Everything | `difficulty: 4` / 60 accès | JUSTE |
| Types | Commander, Security, Medical, Engineers, Janitor, Clown + « PRT » inquisitor et knight | Assets (7) : ERT Commander, Security, Medic, Engineer, Chaplain, Janitor, Clown. L'« ERT Chaplain » porte `InquisitorsHardsuit`. Aucun « Knight ». | PÉRIMÉ ✔ (pas de Knight ; l'Inquisiteur s'appelle ERT Chaplain ; pas d'équipe « Paranormal ») |
| Commander : « carbine, 2 batons, handcuffs » | idem | sac : boîte de survie, matraque `x_Stun`, `EnergyCarbine`, `InteliCard` ; ceinture `SecurityBeltFull` : 2e matraque + menottes | JUSTE (corrigé : était FAUX « 1 matraque » ; la ceinture n'avait pas été ouverte) |
| Security : carbine tactique, baton, taser, 2 paires de menottes | idem | sac : `EnergyCarbineTactical`, `x_Stun`, `TaserHybridV43`, `Handcuffs` ; ceinture : 2e paire de menottes | JUSTE ✔ contrôlé (2 paires : sac + ceinture) |
| Medic : trousse + medibelt | idem | ceinture `Combat` (medibelt de combat), `CombatMedicalKit` en main ; sac : `AdvancedMedicalKit`, `Hypospray`, atropine, pentetic, carabine énergétique ; `MedicalHUD` | JUSTE (corrigé : était PÉRIMÉ ; ce que dit le wiki est vrai, seulement incomplet) |
| Engineer : outils, soudeuse industrielle, trousse | idem | `ToolbeltFullEngineering` (= Screwdriver, Wrench, **IndustrialWeldingTool**, PocketCrowbar, Wirecutter, Multitool, câble), `JawsOfLife`, lunettes scanner, 3 `WallFoamGrenade`, carabine, matraque ; 3e passe : `ERTEngineer.asset` + `ERTEngineerBackpackPopulator.asset` : sac = `EngineeringSurvivalBox` (BreathMask, EmergencyOxygenTankExtendedCapacity, EpinephrineMedipen), matraque `x_Stun`, `EnergyCarbine`, 3 `WallFoamGrenade` ; aucun first aid kit | JUSTE (ceinture à outils et soudeuse industrielle) / FAUX ✔ (« first aid kit » : absent de l'équipement de départ ; seulement un medipen d'épinéphrine dans la boîte de survie) (3e passe) ✔ (vérif. 3e passe : populateur `Occupations/ERTEngineer.asset` (ceinture, JawsOfLife, lunettes scanner, sac `ERTEngineeringBackpack`) + `ERTEngineerBackpackPopulator` (matraque, `EngineeringSurvivalBox`, `EnergyCarbine`, `WallFoamGrenade`) ; le `StandardOccupationPopulator` n'ajoute que casque radio, sac, ID, BlackSuit ; aucune trousse de soins) |
| Janitor : « notably no energy carbine » | idem | sac : lumières de rechange, `x_Stun`, `AdvancedMop`, `Bucket` ; pas de carabine ; `TrashBagOfHolding`, `JanibeltFull` | JUSTE |
| Clown : carabine, baton, menottes, klaxon, banane | idem | `GoldenBikeHorn` et `Banana` en poches, `ERTClownHardsuit`, `CombatClownShoes`, `EyeOfGod`, ceinture `SecurityBeltFull` (matraque, menottes) ; `ERTClownBackpack` est une variante d'`ERTCommanderBackpack` sans autre populateur, donc contient la `EnergyCarbine` et une matraque | JUSTE (corrigé : était À VÉRIFIER EN JEU) |
| Appel par la console de communications | « especially if requested using the communications console » | aucun code de demande d'ERT trouvé dans `Scripts` ; apparition par les points `EmergencyResponseTeam` (`SpawnPoint.cs`) et la page admin `CentCommPage.cs` ; 3e passe : `UI/Systems/AdminTools/CentCommPage.cs` ligne 84-86 : `CreateERTBtn` = « Create ERT is not implemented. » (log d'avertissement) | FAUX ✔ (vérif. 3e passe : verdict maintenu, preuve corrigée. La console de communications (`GUI_Comms.cs`) n'a aucune demande d'ERT : seulement navette, annonce, statut, alerte, codes nucléaires. Mais « ni par l'admin » est faux : le bouton « Create ERT » n'est pas implémenté (`CentCommPage.cs` l. 83-86), pourtant un admin peut faire réapparaître un joueur mort dans un métier spécial (`RequestRespawnPlayer` → `ServerRespawnPlayerSpecial`, liste `SOAdminJobsList.SpecialJobs`, onglet `SpecialJobRespawnTab`), et les métiers ERT ont leurs points d'apparition (`SpawnPoint.cs` l. 217-223). L'asset `SOAdminJobsList` est absent de la copie locale, donc la présence des ERT dans cette liste n'est pas prouvée) |

## Redshield Officer — `…/Redshield-Officer.md` ↔ `Occupations/Centcom/Redshield Officer.asset`
(Le nom Redshield reste Redshield, décidé.)
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Accès | « Security and command » | 8 accès décodés : Brig, Court, ExternalAirlocks, Heads, MaintTunnels, SecDoors, Security, CentGeneral (pas d'Armory ni de Weapons) | JUSTE (précisable) |
| Difficulté | Extreme | `difficulty: 3` (High) | FAUX ✔ |
| Description courte | (non dit) | `descriptionShort` : « • Protect VIPs • Secure High Risk Items » | ABSENT ✔ (info) |
| Équipement | « outfitté comme un agent de sécurité avec un béret » | radio Security Bowman, ceinture de sécurité pleine, SecuritySuit, gants noirs, Jackboots, lunettes HUD sécurité, sac de sécurité, **ArmoredTrenchcoat**, `SecurityNavyBeret`, `PDAHeadsBase` | PÉRIMÉ ✔ (ajouter manteau blindé, PDA de chef) |
| Section « How to do your job » | vide (`---`) | — | PÉRIMÉ ✔ (page incomplète) |

## Ancient Engineer — `…/Ghost_roles/Ancient-Engineer.md` ↔ `Occupations/GhostRole/AncientEngineer.asset`, `GhostRoles/Occupations/AncientEngineer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Ancient Engineer | `displayName: Ancient Engineer` | JUSTE |
| Difficulté | Medium | `difficulty: 2` | JUSTE ✔ contrôlé |
| Accès | « Ancient Station, Maintenance » | 5 accès décodés : Construction, Engine, EngineEquip, ExternalAirlocks, MaintTunnels | JUSTE ✔ contrôlé (précisable) |
| Limite | (non dit) | `limit: 3` ; rôle fantôme `maxPlayers: 3`, `timeout: -1` (jamais expire) | ABSENT ✔ (« always available » = JUSTE) |
| Équipement | hardsuit lourde robuste + équipement d'ingénieur | `PrototypeRIGHardsuit` + casque, `ToolbeltFullEngineering`, `MagBoots`, `OpticalMesonScanner`, `IndustrialBackpack`, ID ancienne | JUSTE |
| Description courte | (non dit) | « Reclaim your home / Repair the shuttle / Explore deepspace » | JUSTE (cohérent) |

## Ashwalker — `…/Ghost_roles/Ashwalker.md` ↔ `Occupations/GhostRole/Ashwalker.asset`, `Scripts/US13/Objects/Lavaland/AshwalkerNest.cs`, `Prefabs/Objects/Lavaland/AshwalkerNest.prefab`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Ash Walker | `displayName: Ashwalker` | PÉRIMÉ ✔ (écriture) |
| Difficulté | Hard | `difficulty: 2` (Medium) | FAUX ✔ |
| Accès | aucun | `issuedClearance: []` | JUSTE |
| 2 cadavres = 1 œuf | « Every 2 corpses added to the nest will grow an egg » | Le code dit `meatCost = 2`, mais le prefab l'écrase : `AshwalkerNest.prefab` `meatCost: 4` (et `timeBetweenEating: 120` au lieu de 30). L'instance sur la carte (`StreamingAssets/Maps/AdditionalScenes/LavaLand.json`, « AshwalkerNest (1) ») ne change aucune valeur. Chaque corps = +1 de viande (`EatBody` → `IncreaseMeat()`) ; les organes ou la viande crue ne donnent +1 qu'avec 5 % de chance (`DMMath.Prob(5)`) ; les corps d'Ashwalker et de Tiefling sont refusés. | FAUX (corrigé : était JUSTE ; il faut 4 corps par œuf) |
| « maximum the nest can hold is three » | idem | `ashwalkerEggs = 3` au départ, puis `ashwalkerEggs++` sans plafond (`IncreaseMeat`) | FAUX ✔ (3 au départ, pas de maximum dans le code) |
| Chaque œuf = un rôle fantôme | idem | `ServerUpdateRole(createdRoleKeyAshwalker, 1, ashwalkerEggs, -1)` | JUSTE |
| Équipement | (non dit) | `AshwalkerSlotPopulator` : `EverburningCandle`, `Pickaxe` (en mains) | ABSENT ✔ |
| Ashwalker Priest | (non dit) | `Ashwalker Priest.asset` limit 1, difficulté 2, 2 sorts, `GoliathCloak` + capuche, `BibleWhiskey`, `PickaxeSilverPlated` | ABSENT ✔ |
| Objectifs « Protéger le tendril », « envahir la station : consulter les admins » | règles RP | — | non jugé |

## Admin — `…/Special/Admin.md`
Pas de métier correspondant dans le jeu. La page contient « coming soon » (page à compléter). Verdict : À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : aucun asset ni script « Admin » à comparer ; les outils admin sont dans `Scripts/US13/UI/Systems/AdminTools/`, la page du wiki est un brouillon). ✔ (vérif. 3e passe : la page ne contient qu'une phrase d'ambiance et « How to Admin: coming soon », rien à comparer ; C maintenu)

---

## ABSENTS (jeu sans page dans ce groupe)
| Nom affiché | Fichier |
|---|---|
| Wizard Apprentice ✔ | `Occupations/Antag/WizardApprentice.asset` |
| Highlander ✔ | `Occupations/Antag/Highlander.asset` (+ `Antags/Highlander.asset`, mode hors rotation ; événement « Highlander », `CanRandomlyTrigger: 0`, ne se déclenche pas au hasard) |
| Welder (« The Welder ») ✔ | `Occupations/Antag/The Welder.asset` (objectif Survive) |
| CentCom Commander ✔ | `Occupations/Centcom/Centcom Commander.asset` |
| Ashwalker Priest ✔ | `Occupations/GhostRole/Ashwalker Priest.asset` |
| Maints Survivor ✔ | `Occupations/GhostRole/MaintsSurvivor.asset` (limit 4, difficulté High) |
| Blazing Oil, Cryogenic Poison, Energized Jelly (souches de Blob) ✔ | `Antagonists/BlobStrains/*.asset` |
| Sorts du Wizard : Charge, Disable Technology, Knock, Magic Missile, The Traps, Mind Swap, Staff of Healing, Scrying Orb, Staff of Door Creation, Summon Events ✔ | `Items/SpellBook/**` |
| Nuclear Operative Reinforcement (rôle fantôme, 0 TC) ✔ | `Antagonists/Antags/Nuclear Operative Reinforcement.asset` (`initialTC: 0`), `GhostRoles/Antagonists/NukeOpReinforcement.asset` |
| Ragin' Mages (rôle fantôme/événement) ✔ | `GhostRoles/Antagonists/RaginMages.asset` ; événement 5 %, 20 joueurs mini |
(Les modes Changeling, Vampires etc. sont déjà traités en fiches : non listés. Les rôles xénos sont couverts par la page Xenomorph. L'ERT Chaplain est couvert sous le nom « inquisitor ».)

## Ce que je n'ai pas pu vérifier
- (3e passe : résolus) temps de recharge des sorts du Wizard.
- Dégâts du P357 et du Punisher .44 (projectiles liés dans des prefabs, pas lus jusqu'au bout) ; le Disruptor Cannon est résolu à la 3e passe.
- Trousse de soins de l'ERT Engineer : absente des populateurs (vérif. 3e passe : `StandardOccupationPopulator` relu, rien non plus) ; une carte (CentCom) pourrait en fournir.
- Comportements en partie (IA xéno, chirurgie, bugs de vision nocturne, bouton Rally Spores).
- (3e passe : résolu) pas de demande d'ERT par console ; le bouton admin « Create ERT » n'est pas implémenté.

## Questions pour un joueur
Lignes restantes : 5 en D (comportement en partie), 4 en C (règle de serveur / pas dans le code).
1. Cargonia (`docs/3_HowToPlay/Jobs/Antagonist_roles/Cargonia.md`) : quand Cargo est le département rebelle, trouve-t-il au début de la manche, dans son département, un lathe à lui, au moins 6 combinaisons spatiales et un accès à la navette d'expédition ? (D)
2. Blob (`docs/3_HowToPlay/Jobs/Antagonist_roles/Blob.md`) : quand le Blob clique sur « Rally Spores », ses spores vont-elles vers l'endroit choisi ? (D)
3. Xenomorph (`docs/3_HowToPlay/Jobs/Antagonist_roles/Xenomorph.md`) : un admin peut-il faire réapparaître un joueur mort en xénomorphe depuis le panneau de réapparition (onglet Antag) ? (D)
4. Xenomorph (`docs/3_HowToPlay/Jobs/Antagonist_roles/Xenomorph.md`) : un xéno adulte voit-il les créatures à travers les murs, et la reine peut-elle se déplacer ? (D)
5. Death Squad (`docs/3_HowToPlay/Jobs/Protagonist_roles/Centcom_roles/Death-Squad.md`) : les lunettes de vision nocturne du Death Squad éclairent-elles l'écran dans le noir quand on les porte ? (D)
6. Fugitive (`docs/3_HowToPlay/Jobs/Antagonist_roles/Fugitive.md`) : le serveur considère-t-il les conseils de la page (piller la maintenance, se nourrir, éviter de se montrer) comme une bonne façon de jouer le Fugitive ? (C)
7. Traitor (`docs/3_HowToPlay/Jobs/Antagonist_roles/Traitor.md`) : avec une arme de la sécurité prise sans accès Security, le tir est-il refusé (percuteur verrouillé par ID) ? (C)
8. Central Command Officer (`docs/3_HowToPlay/Jobs/Protagonist_roles/Centcom_roles/Central-Command-Officer.md`) : sur le serveur, l'officier de CentCom donne-t-il des ordres au capitaine (règle admin, pas de code) ? (C)
9. Admin (`docs/3_HowToPlay/Jobs/Protagonist_roles/Special/Admin.md`) : l'équipe veut-elle garder une page « Admin » dans le wiki joueur, oui ou non ? (C)
