# Audit commandement-securite-ingenierie-synthetiques — wiki contre le code du jeu (develop, 2026-10-26)
Vérifié par une 2e relecture : 30 verdicts confirmés, 4 corrigés, 2 passés en À VÉRIFIER EN JEU (sur 36 verdicts FAUX/PÉRIMÉ/ABSENT ; échantillon des JUSTE contrôlé : noms, limites, difficultés et accès des 12 métiers, Imperator, Ian, réacteur). En plus : 2 points À VÉRIFIER tranchés en JUSTE (hardsuit du Captain par les cartes, revolver du Detective par le populator du holster), 2 écarts de construction ajoutés (Water pump à retirer, Grille Floor Tile à ajouter). Cartes lues : les 10 stations principales `StreamingAssets/Maps/MainStations/*.json`.
Résumé : 12 pages (Captain, Head of Personnel, Head of Security, Warden, Detective, Security Officer, Lawyer, Chief Engineer, Engineer, Atmospheric Technician, Station AI, Cyborg), 13 lignes FAUX, 17 PÉRIMÉ, 3 ABSENT (informations manquantes dans une page ; aucun métier absent), 17 lignes avec un À VÉRIFIER EN JEU (dont 5 à double verdict : ceinture/taser du Captain, armure du Captain, Singularité/Tesla, équipement atmos, réparations du Cyborg).

Légende difficulté du jeu (`Occupation.cs`, enum `OccupationDifficulty`) : 0 Zero, 1 Low, 2 Medium, 3 High, 4 Extreme.
Accès : décodés avec `Scripts/US13/Systems/Clearance/Clearance.cs` (le champ `issuedClearance` est une suite d'entiers 32 bits little-endian). `issuedLowPopClearance` = accès donnés seulement à faible population.
Départements : champ `jobCategory` (enum `JobCategory` dans `Systems/Occupations/JobType.cs`). Les 12 métiers sont tous présents côté jeu : aucun ABSENT.
Chemins jeu : `UnityProject/Assets/ScriptableObjects/Occupations/...`, équipement dans `.../Inventory/Populators/Occupations/<Métier>Populator.asset` (GUID résolus par les `.meta`), casiers dans `.../SpawnableLists/Closets/`.

## Captain — `docs/3_HowToPlay/Jobs/Command_roles/Captain.md` ↔ `Occupations/Captain.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Captain | `displayName: Captain` | JUSTE |
| Département | Command | `jobCategory: 8` = Command | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE (rien à corriger) |
| Difficulté | Very Hard | `difficulty: 3` = High | FAUX (High, pas Extreme) ✔ (enum relu : `Occupation.OccupationDifficulty` Zero, Low, Medium, High, Extreme ; `GUI_JobInfo.GetFormattedDifficulty` affiche « Difficulty: High ») |
| Accès | Everything | `issuedClearance` : 59 accès dont Captain, Heads, Armory, AIUpload, Vault, Gateway ; absents : Pharmacy, MiniSat, Network, MineralStoreroom, AuxBase, AllPersonalLockers | PÉRIMÉ (presque tout, pas tout) ✔ |
| Description courte | non citée | « Manage the station / Manage your staff / Keep the crew alive » | JUSTE (pas de contradiction) |
| Équipement : « security belt and taser » | Le Captain démarre avec une ceinture de sécurité et un taser | `CaptainPopulator.asset` : carapace, PDA, casque, bottes, combinaison, lunettes de soleil, sac, gants, headset, carte ID dorée. `CaptainsLockerPopulator.asset` : gaz mask, sabre (`SabreSheath`), pinpointer de disque, télécommande d'accès, etc. Ni ceinture de sécurité ni taser | FAUX pour la ceinture ✔ ; taser : À VÉRIFIER EN JEU (corrigé : selon la carte. `FallStation.json` pose un `TaserHybridV43` dans le bureau du Captain, à côté de `Closet_Locker_Captain` ; aucune des 9 autres stations n'en met près du casier du Captain. Aucune ceinture de sécurité près du casier sur les 10 cartes) |
| Pistolet « Imperator » | Dans le bureau | `CaptainsLockerPopulator.asset` contient `ImperatorLaserGun.prefab` (guid 24461e84…) | JUSTE (il est dans le casier, pas sur le joueur) |
| « best general purpose armor (chest only) » | armure du torse | `CaptainsCarapace.prefab` en emplacement vêtement extérieur | JUSTE sur l'existence ; protection À VÉRIFIER EN JEU |
| Hardsuit dans le bureau | oui | `SuitStorageUnitCaptain` près du casier du Captain sur les 10 stations principales (1 par carte) | JUSTE (corrigé : tranché par les cartes) |
| Appel de la navette, niveau d'alerte | plus l'alerte est haute, plus la navette arrive vite | non lu | À VÉRIFIER EN JEU |
Proposition de correction : "Difficulty: Hard. Access: nearly everything. You start with a Captain's carapace, a gold ID and a headset; your locker holds the Imperator laser gun, a sabre, a gas mask and the disk pinpointer. You do not start with a security belt; on some maps (FallStation) a taser lies in your office."

