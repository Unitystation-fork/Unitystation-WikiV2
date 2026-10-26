# Audit medical-science — wiki contre le code du jeu (develop, 2026-10-26)

Vérifié par une 2e relecture : 35 verdicts confirmés, 2 corrigés, 2 passés en À VÉRIFIER EN JEU (la partie « Cloning » des accès Chemist et Medical Doctor ; les verdicts FAUX/PÉRIMÉ de ces lignes tiennent pour le reste ; preuve des robots corrigée sans changer le verdict) (les 35 FAUX/PÉRIMÉ/ABSENT relus un par un ; 7 JUSTE sur 27 recontrôlés, tous confirmés : CPR 5 s, soin 40, dégâts de clonage 25, Kelotane C+Si, difficultés Chemist/Roboticist, Charcoal Pill).

Résumé (recompté ligne par ligne après relecture) : 11 pages, 27 justes, 12 faux, 9 périmés, 14 absents, 22 à vérifier en jeu (plus la partie « Cloning » de la ligne Accès du Chemist, restée FAUX pour la maintenance). (L'ancien résumé, « 11 faux, 6 périmés, 2 absents, 14 à vérifier », ne correspondait pas aux tableaux.)

Sources (copie locale du dépôt `unitystation/unitystation`, branche develop, commit 31ad5f54, plus `raw.githubusercontent.com` pour les prefabs). Les chemins ci-dessous partent de `UnityProject/Assets/`.

Comment lire l'accès : le champ `issuedClearance` des `.asset` est une liste d'entiers (4 octets chacun, little-endian) qui se lit avec l'enum `Scripts/US13/Systems/Clearance/Clearance.cs` (Medical=5, Morgue=6, Rnd=7, Toxins=8, Genetics=9, MaintTunnels=12, ExternalAirlocks=13, Eva=17, Heads=18, Chemistry=32, Surgery=40, Research=42, Robotics=28, Xenobiology=47, Psychology=61...). Il n'existe PAS de clearance « Cloning » dans l'enum. (2e relecture : vrai, mais la salle du cloneur est gardée par des portes de carte, pas par une clearance dédiée. Autour du Cloning Pod (guid 4ca7e9a3…) on trouve surtout des sas `AirlockMedicalWindowed/Opaque` dont la clearance par défaut est Medical (5) (prefab : `requiredClearance.Array.data[0]` = 5), plus quelques portes Genetics (9) : BoxStation (-177,39) : sas Medical et Genetics ; OutpostStation (60,67) : uniquement des sas Medical ; FallStation, SquareStation, MiniStation : Medical, Morgue, Surgery, Genetics selon la porte. Qui entre dans la salle de clonage dépend donc de la carte : À VÉRIFIER EN JEU.) Presque tous les métiers de ces dossiers ont `ExternalAirlocks` (13) ; `MaintTunnels` (12) n'est donné qu'à certains.

Départements (`ScriptableObjects/Departments/Medical.asset`, `Research.asset`, guid résolus par les `.meta`) :
- Medical : chef = Chief Medical Officer ; membres = Medical Doctor, Paramedic, Psychiatrist, Chemist, Virologist.
- Research : chef = Research Director ; membres = Scientist, Geneticist, Roboticist.
Donc dans le jeu, le Geneticist est dans Research (le wiki le range dans Medical : décision des mainteneurs, signalé seulement).

Aucun métier « Xenobiologist » dans `ScriptableObjects/Occupations/**` (il n'y a que la clearance `Xenobiology`=47, donnée à Scientist et Research Director).

---

## Chemist — `docs/3_HowToPlay/Jobs/Medical_roles/Chemist.md` ↔ `ScriptableObjects/Occupations/Medical/Chemist.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Chemist | `displayName: Chemist` | JUSTE |
| Département | Medical | `jobCategory: 3` (Medical) ; Departments/Medical.asset | JUSTE |
| Supérieur | CMO « commande » les chimistes (page CMO) | Le jeu ne définit pas de hiérarchie ; le CMO est seulement chef du département Medical | À VÉRIFIER EN JEU |
| Accès | Medbay, Cloning, Morgue, Chemistry lab, Maintenance | `issuedClearance: 20000000 0d000000 05000000 06000000` = Chemistry(32), ExternalAirlocks(13), Medical(5), Morgue(6). Pas de MaintTunnels(12), pas de « Cloning » | FAUX ✔ (Maintenance) ; « Cloning » : À VÉRIFIER EN JEU (corrigé : pas de clearance Cloning, mais la salle du cloneur est derrière des sas Medical (5) sur la plupart des cartes, que le Chemist possède ; voir l'en-tête) |
| Équipement | Lunettes « comme celles du barman », béchers | `Inventory/Populators/Occupations/ChemistPopulator.asset` : ScienceGoggles (yeux), ChemistsJumpsuit, ChemistLabcoat, WhiteShoes, ChemistryBackpack, headset Medical, PDAChemist, ID. Pas de bécher dans l'équipement de départ (ils sont dans le bureau) | À VÉRIFIER EN JEU (lunettes : ScienceGoggles présent) |
| Description courte | Page : faire meth, explosifs, etc. | `descriptionShort: Mess with chemicals / Produce pills and medicine / craft other substances` ; `descriptionLong` : « Do not make lube grenades or transform your workplace into a drug lab » | À VÉRIFIER EN JEU (ton RP, pas jugé) |
| Limite | non citée | `limit: 2` | — |
| Difficulté | Medium | `difficulty: 2` (Medium) | JUSTE |
| Recettes (section Chemistry) | Lube = O + Si + eau ; Antitoxin = N+Si+K ; Bicaridine = C+O+sucre ; Kelotane = C+Si ; Tricordrazine = Antitoxin+Bicaridine+Kelotane ; Cryoxadone = Plasma stable+Acétone+Mutagène instable ; Mannitol = sucre+H+eau ; Styptic = Al+H+O+acide sulfurique ; Silver sulf. = NH3+Ag+S+O+Cl ; Synthflesh = sang+C+Styptic ; Impedrezene = Hg+O+sucre ; Mutagène = Cl+P+Ra ; Space cleaner = eau+ammoniac ; Ammoniac = N+H ; Acétone = huile+welding fuel+O ; Laughter = jus de banane+sucre ; Potassium+eau explose ; Pest/Plant-B-Gone/Weed killer = Toxin + Ethanol/eau/ammoniac | `ScriptableObjects/Chemistry/Reactions/**` : ingrédients identiques pour toutes ces recettes (noms résolus par guid) | JUSTE (ingrédients) |
| Clonexadone | Cryoxadone + Sodium | `Reactions/Medicine/Clonexadone.asset` : Cryoxadone + Sodium **avec catalyseur Plasma** (guid 3f8ba0db… = `Reagents/Toxin/Plasma`, valeur 5) | PÉRIMÉ ✔ (catalyseur absent ; relu : `catalysts` = Plasma, valeur 5, et `Reaction.cs` refuse la réaction si le catalyseur manque. Il n'est pas consommé) |
| Ratios « 1 part », « 3 part Hydrogen », « 4 part Ethanol » | ratios précis | `results`/ratios non décodés ligne à ligne | À VÉRIFIER EN JEU |
| Effets chiffrés (« heals 1 random toxin damage per tick », « 0.2 clone », « 2 brain », etc.) | valeurs par tick | Effets dans `Reactions/Body/*InBody.asset`, non décodés | À VÉRIFIER EN JEU |
| Disclaimer rouge « all others turn to ash » | indique que seules ces recettes marchent | Le dépôt contient d'autres réactions (`Reactions/Pyrotechnics`, `Toxins`, etc.) | PÉRIMÉ ✔ |

Proposition : "Access: Medical, Morgue, Chemistry, External airlocks (no maintenance)." (2e relecture : ne pas écrire « no cloning access » tant que ce n'est pas vérifié en jeu) and "Clonexadone: Cryoxadone + Sodium, with Plasma as catalyst." Update the disclaimer (more reactions exist now).

## Chief Medical Officer — `.../Medical_roles/Chief-Medical-Officer.md` ↔ `Occupations/Medical/Chief Medical Officer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Chief Medical Officer | `displayName: Chief Medical Officer` | JUSTE |
| Département | Medical | `jobCategory: 3` ; chef (`headOccupations`) de Medical.asset | JUSTE |
| Supérieur | « shares authority » sur le Geneticist avec le RD | Pas de hiérarchie codée ; CMO est chef de Medical, RD chef de Research | À VÉRIFIER EN JEU |
| Accès | « Medbay » seulement | `issuedClearance` : Cmo(37), Chemistry(32), Eva(17), ExternalAirlocks(13), Genetics(9), Heads(18), KeycardAuth(52), MaintTunnels(12), Medical(5), Morgue(6), Psychology(61), SecDoors(55), Surgery(40), Virology(36) ; faible population : Research(42), Rnd(7) | PÉRIMÉ ✔ (très incomplet) |
| Équipement | non cité | ChiefMedicalOfficerPopulator : labcoat CMO, jumpsuit CMO, gants nitrile, MedicalHUD, headset CMO, PDA CMO, sac Medical, ID argent | ABSENT ✔ (page) |
| Description courte | — | `Coordinate Doctors / Save lives / Do regular check-ups` | JUSTE (cohérent) |
| Limite | non citée | `limit: 1` | — |
| Difficulté | Extreme | `difficulty: 2` (Medium) | FAUX ✔ (enum `Occupation.OccupationDifficulty` : Zero=0, Low=1, Medium=2, High=3, Extreme=4) |
| « Seuls le CMO et le Geneticist ont accès au cloneur » | oui | Genetics(9) est aussi donné au Research Director ; aucune clearance « Cloning » | FAUX ✔ (au moins le RD, qui a Genetics(9) ; en plus, sur plusieurs cartes le cloneur est derrière des sas Medical (5), donc ouvert à tout le personnel médical) |
| « Cloneur / morgue / psychologie » dans le texte | existent | Genetics, Morgue, Psychology dans l'accès | JUSTE |
| Autorité sur « Department Head unfit for duty », conseils de crise | RP | — | À VÉRIFIER EN JEU |

Proposition : "Difficulty: Medium." "Access: Medical, Morgue, Surgery, Chemistry, Virology, Genetics, Psychology, CMO, Heads, EVA, Maintenance, Security doors, Keycard authentication."

## Medical Doctor — `.../Medical_roles/Medical-Doctor.md` ↔ `Occupations/Medical/Medical Doctor.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Medical Doctor | `displayName: Medical Doctor` | JUSTE |
| Département | Medical | `jobCategory: 3` | JUSTE |
| Accès | Medbay, Cloning, Morgue, Surgery | `0d 05 06 28` = ExternalAirlocks, Medical(5), Morgue(6), Surgery(40) ; faible pop. : Chemistry(32). Pas de « Cloning » | PÉRIMÉ ✔ (Chemistry en faible pop. absent) |
| Accès « Cloning » | listé | Pas de clearance Cloning ; salle derrière des sas Medical (5) sur la plupart des cartes, que le médecin a | À VÉRIFIER EN JEU (corrigé : le rapport le donnait pour inexistant ; la salle est probablement accessible, voir l'en-tête) |
| Équipement | « first aid kits, medibelts… » | MedicalDoctorPopulator : jumpsuit médecin, labcoat, gants latex, headset Medical, WhiteShoes, sac Medical, PDAMedical, ID. Pas de kit ni de ceinture de départ | À VÉRIFIER EN JEU (trousses trouvées en salle) |
| Description courte | — | `Save lives / Look for victims / Scan everyone in sight` | À VÉRIFIER EN JEU |
| Limite | non citée | `limit: 5` | — |
| Difficulté | Medium | `difficulty: 2` | JUSTE |
| Santé 100, critique sous 0, mort à -100 | oui | `HealthV2/Living/LivingHealthMasterBase.cs` : commentaire « -100 is dying/dead », tests `< -100` | JUSTE (approx.) |
| Bruise pack / ointment : 40 de soin par usage | 40 | `Items/Medical/HealsTheLiving.cs` : `HealDamage(null, 40, healType, bodyPart…)` ; prefabs Bruise Pack (healType 0) et Ointment (healType 1) | JUSTE |
| CPR : 5 secondes | 5 s | `Health/CPRable.cs` : `CPR_TIME = 5` | JUSTE |
| Clonage : « 10~15 secondes » | 10-15 s | `Objects/Medical/CloningPod.cs` : `internalCloningTime = 180` et même valeur dans `Prefabs/Objects/Medical/Cloning Pod.prefab` (divisée par le multiplicateur des composants de la machine) | FAUX ✔ (180 s par défaut ; relu : la carte ne change pas la valeur, `RefreshParts` fait `CloningTime = internalCloningTime / multiplicateur`, où le multiplicateur est le tier moyen des Manipulators (trait `UpgradePart`, `Machine.GetCertainPartMultiplier`) : tier 1 → 180 s, tier 2 → 90 s, tier 4 → 45 s ; durée réelle à chronométrer en jeu) |
| Dégâts de clonage | « cellular damage » | `internalLimbCloningDamage = 25`, `DamageType.Clone` | JUSTE |
| Chirurgie : outils (Scalpel, Circular Saw, Cautery, Drill, Retractor, Gauze, Hemostat), « Saw et Hemostat ne font rien » | oui | Non vérifié dans le code des procédures | À VÉRIFIER EN JEU |
| Chirurgie : séquences d'outils, alt+clic | séquences | idem | À VÉRIFIER EN JEU |
| Cloner : « DNA scanner », « il faut un cerveau », record | oui | `CloningConsole.cs`, `DNAScanner.cs`, statuts `CloneableStatus` | JUSTE (principe) |
| Charcoal pills, médibelts, vendeur médical | existent | `Prefabs/Items/Medical/Basic Treatments/Charcoal Pill.prefab` | JUSTE |

Proposition : "Access: Medical, Morgue, Surgery (and Chemistry when the station is low-pop)." "Cloning takes 3 minutes (180 s) with basic parts; better manipulators shorten it (90 s at tier 2, 45 s at tier 4)."

## Paramedic — `.../Medical_roles/Paramedic.md` ↔ `Occupations/Medical/Paramedic.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Paramedic | `displayName: Paramedic` | JUSTE |
| Département | Medical | `jobCategory: 3` | JUSTE |
| Accès | Medbay, Morgue, maintenance | `1f 0d 0c 05 06 28` = Construction(31), ExternalAirlocks(13), MaintTunnels(12), Medical(5), Morgue(6), Surgery(40) | PÉRIMÉ ✔ (Surgery et Construction absents) |
| Accès EVA (section traître) | « access to EVA » | Pas d'Eva(17) dans `issuedClearance` | FAUX ✔ |
| Équipement | « toujours un kit, ceinture, lit roulant » | ParamedicPopulator : ceinture MedicalBeltFull, veste et casquette de paramédic, gants nitrile, BlueShoes, PDAMedical (sac), Penlight, sac Medical, headset Medical, ID. Pas de kit ni de lit roulant | À VÉRIFIER EN JEU |
| Description courte | — | `Heal minor wounds / Rush the dying and dead to medbay / Search for and rescue injured crewmates` | JUSTE (cohérent) |
| Limite | non citée | `limit: 2` | — |
| Difficulté | « Medium to High » | `difficulty: 1` (Low) | FAUX ✔ |
| « Rang égal, ordres du CMO et du Capitaine seulement » | RP | Pas de hiérarchie en code | À VÉRIFIER EN JEU |

Proposition : "Difficulty: Low. Access: Medical, Morgue, Surgery, Construction, Maintenance. No EVA access."

## Psychologist (Psychiatrist en jeu) — `.../Medical_roles/Psychologist.md` ↔ `Occupations/Medical/Psychiatrist.asset`
(Titre déjà traité par #382.)
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Psychologist | `displayName: Psychiatrist` | FAUX ✔ (traité par #382, non remonté) |
| Département | « Medical/Service », « nominalement Service » | `jobCategory: 3` (Medical) ; membre de Medical.asset | FAUX ✔ (« Service » ; relu : Psychiatrist est dans `Departments/Medical.asset`, absent de `Service.asset`) |
| Accès | Medbay, Psychology Office | `0d 0c 05 3d` = ExternalAirlocks, MaintTunnels(12), Medical(5), Psychology(61) | PÉRIMÉ ✔ (Maintenance absent) |
| Équipement | — | Costume noir, LaceupShoes, mallette (Briefcase), Zipties, headset Psychiatry, PDAMedical, sac Medical | ABSENT ✔ (relu : Briefcase, LaceupShoes et Zipties (guid da30de23…) bien dans PsychiatristPopulator) |
| Description courte | écoute, ordonnances | `Prescribe Medicine / Conduct therapy / Restrain the criminally insane` | PÉRIMÉ ✔ (« restreindre » absent de la page) |
| Limite | non citée | `limit: 1` | — |
| Difficulté | « none » | `difficulty: 1` (Low) | FAUX ✔ |
| « Pas lié aux mécaniques du jeu », ordonnances | RP | non vérifiable | À VÉRIFIER EN JEU |

Proposition : "Role type: Medical. Difficulty: Low. Access: Medical, Psychology, Maintenance. Starts with a briefcase and zipties."

## Virologist — `.../Medical_roles/Virologist.md` ↔ `Occupations/Medical/Virologist.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Virologist | `displayName: Virologist` | JUSTE |
| Département | (page vide) | Medical (`jobCategory: 3`) | ABSENT ✔ |
| Accès / équipement | rien | Virology(36), Medical(5), Morgue(6), ExternalAirlocks ; VirologistLabcoat, jumpsuit, sac Virology, PDAVirology | ABSENT ✔ |
| Description courte | rien | `Study diseases / Make vaccines / Engineer beneficial viruses` | ABSENT ✔ |
| Limite / difficulté | non citées | `limit: 1`, `difficulty: 3` (High) | — |
| « Le seul virus est la stupidité » | bandeau SCIENCE (#380) | traité par #380 | non remonté |
| Fonctionnalité du métier | « ne peut rien faire » | À VÉRIFIER EN JEU |  À VÉRIFIER EN JEU |

Proposition : Fill the page with access (Medical, Morgue, Virology), starting gear and the in-game short description once the role is confirmed functional.

## Geneticist — `.../Medical_roles/Geneticist.md` ↔ `Occupations/Medical/Geneticist.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Geneticist | `displayName: Geneticist` | JUSTE |
| Département | Medical (décision mainteneurs) | Jeu : Research (`Departments/Research.asset` contient le guid 086b1243…, qui est le `.meta` de Geneticist.asset) ; mais `jobCategory: 3` (Medical) dans l'asset | À signaler seulement |
| Accès / équipement | rien | `0d 09 05 06 2a 07` = ExternalAirlocks, Genetics(9), Medical(5), Morgue(6), Research(42), Rnd(7) ; labcoat et jumpsuit Genetics, sac Genetics, Mutation Grabber, headset MedicalScience | ABSENT ✔ |
| Description courte | rien | `Alter genomes / Make DNA backups / Turn humans into monkey` | ABSENT ✔ |
| Limite / difficulté | non citées | `limit: 2`, `difficulty: 2` | — |
| « Laughing stock » | blague | — | non jugé |

Proposition : Add access (Genetics, Medical, Morgue, Research, Rnd) and the starting items.

## Research Director — `docs/3_HowToPlay/Jobs/Science_roles/Research-Director.md` ↔ `Occupations/Science/Research Director.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Research Director | `displayName: Research Director` | JUSTE |
| Département | (non dit) | `jobCategory: 5` (Science), chef de Research.asset | ABSENT ✔ |
| Accès | rien | AIUpload, Construction, Eva, ExternalAirlocks, Genetics, Heads, KeycardAuth, MaintTunnels, Rd(29), Research, Rnd, Robotics, TechStorage, Toxins, ToxinsStorage, Xenobiology ; faible pop. : Engine(10) (oublié par le 1er rapport) | ABSENT ✔ |
| Équipement | rien | ResearchDirector vest suit, labcoat, sac Science, headset RD, PDA RD, ArtifactsDetector, ID argent | ABSENT ✔ |
| Description courte | rien | `Supersive your researchers / Keep robots from going rogue / Advocate for SCIENCE!` | ABSENT ✔ |
| Limite / difficulté | non citées | `limit: 1`, `difficulty: 3` (High) | — |
| Citation « slime captain » | blague | — | non jugé |

Proposition : Add role info (department head of Research, access list, starting gear).

## Roboticist — `.../Science_roles/Roboticist.md` ↔ `Occupations/Science/Roboticist.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Roboticist | `displayName: Roboticist` | JUSTE |
| Département | Science | `jobCategory: 5`, membre de Research.asset | JUSTE |
| Accès | Robotics, Science, Maintenance | `1f 0d 07 1c 2a 08 3e` = Construction(31), ExternalAirlocks, Rnd(7), Robotics(28), Research(42), Toxins(8), ToxinsStorage(62) ; faible pop. : Engine(10). Pas de MaintTunnels | FAUX ✔ (Maintenance) |
| Équipement | non cité | RoboticistsJumpsuit, ToolbeltFull, PDARoboticist, sac Science, headset Science | ABSENT ✔ |
| Description courte | « faire des robots » | `Create cyborgs / Create various robots / Build powerful exosuits` | PÉRIMÉ ✔ (cyborgs, exosuits absents de la page) |
| Limite | non citée | `limit: 2` | — |
| Difficulté | Easy | `difficulty: 1` (Low) | JUSTE |
| « Trois robots possibles » (Floor, Cleaning, Medical) | 3 | `Prefabs/Items/Spawners/Player/Simplebots/` : Blueprint CleanBot, FloorBot, MedBot, **Firebot**, **Securitron** ; `Prefabs/Mobs/Bot/Resources/Construction/` : Firebot et Securitron Assembly | PÉRIMÉ ✔ (preuve corrigée : les « Blueprint* » de `Spawners/Player/Simplebots` sont des modèles d'apparition de personnage (`CharacterSheet`), pas des plans de construction. La vraie preuve : `Mobs/Bot/Resources/` contient une Assembly, un Body et un Controller pour Cleanbot, Floorbot, Medbot, Firebot et Securitron ; le Firebot se démarre depuis un extincteur (`FireExtinguisher.prefab` référence FirebotAssembly) ; Cleanbot, Floorbot et Medibot Assembly sont aussi vendues dans `Cargo/Orders/Science/Robotics Assembly Crate.asset`. L'objet qui démarre le Securitron n'a pas été trouvé (le casque de sécurité ne le référence pas) : sa construction est À VÉRIFIER EN JEU) |
| « Medical bots ne font rien » | oui | `Prefabs/Mobs/Bot/.../MedBotController.prefab` existe, sons medbot présents | À VÉRIFIER EN JEU |
| « Seule machine : Exosuit Fabricator » | oui | `Objects/ExosuitFabricator.cs` existe ; autres machines non recherchées | À VÉRIFIER EN JEU |
| Chiffres : 50 tôles = 100K fer, 10 dalles par floorbot, étapes de montage | oui | non vérifiés | À VÉRIFIER EN JEU |
| « Mechs géants (eventually) » | futur | clearances MechScience/MechMedical… existent ; non vérifié | À VÉRIFIER EN JEU |
| Étape « Congratulations, Clean bot » (floorbot) | texte | erreur de rédaction interne | À VÉRIFIER EN JEU |

Proposition : "Access: Robotics, Research, Rnd, Toxins, Construction (no maintenance)." "Robots: floor, cleaning, medical and fire bots can be built (a securitron assembly also exists, to check in game)."

## Scientist — `.../Science_roles/Scientist.md` ↔ `Occupations/Science/Scientist.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Scientist | `displayName: Scientist` | JUSTE |
| Département / accès / équipement | rien (bandeau #380) | Science ; `0d 07 2a 08 3e 2f` = ExternalAirlocks, Rnd, Research, Toxins, ToxinsStorage, Xenobiology(47) ; faible pop. Robotics(28) ; ScientistsJumpsuit, labcoat, ArtifactsDetector, sac Science, PDAScientist | ABSENT ✔ |
| Description courte | rien | `Do experiments / Make scientific discoveries / Break spacetime` | ABSENT ✔ |
| Limite / difficulté | non citées | `limit: 5`, `difficulty: 2` | — |

Proposition : Add access, limit 5 and starting items.

## XenoBiologist — `.../Science_roles/XenoBiologist.md` ↔ (aucun asset)
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Existence du métier | page « Xenobiologist » | Aucun asset « Xenobiologist » dans `Occupations/**` ; seule la clearance `Xenobiology`=47 existe (Scientist, Research Director) | FAUX ✔ (page sans métier correspondant ; relu : aucun `.asset` d'Occupations ne contient « xeno ») |
| Contenu | guide « Xenoarcheology » | Titre H1 « Xenoarcheology », syntaxe MediaWiki (`[[File:…]]`, `{| class="wikitable"`) non convertie : s'affiche cassée | FAUX ✔ (format) |
| Artefacts / machines | Artifact Research Console, Artifact Analyzer, sample container, data disk (10 000 crédits pour un disque parfait), artefacts dormants/Nitrous Oxide/uranium | Existent dans le dépôt (`Prefabs/Objects/Consoles/ArtifactResearchConsole.prefab`, `Items/Research/ArtifactSample.prefab`, `Circuitboard/MachineBoards/MachineBoardArtifactAnalyser`) ; valeurs (10 000, mutations, 10 %) non vérifiées | À VÉRIFIER EN JEU |

Proposition : Rename/convert as a Xenoarchaeology guide (it is not a job), convert the MediaWiki syntax.

---

## Métiers du jeu sans page dans le périmètre
Aucun : les 10 assets (Chemist, Chief Medical Officer, Geneticist, Medical Doctor, Paramedic, Psychiatrist, Virologist, Research Director, Roboticist, Scientist) ont une page. Le seul « absent » est une page sans métier (XenoBiologist).

## Non vérifié
Procédures de chirurgie, effets par tick des réactions (`Reactions/Body/*`), ratios exacts, recettes de robots (nombre de dalles, tôles), hiérarchie « ordres », contenu des kits/ceintures, comportement des machines hors code Unity. La résolution de certains prefabs d'équipement (gilet du Médecin, lunettes du Paramédic, ceinture du Généticien) n'a pas abouti (guid non résolus).