## Head of Personnel — `.../Command_roles/Head-of-Personnel.md` ↔ `Occupations/Head of Personnel.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Head of Personnel | `displayName: Head of Personnel` | JUSTE |
| Département | Command | `jobCategory: 8` | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE |
| Difficulté | Medium | `difficulty: 2` = Medium | JUSTE |
| Accès | « Cargo, Service, HoP's office and terminal, Command area » | 46 accès : Heads, Hop, ChangeIds, Security, Brig, Medical, Rnd, Engine, Atmospherics, Cargo, Qm, Court… + faible pop : Armory, AIUpload, Teleporter, Tcomsat, Gateway | PÉRIMÉ (corrigé : incomplet, pas faux. Décodage refait : 47 accès, Cargo, Service (Bar, Kitchen, Hydroponics, Janitor), Hop, ChangeIds et Heads y sont bien ; le wiki oublie le reste) |
| Description | « third in command (second is Ian) », modifier les ID | `descriptionLong` : « third in command (second is Ian) » | JUSTE |
| « lame (but extremely robust) taser » | le HoP a un taser | `HeadOfPersonnelPopulator.asset` : PDA, casque, bottes, combinaison, headset, carte argent. `HeadOfPersonnelsLockerPopulator.asset` : armure, matraque télescopique, boîte d'ID de rechange, télécommande d'accès. Pas de taser | À VÉRIFIER EN JEU (corrigé : selon la carte. Un taser est posé dans le bureau du HoP sur `FallStation.json` (`TaserHybridV43`) et `OutpostStation.json` (`TaserV42`, à côté de `Closet_Locker_HOP`) ; rien sur les 8 autres stations) |
| Ian : « Ian follow! / Ian stay! », seul le HoP peut l'ordonner | commandes vocales réservées au HoP | `Scripts/US13/NPC/AI/Friendly/CorgiAI.cs` l.83 : `player.Job == JobType.CAPTAIN \|\| player.Job == JobType.HOP` ; « stay/sit/stop », « come/follow », « run » | FAUX (le Captain peut aussi) ✔ |
| Armurerie interdite sans permission | règle de jeu | `Armory` n'est accordé qu'en faible pop | À VÉRIFIER EN JEU (règle SOP) |
Proposition de correction : "Both the Captain and the HoP can order Ian by voice. Access: nearly all departments (Security, Medical, Science, Engineering, Cargo, Service, Command), plus the ID console. Your locker has an armor vest, a telescopic baton and spare IDs; on some maps (FallStation, OutpostStation) a taser lies in your office."

## Head of Security — `.../Security_roles/Head-of-Security.md` ↔ `Occupations/Security/Head of Security.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Head of Security | `displayName: Head of Security` | JUSTE |
| Département | Security | `jobCategory: 4` | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE |
| Difficulté | Hard | `difficulty: 4` = Extreme | FAUX ✔ |
| Accès | « Security & cells, Brig, Armory » | Security, Brig, Armory, ForensicsLockers, Heads, Hos, KeycardAuth, Vault, Weapons, SecDoors, Medical, Morgue, Engine, Cargo… + faible pop Gateway | PÉRIMÉ (incomplet : accès Heads, Hos et plusieurs départements) ✔ |
| Équipement | non détaillé | manteau blindé, ceinture sécurité pleine, béret, lunettes HUD, sac sécurité, gants, headset HoS, ID argent, PDA HoS | JUSTE (pas d'affirmation) |
| Supérieur | « seuls Captain et Centcom » | non porté par l'asset | À VÉRIFIER EN JEU |
| Autorité sur Warden/Detective/officiers | oui | non tranchable | À VÉRIFIER EN JEU |
Proposition de correction : "Difficulty: Very Hard (Extreme). Access: all of Security plus Command (Heads), the HoS office and the vault."

## Warden — `.../Security_roles/Warden.md` ↔ `Occupations/Security/Warden.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Warden | `displayName: Warden` | JUSTE |
| Département | Security | `jobCategory: 4` | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE |
| Difficulté | Hard | `difficulty: 3` = High | JUSTE |
| Accès | « Security & cells, Brig, Armory » | Security, Brig, Armory, MaintTunnels, ExternalAirlocks, Court, SecDoors, Weapons + faible pop ForensicsLockers | JUSTE (incomplet : Maintenance, Court, Weapons) |
| Description courte | « Guard the brig / Release prisoners » | cohérent avec « Guard the brig, release prisoners when it's time » | JUSTE |
| Supérieur : « second in Security's chain of command » | oui | `descriptionLong` : « second in Security's chain of command, right-hand to the Head of Security » | JUSTE |
| Armes distribuées sur autorisation | règle | non tranchable | À VÉRIFIER EN JEU |

## Detective — `.../Security_roles/Detective.md` ↔ `Occupations/Security/Detective.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Detective | `displayName: Detective` | JUSTE |
| Département | Security | `jobCategory: 4` | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE |
| Difficulté | Medium | `difficulty: 2` = Medium | JUSTE |
| Accès | « Security & Cells, Detective's office, Maintenance » | Security, Brig, ForensicsLockers, MaintTunnels, ExternalAirlocks, Court, SecDoors, Weapons | JUSTE |
| « there currently are no detective-related items in the game » | aucun objet de détective | `DetectivesCabinet.asset` : scanner de détective (`Detective scanner.prefab`), boîte de sacs à preuves, holster de détective (`DetectivesHolsterFull`), gilet de détective, seclite, spray au poivre ; `EvidenceBag.prefab` existe ; un `DetectivesCabinet` est placé sur chacune des 10 stations principales | FAUX ✔ |
| « comes with a bonus revolver » | revolver | `DetectivesHolsterFull.prefab` → `itemStoragePopulator` `DetectivesHolsterPopulator.asset` : `P238Revolver.prefab` + 2 `SpeedLoader.38.prefab` | JUSTE (corrigé : tranché, le revolver est dans le holster du cabinet) |
| Équipement de départ | non détaillé | trench-coat, chapeau de détective, lunettes HUD, cravate, headset sécurité, PDA détective | JUSTE (pas d'affirmation) |
Proposition de correction : "The Detective's cabinet contains a detective scanner, a box of evidence bags, a holster with a revolver and two .38 speed loaders, a detective armor vest and a seclite."

## Security Officer — `.../Security_roles/Security-Officer.md` ↔ `Occupations/Security/Security Officer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Security Officer | `displayName: Security Officer` | JUSTE |
| Département | Security | `jobCategory: 4` | JUSTE |
| Limite | non citée | `limit: 5` | JUSTE |
| Difficulté | hard | `difficulty: 3` = High | JUSTE |
| Accès | « Security & cells, Maintenance » | Security, Brig, MaintTunnels, ExternalAirlocks, Construction, Court, SecDoors, Weapons + faible pop Armory, ForensicsLockers | JUSTE (incomplet) |
| « you have a tazer, a stun baton, and some handcuffs » | taser au départ | `SecurityBeltFullPopulator.asset` : spray au poivre, menottes, grenade flashbang, seclite, matraque (`x_Stun Baton_x`), flash. Pas de taser sur la ceinture | JUSTE (corrigé : le taser est dans le casier. `SecurityOfficersLocker.prefab` → `initialContents` `SecurityOfficersLocker.asset`, qui contient `TaserHybridV43` (« hybrid taser v43 ») ; ce casier est posé sur Box, Fall, Square… Les armureries ont aussi des tasers. Matraque et menottes sur la ceinture : JUSTE) |
| « Press Z to activate stun mode », matraque à charges infinies | oui | non lu | À VÉRIFIER EN JEU |
| Chaîne de commandement et Space Law (tables de crimes, durées) | texte long | règles de serveur, non codées | À VÉRIFIER EN JEU |
| Page fusionnée : « Space Law » (page Warden/Lawyer renvoient ici) | — | — | sans objet |
Proposition de correction : "Your security belt holds handcuffs, a stun baton, a flash, a flashbang, pepper spray and a seclite. Your taser (hybrid taser v43) is in the security officer locker."

## Lawyer — `.../Security_roles/Lawyer.md` ↔ `Occupations/Service/Lawyer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Lawyer | `displayName: Lawyer` | JUSTE |
| Département | Role type Civilian (rangé dans Security) | `jobCategory: 7` = Crewe ; fichier dans `Occupations/Service/` (décision mainteneurs : on ne déplace pas) | À SIGNALER, pas de proposition |
| Limite | non citée | `limit: 2` | JUSTE |
| Difficulté | easy | `difficulty: 1` = Low | JUSTE |
| Accès | « Maintenance » | ExternalAirlocks, Lawyer, Court, SecDoors. Pas de MaintTunnels | FAUX ✔ |
| Équipement | non détaillé | valise, lunettes de soleil, costume noir, headset « LawAndOrder », PDA avocat | JUSTE (pas d'affirmation) |
Proposition de correction : "Access: Lawyer's office, the courtroom, outer security doors and external airlocks. No maintenance access."

## Chief Engineer — `.../Engineering_roles/Chief-Engineer.md` ↔ `Occupations/Engineering/Chief Engineer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Chief Engineer | `displayName: Chief Engineer` | JUSTE |
| Département | Engineer | `jobCategory: 2` = Engineering | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE |
| Difficulté | Medium | `difficulty: 3` = High | FAUX ✔ |
| Accès | « Engineering, Maintenance, Command » | Engine, EngineEquip, MaintTunnels, ExternalAirlocks, Eva, Heads, TechStorage, Atmospherics, Construction, Ce, KeycardAuth, Tcomsat, SecDoors + faible pop Robotics | JUSTE |
| Traître CE : accès à la salle d'upload IA | oui | `AIUpload` absent de `issuedClearance` et de `issuedLowPopClearance` (présent pour Captain, et pour le HoP en faible pop) | FAUX ✔ |
| Équipement : « best construction tools, very good hardsuit, advanced magboots » | oui | `ChiefEngineerPopulator.asset` : ceinture d'outils CE pleine, casque de chantier blanc, gants, sac industriel, headset CE, ID argent. Casier : gants isolants, boulons de porte, matraque télescopique, caisse à outils CE. Pas de hardsuit ni de bottes magnétiques dans ces listes | À VÉRIFIER EN JEU (peut venir de la carte : un `SuitStorageUnitChiefEngineer` est posé sur les 10 stations principales ; bottes non vérifiées) |
| Réacteur : trois jauges K (1.00 / 0.10 / 0.01) | oui | `GUI_ReactorController.cs` : `CoreKValue1_00`, `CoreKValue0_10`, `CoreKValue0_01` | JUSTE |
| Trois types de tiges (contrôle, combustible, démarrage) | oui | `ControlRod.cs`, `FuelRod.cs`, `EngineStarter.cs` | JUSTE |
| Réacteur : flux 10^5 à 10^6, K 6 à 7, procédure pas à pas | oui | valeurs internes (`NEUTRON_SINGULARITY = 76488300000`, `MAX_CORE_TEMPERATURE = 2400`, `MAX_CORE_PRESSURE = 300000`) ne contredisent pas, procédure non testée | À VÉRIFIER EN JEU |
| Singularité et Tesla | moteurs décrits | `Singularity.cs`, `TeslaCoil.cs`, `ParticleAcceleratorControl.cs`, `Emitter.cs`, prefabs `SingularityEngine`, `TeslaEngine`, `SuperMatterEngine` existent | JUSTE (existence) ; détails À VÉRIFIER EN JEU |
| Supermatter | citée en passant (traître CE, l. 39 ; singularité supermatter, l. 177), sans guide | `SuperMatter.cs` et prefabs existent | ABSENT ✔ (le guide du moteur Supermatter manque ; corrigé : la page le cite) |
Proposition de correction : "Difficulty: Hard. Access: Engineering, Atmospherics, Command and the telecomms satellite, but not the AI upload room."

## Engineer — `.../Engineering_roles/Engineer.md` ↔ `Occupations/Engineering/Engineer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Engineer | `displayName: Engineer` | JUSTE |
| Département | Engineer | `jobCategory: 2` | JUSTE |
| Limite | non citée | `limit: 5` | JUSTE |
| Difficulté | Medium | `difficulty: 2` | JUSTE |
| Accès | « Engineering, Maintenance » | Engine, EngineEquip, MaintTunnels, ExternalAirlocks, Construction + faible pop Atmospherics | JUSTE |
| Équipement : « toolbelt, toolboxes, own hardsuit » (« on most stations ») | ceinture et hardsuit | `EngineerPopulator.asset` : ceinture à outils pleine, casque de chantier, sac industriel, headset, PDA, bottes de travail, T-ray scanner. Casier : caisses à outils, analyseur, compteur Geiger, projecteur holobarrière. Hardsuit absent des listes | À VÉRIFIER EN JEU pour le hardsuit (cartes : 2 à 5 `SuitStorageUnitEngineer` par station, pour 5 ingénieurs au plus) |
| Liste d'outils (pied-de-biche, tournevis, soudeur, clé, cutter, multitool) | oui | outils présents dans les prefabs de ceinture ; non détaillé | JUSTE (plausible) |
| Tables de construction | coûts par matériau | `Construction/BuildList/*.asset` : Cloth, Durathread, Alien alloy, Diamond, Gold, Silver, Uranium, Runed metal identiques sauf indiqués | voir ci-dessous |
Écarts de construction (wiki contre `BuildList`) :
- Wooden plank : « Wooden Chair » coût 1 dans le wiki, 3 dans le jeu (`WoodenPlankConstructionList.asset`) : FAUX ✔.
- Alien alloy : « Alien Floor Tile » coût 4 dans le wiki, 1 dans le jeu avec `spawnAmount: 4` : FAUX ✔ (lecture de colonne).
- Metal : le jeu propose en plus Camera Assembly (5), Air Controller Unit Frame (2), Reflector Frame (5), Turret Frame (5), BallisticTurret Frame (5), Chemical Grenade (2), Plinth (4) : PÉRIMÉ ✔. En plus (ajouté par la relecture) : le wiki liste « Water pump L to R » (25), absent de `MetalConstructionList.asset` : à retirer. Les entrées « Floor Tiles x4 », « Metal Rods x2 », « Airlock » (4) existent sous d'autres noms : JUSTE.
- Glass : Directional Window (1) et Solar Panel (25) absents du wiki : PÉRIMÉ ✔.
- Metal rods (ajouté par la relecture) : « Grille Floor Tile » (1) absent du wiki (`RodConstructionList.asset`) : PÉRIMÉ.
- Wooden plank : Ore Box, Wooden Crate, Drying Rack, Wooden Barrel, Wooden Airlock Assembly, Pews absents du wiki : PÉRIMÉ ✔.
- Diamond, Gold, Silver, Plasma, Uranium : « Airlock Assembly » (4) absent du wiki : PÉRIMÉ ✔.
- Verres renforcé, plasma, titane, plastitanium : fenêtres directionnelles absentes du wiki : PÉRIMÉ ✔.
- Runed metal : « Engraved Floor » absent : PÉRIMÉ ✔.
Proposition de correction : "Update the construction tables from the in-game build lists (wooden chair costs 3 planks; add the missing entries listed above, remove the water pump)."

## Atmospheric Technician — `.../Engineering_roles/Atmospherics-Technician.md` ↔ `Occupations/Engineering/Atmospheric Technician.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Atmospherics Technician | `displayName: Atmospheric Technician` | PÉRIMÉ (le nom affiché est « Atmospheric Technician ») ✔ |
| Département | Engineering | `jobCategory: 2` | JUSTE |
| Limite | non citée | `limit: 3` | JUSTE |
| Difficulté | Medium | `difficulty: 2` | JUSTE |
| Accès | « Atmospherics, Engineering, Maintenance » | Engine, EngineEquip, MaintTunnels, ExternalAirlocks, Atmospherics, Construction | JUSTE |
| Équipement | « asbestos-lined hard-suit, immune to all fire » | `AtmosphericTechnicianPopulator.asset` : bottes de travail, combinaison atmos, headset ingénierie, ceinture atmos pleine, sac industriel, PDA atmos. Pas de hardsuit. Casier : masque à gaz atmos, projecteur « Holofan » | JUSTE en partie (corrigé : le wiki ne dit pas que le hardsuit est porté au départ ; 2 à 4 `SuitStorageUnitAtmos` sont posés sur 9 des 10 stations principales, aucun sur CaveStation) ; immunité au feu À VÉRIFIER EN JEU |
| Atmosphère de la station : « 20% oxygen and 80% nitrogen at 300 KPA » | 300 kPa | `ScriptableObjects/Atmospherics/Air.asset` : oxygène 20.79 mol, azote 83.14 mol (soit 20 % / 80 %), `pressure: 101.325005`. `AtmosConstants.ONE_ATMOSPHERE = 101.325` ; les pièces sont remplies par `GasMixes.BaseAirMix` (`AtmosSystem.cs`) et les bouches visent `ExternalTarget = ONE_ATMOSPHERE` (`AirVent.cs`) | FAUX pour la pression (101.3 kPa, pas 300) ✔ |
| « some co2 for taste » | du CO2 | `Air.asset` : seulement oxygène et azote | FAUX ✔ |
| « Atmospherics are barely in the game » | atmos quasi absente | pipes, pompes, mélangeurs, thermomachines, 20+ gaz dans `ScriptableObjects/Atmospherics/Gases` | PÉRIMÉ ✔ |
| Tout le monde démarre avec une bouteille d'oxygène et un masque dans le sac | oui | non lu | À VÉRIFIER EN JEU |
| Seuils de pression de danger | non cités | `AtmosConstants` : HAZARD_HIGH 550, WARNING_HIGH 325, WARNING_LOW 50, HAZARD_LOW 20 | (info) |
Proposition de correction : "The station air is about 20% oxygen and 80% nitrogen at 101.3 kPa (one atmosphere), with no CO2. Atmos techs start with an atmospherics toolbelt and an industrial backpack; atmos hardsuits are in suit storage units on most maps, not on you."

## Station AI — `.../Synthetic_roles/Station-AI.md` ↔ `Occupations/Ai.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Station AI | `displayName: AI` | PÉRIMÉ (le joueur voit « AI ») ✔ |
| Département | Synthetic | `jobCategory: 9` = Silicon | JUSTE |
| Limite | non citée | `limit: 1` | JUSTE |
| Difficulté | medium to hard | `difficulty: 4` = Extreme | FAUX ✔ |
| Accès | Everything | `issuedClearance` vide. `DoorMasterController.cs` : l'IA ouvre une porte par `PulseTryOpen(bypassSoftware: true)`, avec commentaire « AI does not have access » ; la porte doit avoir du courant et être câblée pour l'IA (`CanAIInteract`) | JUSTE en pratique (corrigé : pas d'accès par carte, mais `ToggleOpenDoor` ouvre toute porte alimentée et câblée sans contrôle d'accès ; « Everything » décrit bien ce que voit le joueur, à nuancer) |
| Description courte | non citée | « Play as the station AI, follow your laws! » | JUSTE |
| Ne peut rien faire de physique | oui | interactions limitées à `AiActivate` (interrupteurs, SMES, alarmes, caméras, tuyaux…) | JUSTE |
| Lois Asimov | « those pesky Asimov laws » | `ScriptableObjects/Ai/` : Asimov, Antimov, Corporate, Crewsimov, Robocop, Paladin, Quarantine… ; `AiPlayer.SetRandomDefaultLawSet()` tire un jeu au hasard | PÉRIMÉ ✔ (précisé : `Ai_Player.prefab` `defaultLawSets` = Asimov, Corporate, Robocop, Paladin 3.5e ; tirage dans `AiPlayer.Start()`) |
| Canal binaire | existe | `Binary` dans `ChatRelay.cs`, `EncryptionKey.cs` | JUSTE |
| « Cyborgs are still MIA » ; IA constructibles par les roboticiens | cyborgs absents | `Cyborg.asset` (limite 2) existe ; `AiCoreFrame.cs`, `AiCoreCircuitBoard` existent ; `Cyborg.asset` est dans `AllowedOccupationsSingleton.asset` | PÉRIMÉ ✔ |
| Tourelles et console de contrôle | oui | `Turret.cs`, `TurretSwitch.cs`, `GUI_TurretController.cs`, `AiCoreTurret.prefab` | JUSTE |
| Console d'upload de lois | oui | `AiUploadConsole.cs` | JUSTE |
Proposition de correction : "Displayed as AI. Difficulty: Very Hard. The AI has no ID access; it operates doors, switches and APCs remotely when they are powered and wired to it. Starting laws are picked at random among Asimov, Corporate, Robocop and Paladin 3.5e. Cyborgs and AI cores exist."

## Cyborg — `.../Synthetic_roles/Cyborg.md` ↔ `Occupations/Cyborg.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Cyborg | `displayName: Cyborg` | JUSTE |
| Département | Synthetic | `jobCategory: 9` | JUSTE |
| Limite | non citée | `limit: 2` | JUSTE (à mentionner) |
| Difficulté | non citée | `difficulty: 3` = High | ABSENT ✔ |
| Accès | non cité | `issuedClearance` vide | ABSENT ✔ |
| Description courte | « usually assigned as crew, can be made by roboticist » | « A robotic member of the crew tied to the AI » | JUSTE |
| Module Engiborg | 17 objets | `ToolCarousel/Engineering ToolCarousel.prefab` : clé, pied-de-biche, tournevis, cutter, soudeur, multitool, T-ray, analyseur atmos, Geiger, extincteur, rods, câbles x3, métal, verre, verre renforcé, tuiles, flash | JUSTE |
| Module Janiborg | liste | `ToolCarouselJanitor.prefab` : serpillière, seau, spray, savon, sac poubelle, remplaceur de lampes, tournevis, pied-de-biche de poche, tuiles, extincteur, flash, projecteur holobarrière | PÉRIMÉ (manque le projecteur holobarrière ; pied-de-biche de poche) ✔ (`CustodialHolobarrierProjector`, `PocketCrowbar`) |
| Module Mediborg | liste | `ToolCarouselMedical.prefab` : en plus, `Cyborg DefibrillatorPaddles` et `PillBottle` (absents du wiki) | PÉRIMÉ ✔ |
| Il n'existe que trois modules (ingénierie, concierge, médical) | implicite | seuls ces trois carrousels existent | JUSTE |
| Choix de module permanent, tablette de lois, réparation clé/pied-de-biche/soudeur | procédures | `Surgery/Cyborg/` : RepairDents, RepairBurnDamage, Open/Close/Remove | JUSTE (existence) ; étapes À VÉRIFIER EN JEU |
Proposition de correction : "Add: Cyborg has 2 slots, difficulty High, no ID access. Janiborg also has a holobarrier projector; Mediborg also has defibrillator paddles and a pill bottle."

## Ce que je n'ai pas pu vérifier
- Tout ce qui dépend des scènes de carte (hardsuits dans les bureaux, casiers placés, taser rangé dans un casier). Relecture : les 10 cartes `MainStations/*.json` ont été lues (objets par `PrefabID`, voisinage de 3 à 6 cases) ; les casiers dont la carte remplacerait le contenu n'ont pas été contrôlés.
- Le comportement en partie (SOP, durées des peines, Ian, matraque Z, procédure réacteur).
- Les GUID non résolus : Engineer slot 17 est le T-ray scanner (`TrayScanner.prefab`), quelques GUID de scripts et de carrousels restent anonymes.
- Les tables de construction ont été comparées automatiquement (nom, coût) ; seules les différences notables sont listées.
