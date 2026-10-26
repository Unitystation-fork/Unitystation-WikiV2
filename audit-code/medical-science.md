# Audit medical-science — wiki contre le code du jeu (develop, 2026-10-26)

Vérifié par une 2e relecture : 35 verdicts confirmés, 2 corrigés, 2 passés en À VÉRIFIER EN JEU (la partie « Cloning » des accès Chemist et Medical Doctor ; les verdicts FAUX/PÉRIMÉ de ces lignes tiennent pour le reste ; preuve des robots corrigée sans changer le verdict) (les 35 FAUX/PÉRIMÉ/ABSENT relus un par un ; 7 JUSTE sur 27 recontrôlés, tous confirmés : CPR 5 s, soin 40, dégâts de clonage 25, Kelotane C+Si, difficultés Chemist/Roboticist, Charcoal Pill).

3e passe : 16 lignes À VÉRIFIER tranchées (A+B, dont 2 cas à double verdict : l'accès « Cloning » du Chemist et la construction du Securitron dans la ligne « Trois robots possibles »), 8 restent (C : 6 — supérieur du Chemist, description RP du Chemist, supérieur du CMO sur le Geneticist, autorité du CMO (conseils de crise), rang du Paramedic, ordonnances du Psychologue ; D : 2 — effets chiffrés des réactifs, métier de Virologist jouable de bout en bout). Tranchées : accès « Cloning » du Chemist et du Medical Doctor (portes médicales par défaut, JUSTE en pratique), lunettes du Chemist (JUSTE, mais pas « comme le barman ») et béchers (JUSTE), ratios des recettes (JUSTE, sauf Universal Enzyme absent du jeu), équipement du Medical Doctor (kit et ceinture dans son casier), description du Medical Doctor, outils de chirurgie (Hemostat FAUX « ne fait rien », Saw JUSTE) et séquences (JUSTE), équipement du Paramedic (ceinture JUSTE, kit et lit sur les cartes), 5 lignes de Roboticist (Securitron = casque pare-balles + signaleur ; Medibot soigne ; machines PÉRIMÉ ; 50 tôles JUSTE ; mechas JUSTE ; faute « Clean bot » FAUX), valeurs de Xenoarcheology (10 000 JUSTE, ±20 % au lieu de 10 % FAUX).
Vérif. 3e passe : 21 confirmés, 3 corrigés (Universal Enzyme : la recette du wiki est FAUSSE mais le réactif existe, il n'est pas « absent du jeu » ; Mannitol : le soin du cerveau est JUSTE, l'effet ne vise que les organes portant le trait `Brain` ; Xenoarcheology : il n'y a plus de « data disk », la console imprime un rapport papier `AnomalyReport`, PÉRIMÉ). Résumé inchangé par la vérification (le premier verdict de chaque ligne ne bouge pas).
Résumé (recompté ligne par ligne après la 3e passe, sur le premier verdict de chaque ligne) : 11 pages, 98 lignes : 37 JUSTE, 15 FAUX, 10 PÉRIMÉ, 14 ABSENT, 8 À VÉRIFIER EN JEU (6 hors du code, 2 comportement en partie), 14 lignes sans verdict (limites, difficultés non citées, « non jugé », « à signaler »). Avant la 3e passe, même méthode : 27 JUSTE, 12 FAUX, 9 PÉRIMÉ, 14 ABSENT, 22 À VÉRIFIER (24 lignes portant la mention : la partie « Cloning » de l'accès du Chemist en plus).

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
| Supérieur | CMO « commande » les chimistes (page CMO) | Le jeu ne définit pas de hiérarchie ; le CMO est seulement chef du département Medical | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : le jeu ne code aucune chaîne de commandement, seulement le chef de département dans `Departments/Medical.asset`) ✔ |
| Accès | Medbay, Cloning, Morgue, Chemistry lab, Maintenance | `issuedClearance: 20000000 0d000000 05000000 06000000` = Chemistry(32), ExternalAirlocks(13), Medical(5), Morgue(6). Pas de MaintTunnels(12), pas de « Cloning » dans l'enum. `Cloning Pod` posé sur 9 cartes (aucun sur CaveStation). Portes à moins de 7 cases du cloneur (clearance donnée par le prefab, ou par la carte quand elle la change) : `AirlockMedicalWindowed`/`Opaque` sans surcharge, donc Medical (5) par défaut, sur BoxStation, FallStation, MiniStation, OutpostStation, PogStation, SquareStation, StarshipStation, UnRealStation ; Genetics seul sur quelques portes (Box, Fall, Mini, UnReal), Surgery seul sur d'autres (Square, UnReal), Morgue seul sur d'autres (Fall, Pog) ; GateStation : portes Surgery/Security/Robotics ou boutons Medical/Security. Mesure par proximité (≤ 7 cases), sans calcul de la salle fermée | FAUX ✔ (Maintenance) ; « Cloning » JUSTE en pratique (3e passe : le Chemist a Medical (5) et passe donc les portes médicales par défaut du cloneur sur 8 cartes sur 9 qui en ont un ; il n'a ni Genetics ni Surgery, donc les portes Genetics seules et Surgery seules lui restent fermées ; GateStation : à essayer, portes Surgery/Security/Robotics ou boutons Medical) ✔ (vérif. 3e passe : accès du Chemist relu ; limite connue : mesure par proximité, pas par salle fermée) |
| Équipement | Lunettes « comme celles du barman », béchers | `Inventory/Populators/Occupations/ChemistPopulator.asset` : ScienceGoggles (yeux), ChemistsJumpsuit, ChemistLabcoat, WhiteShoes, ChemistryBackpack, headset Medical, PDAChemist, ID. Pas de bécher dans l'équipement de départ (ils sont dans le bureau) | JUSTE en partie (3e passe : lunettes JUSTE : `ScienceGoggles.prefab` porte le trait `ScienceScan` et le composant `ReagentScanner` ; clic droit « Contents » sur un récipient liste ses réactifs (`ReagentContainer.cs` l.601-607) ; « comme celles du barman » FAUX : les `BeerGoggles` du barman (variante de `Sunglasses`) n'ont pas ce trait ; béchers JUSTE : `BoxOfBeakers` posée sur 9 des 10 cartes, de 2 à 6 par carte, aucune lue sur BoxStation (223 PrefabID non résolus), et le Chemist n'en a pas au départ) ✔ (vérif. 3e passe : trait `ScienceScan` présent dans `ScienceGoggles.prefab`, absent de `BeerGoggles.prefab` ; `ReagentScanner` sur `ScienceGoggles` ; `BoxOfBeakers` comptées : Cave 2, Fall 4, Gate 3, Mini 4, Outpost 6, Pog 5, Square 3, Starship 3, UnReal 2, Box 0) |
| Description courte | Page : faire meth, explosifs, etc. | `descriptionShort: Mess with chemicals / Produce pills and medicine / craft other substances` ; `descriptionLong` : « Do not make lube grenades or transform your workplace into a drug lab » | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : ton de jeu de rôle ; le jeu fixe seulement `descriptionShort` et `descriptionLong`, il ne limite aucune recette) ✔ |
| Limite | non citée | `limit: 2` | — |
| Difficulté | Medium | `difficulty: 2` (Medium) | JUSTE |
| Recettes (section Chemistry) | Lube = O + Si + eau ; Antitoxin = N+Si+K ; Bicaridine = C+O+sucre ; Kelotane = C+Si ; Tricordrazine = Antitoxin+Bicaridine+Kelotane ; Cryoxadone = Plasma stable+Acétone+Mutagène instable ; Mannitol = sucre+H+eau ; Styptic = Al+H+O+acide sulfurique ; Silver sulf. = NH3+Ag+S+O+Cl ; Synthflesh = sang+C+Styptic ; Impedrezene = Hg+O+sucre ; Mutagène = Cl+P+Ra ; Space cleaner = eau+ammoniac ; Ammoniac = N+H ; Acétone = huile+welding fuel+O ; Laughter = jus de banane+sucre ; Potassium+eau explose ; Pest/Plant-B-Gone/Weed killer = Toxin + Ethanol/eau/ammoniac | `ScriptableObjects/Chemistry/Reactions/**` : ingrédients identiques pour toutes ces recettes (noms résolus par guid) | JUSTE (ingrédients) |
| Clonexadone | Cryoxadone + Sodium | `Reactions/Medicine/Clonexadone.asset` : Cryoxadone + Sodium **avec catalyseur Plasma** (guid 3f8ba0db… = `Reagents/Toxin/Plasma`, valeur 5) | PÉRIMÉ ✔ (catalyseur absent ; relu : `catalysts` = Plasma, valeur 5, et `Reaction.cs` refuse la réaction si le catalyseur manque. Il n'est pas consommé) |
| Ratios « 1 part », « 3 part Hydrogen », « 4 part Ethanol » | ratios précis | `Reactions/**` décodés (valeurs entières) : Lube Water 1 + Silicon 1 + Oxygen 1 → SpaceLube 4 ; Antitoxin N 1 + Si 1 + K 1 → 3 ; Bicaridine C 1 + O 1 + Sugar 1 → 3 ; Kelotane C 1 + Si 1 → 2 ; Tricordrazine 1 + 1 + 1 → 3 ; Cryoxadone StablePlasma 1 + Acetone 1 + UnstableMutagen 1 → 3 ; Mannitol 1 + 1 + 1 → 3 ; PotassiumIodide K 1 + I 1 → 2 ; Silver sulfadiazine 1 ×5 → 5 ; Styptic 1 ×4 → 4 ; Synthflesh 1 ×3 → 3 ; Impedrezene 1 ×3 → 2 ; Mutagène Ra 1 + P 1 + Cl 1 → 3 ; Space cleaner Ammonia 1 + Water 1 → 2 ; Ammoniac Hydrogen 3 + Nitrogen 1 → 3 ; Acétone Oil 1 + Welding fuel 1 + O 1 → 3 ; Laughter Sugar 1 + Banana juice 1 → 10 ; Pest killer Toxin 1 + Ethanol 4 → 5 ; Plant-B-Gone Toxin 1 + Water 4 → 5 ; Weed killer Toxin 1 + Ammonia 4 → 5 | JUSTE (3e passe : tous les ratios « 1 part », « 3 part Hydrogen » et « 4 part Ethanol/Water/Ammonia » du wiki correspondent aux assets. Une exception hors de cette ligne : « Universal Enzyme = Ethanol + Welding fuel » n'a aucune réaction dans `Reactions/**` (l'enzyme n'y sert que de catalyseur), donc ABSENT du jeu) ✔ pour les ratios (vérif. 3e passe : les 20 réactions redécodées une à une, ingrédients et quantités identiques, `PotassIodide.asset` = K 1 + I 1 → 2) ; Universal Enzyme corrigé : recette FAUX, mais le réactif n'est pas absent du jeu (vérif. 3e passe : aucune réaction n'a `UniversalEnzyme` en résultat ; le réactif `Reagents/Food/UniversalEnzyme.asset` existe, en bouteille `BottleEnzyme.prefab` et en condiment `Food/Condiment/UniversalEnzyme.prefab`, et sert de catalyseur à 14 réactions (bière, vin, vodka, fromage, tofu…) ; « Ethanol + Welding fuel » ressemble à `Hooch.asset` : Ethanol 2 + Welding fuel 1, catalyseur enzyme 1 → Hooch 3) |
| Effets chiffrés (« heals 1 random toxin damage per tick », « 0.2 clone », « 2 brain », etc.) | valeurs par tick | `Reactions/Body/*InBody.asset` décodés. `BodyHealthEffect.cs` : soin = `AttackBodyPartPerOneU` × unités traitées par la partie du corps (`ReagentMetabolism` × `BloodThroughput` × `CurrentBloodSaturation` × `ReagentMetabolismMultiplier`), appliqué aux parties blessées (pas au hasard). Types (`DamageType` : Brute 0, Burn 1, Tox 2, Oxy 3, Clone 4, Stamina 5, Radiation 6) : Antitoxin Tox −3 ; Bicaridine Brute −3 ; Kelotane Burn −3 ; Tricordrazine Burn/Brute/Tox −3 chacun (multiplicateur 0,3) ; Clonexadone Clone −3 ; Cryoxadone Burn/Brute/Tox/Oxy/Stamina −3 et Clone −0,6, pas de Radiation ; Mannitol Brute/Clone/Burn/Tox −2, aucun type « brain » ; PotassiumIodide Radiation −10 ; Impedrezene Tox +3 ; Pest killer, Plant-B-Gone, Weed killer Tox +1 | À VÉRIFIER EN JEU (comportement en partie) (3e passe : les types de dégâts du wiki sont JUSTES pour Antitoxin, Bicaridine, Kelotane, Tricordrazine, Clonexadone, Cryoxadone et Impedrezene, et le rapport « 0.2 clone » de la Cryoxadone aussi (−0,6 contre −3) ; mais les chiffres « par tick » ne se lisent plus : le soin dépend de la quantité métabolisée ; « random » PÉRIMÉ (les parties blessées sont visées) ; « 2 brain » du Mannitol FAUX (aucun soin de cerveau dans l'asset) [corrigé par la vérif., voir fin de ligne] ; PotassiumIodide −10 et Pest killer/Plant-B-Gone/Weed killer +1 contre 0,1 du wiki ; le rythme réel se chronomètre en jeu) (vérif. 3e passe, corrigé : « 2 brain » du Mannitol est JUSTE : `MannitolInBody.asset` a `InternalAllRequired` = traits `Implantable` + `Brain` (guid d959db3d… = `Traits/Implants/Brain.asset`), et `ChemicalMetabolismSystem.cs` l.137 ne garde que les organes qui ont tous ces traits ; il soigne donc le cerveau, −2 Brute, Burn, Tox et Clone, sans Radiation, comme dit le wiki. Le reste de la ligne confirmé : `PotassiumIodideInBody` Radiation (6) −10, Pest/Plant-B-Gone/Weed killer Tox +1, `CryoxadoneInBody` Clone −0,6) |
| Disclaimer rouge « all others turn to ash » | indique que seules ces recettes marchent | Le dépôt contient d'autres réactions (`Reactions/Pyrotechnics`, `Toxins`, etc.) | PÉRIMÉ ✔ |

Proposition : "Access: Medical, Morgue, Chemistry, External airlocks (no maintenance)." (2e relecture : ne pas écrire « no cloning access » tant que ce n'est pas vérifié en jeu) and "Clonexadone: Cryoxadone + Sodium, with Plasma as catalyst." Update the disclaimer (more reactions exist now). (vérif. 3e passe) "Universal Enzyme cannot be made by chemistry: it comes in enzyme bottles and condiment packs."

## Chief Medical Officer — `.../Medical_roles/Chief-Medical-Officer.md` ↔ `Occupations/Medical/Chief Medical Officer.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Chief Medical Officer | `displayName: Chief Medical Officer` | JUSTE |
| Département | Medical | `jobCategory: 3` ; chef (`headOccupations`) de Medical.asset | JUSTE |
| Supérieur | « shares authority » sur le Geneticist avec le RD | Pas de hiérarchie codée ; CMO est chef de Medical, RD chef de Research | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : seul le chef de département est codé (CMO = Medical, RD = Research) ; le Geneticist est même rangé dans Research) ✔ |
| Accès | « Medbay » seulement | `issuedClearance` : Cmo(37), Chemistry(32), Eva(17), ExternalAirlocks(13), Genetics(9), Heads(18), KeycardAuth(52), MaintTunnels(12), Medical(5), Morgue(6), Psychology(61), SecDoors(55), Surgery(40), Virology(36) ; faible population : Research(42), Rnd(7) | PÉRIMÉ ✔ (très incomplet) |
| Équipement | non cité | ChiefMedicalOfficerPopulator : labcoat CMO, jumpsuit CMO, gants nitrile, MedicalHUD, headset CMO, PDA CMO, sac Medical, ID argent | ABSENT ✔ (page) |
| Description courte | — | `Coordinate Doctors / Save lives / Do regular check-ups` | JUSTE (cohérent) |
| Limite | non citée | `limit: 1` | — |
| Difficulté | Extreme | `difficulty: 2` (Medium) | FAUX ✔ (enum `Occupation.OccupationDifficulty` : Zero=0, Low=1, Medium=2, High=3, Extreme=4) |
| « Seuls le CMO et le Geneticist ont accès au cloneur » | oui | Genetics(9) est aussi donné au Research Director ; aucune clearance « Cloning » | FAUX ✔ (au moins le RD, qui a Genetics(9) ; en plus, sur plusieurs cartes le cloneur est derrière des sas Medical (5), donc ouvert à tout le personnel médical) |
| « Cloneur / morgue / psychologie » dans le texte | existent | Genetics, Morgue, Psychology dans l'accès | JUSTE |
| Autorité sur « Department Head unfit for duty », conseils de crise | RP | — | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : rôle-play et conseils de crise, aucun fichier du dépôt) ✔ |

Proposition : "Difficulty: Medium." "Access: Medical, Morgue, Surgery, Chemistry, Virology, Genetics, Psychology, CMO, Heads, EVA, Maintenance, Security doors, Keycard authentication."

## Medical Doctor — `.../Medical_roles/Medical-Doctor.md` ↔ `Occupations/Medical/Medical Doctor.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Medical Doctor | `displayName: Medical Doctor` | JUSTE |
| Département | Medical | `jobCategory: 3` | JUSTE |
| Accès | Medbay, Cloning, Morgue, Surgery | `0d 05 06 28` = ExternalAirlocks, Medical(5), Morgue(6), Surgery(40) ; faible pop. : Chemistry(32). Pas de « Cloning » | PÉRIMÉ ✔ (Chemistry en faible pop. absent) |
| Accès « Cloning » | listé | Pas de clearance Cloning dans l'enum. `Cloning Pod` posé sur 9 cartes (aucun sur CaveStation). Portes à moins de 7 cases du cloneur (clearance donnée par le prefab, ou par la carte quand elle la change) : `AirlockMedicalWindowed`/`Opaque` sans surcharge, donc Medical (5) par défaut, sur BoxStation, FallStation, MiniStation, OutpostStation, PogStation, SquareStation, StarshipStation, UnRealStation ; Genetics seul sur quelques portes (Box, Fall, Mini, UnReal), Surgery seul sur d'autres (Square, UnReal), Morgue seul sur d'autres (Fall, Pog) ; GateStation : portes Surgery/Security/Robotics ou boutons Medical/Security. Mesure par proximité (≤ 7 cases), sans calcul de la salle fermée | JUSTE en pratique (3e passe : le médecin a Medical (5), Morgue (6) et Surgery (40), donc passe toutes les portes Medical par défaut, Morgue seul et Surgery seul autour du cloneur ; seules les portes Genetics seules lui restent fermées ; pas de cloneur sur CaveStation) ✔ |
| Équipement | « first aid kits, medibelts… » | MedicalDoctorPopulator : jumpsuit médecin, labcoat, gants latex, headset Medical, WhiteShoes, sac Medical, PDAMedical, ID. Pas de kit ni de ceinture de départ | JUSTE (3e passe : le wiki dit que les médecins ont « accès » aux kits, pas qu'ils les portent. `Closets/Doctor.asset` (contenu de `MedicalDoctorsLocker`) = `FirstAidKit` + `MedicalBeltFull` + `Defibrillator` + `MedicalHUD` + gants nitrile + headset médical ; casier posé sur 9 cartes (2 à 5 par carte, aucun sur CaveStation) ; `FirstAidKit` et `RandomMedkitSpawner` aussi posés partout) ✔ (vérif. 3e passe : `Closets/Doctor.asset` résolu ; `MedicalDoctorsLocker` compté : Box 2, Fall 3, Gate 2, Mini 3, Outpost 5, Pog 5, Square 2, Starship 4, UnReal 5, Cave 0) |
| Description courte | — | `Save lives / Look for victims / Scan everyone in sight` | JUSTE (3e passe : le wiki n'affirme rien là-dessus ; la description du jeu est cohérente avec le rôle) ✔ |
| Limite | non citée | `limit: 5` | — |
| Difficulté | Medium | `difficulty: 2` | JUSTE |
| Santé 100, critique sous 0, mort à -100 | oui | `HealthV2/Living/LivingHealthMasterBase.cs` : commentaire « -100 is dying/dead », tests `< -100` | JUSTE (approx.) |
| Bruise pack / ointment : 40 de soin par usage | 40 | `Items/Medical/HealsTheLiving.cs` : `HealDamage(null, 40, healType, bodyPart…)` ; prefabs Bruise Pack (healType 0) et Ointment (healType 1) | JUSTE |
| CPR : 5 secondes | 5 s | `Health/CPRable.cs` : `CPR_TIME = 5` | JUSTE |
| Clonage : « 10~15 secondes » | 10-15 s | `Objects/Medical/CloningPod.cs` : `internalCloningTime = 180` et même valeur dans `Prefabs/Objects/Medical/Cloning Pod.prefab` (divisée par le multiplicateur des composants de la machine) | FAUX ✔ (180 s par défaut ; relu : la carte ne change pas la valeur, `RefreshParts` fait `CloningTime = internalCloningTime / multiplicateur`, où le multiplicateur est le tier moyen des Manipulators (trait `UpgradePart`, `Machine.GetCertainPartMultiplier`) : tier 1 → 180 s, tier 2 → 90 s, tier 4 → 45 s ; durée réelle à chronométrer en jeu) |
| Dégâts de clonage | « cellular damage » | `internalLimbCloningDamage = 25`, `DamageType.Clone` | JUSTE |
| Chirurgie : outils (Scalpel, Circular Saw, Cautery, Drill, Retractor, Gauze, Hemostat), « Saw et Hemostat ne font rien » | oui | `ScriptableObjects/Surgery/*.asset` : les étapes n'exigent que quatre traits : Scalpel (`30127b…`), Retractor (`1e5559…`), Hemostat (`fc51d6…`), Cautery (`96c07e…`) ; Open = Scalpel, Retractor, Hemostat ; Remove = Scalpel, Hemostat, Scalpel ; Attach et Implant = Scalpel, Hemostat, Retractor puis insertion ; Close = Cautery. Aucun asset de procédure n'utilise `CircularSaw` ni `SurgicalDrill`. `Player_V4(uNet).prefab` `InitiateSurgeryItemTraits` (alt-clic) : Scalpel, Retractor, Hemostat, Cautery, trait d'implant (`d85993…`) et CircularSaw. Bruise pack et Ointment soignent Brute et Burn (`HealBrute/BurnProcedure`, force 15) | FAUX pour l'Hemostat, JUSTE pour la scie (3e passe : l'Hemostat sert dans quatre procédures (ouvrir, retirer, attacher, implanter) ; la Circular Saw ouvre le menu (alt-clic) mais aucune étape ne l'utilise, comme le Surgical Drill, qui ne peut même pas lancer le menu) ✔ (vérif. 3e passe : les guid des traits `CircularSaw` (d77ff6ca…) et `SurgicalDrill` (c91ddc26…) n'apparaissent dans aucun asset de `Surgery/` ; `Hemostat` (fc51d63c…) est dans les 4 procédures citées ; aucun script ne lit ces deux traits) |
| Chirurgie : séquences d'outils, alt+clic | séquences | Voir ligne précédente : `Player_V4(uNet).prefab` `InitiateSurgeryItemTraits` ; `ScriptableObjects/Surgery/genericOpenProcedure`, `GenericRemoveProcedure`, `GenericAttachProcedure`, `GenericImplantProcedure`, `GenericCloseProcedure` | JUSTE (3e passe : ouvrir = Scalpel > Retractor > Hemostat, retirer = Scalpel > Hemostat > Scalpel, attacher/implanter = Scalpel > Hemostat > Retractor, fermer = Cautery, tous identiques au wiki ; le saignement des étapes (`BleedStacksToAdd`) justifie la gaze) ✔ (vérif. 3e passe : traits des 7 assets de `Surgery/` résolus dans l'ordre) |
| Cloner : « DNA scanner », « il faut un cerveau », record | oui | `CloningConsole.cs`, `DNAScanner.cs`, statuts `CloneableStatus` | JUSTE (principe) |
| Charcoal pills, médibelts, vendeur médical | existent | `Prefabs/Items/Medical/Basic Treatments/Charcoal Pill.prefab` | JUSTE |

Proposition : "Access: Medical, Morgue, Surgery (and Chemistry when the station is low-pop)." "Cloning takes 3 minutes (180 s) with basic parts; better manipulators shorten it (90 s at tier 2, 45 s at tier 4)." "The Hemostat is used in surgery (open, remove, attach, implant); the circular saw and the surgical drill have no step."

## Paramedic — `.../Medical_roles/Paramedic.md` ↔ `Occupations/Medical/Paramedic.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Paramedic | `displayName: Paramedic` | JUSTE |
| Département | Medical | `jobCategory: 3` | JUSTE |
| Accès | Medbay, Morgue, maintenance | `1f 0d 0c 05 06 28` = Construction(31), ExternalAirlocks(13), MaintTunnels(12), Medical(5), Morgue(6), Surgery(40) | PÉRIMÉ ✔ (Surgery et Construction absents) |
| Accès EVA (section traître) | « access to EVA » | Pas d'Eva(17) dans `issuedClearance` | FAUX ✔ |
| Équipement | « toujours un kit, ceinture, lit roulant » | ParamedicPopulator : ceinture MedicalBeltFull, veste et casquette de paramédic, gants nitrile, BlueShoes, PDAMedical (sac), Penlight, sac Medical, headset Medical, ID. Pas de kit ni de lit roulant | JUSTE en partie (3e passe : la ceinture `MedicalBeltFull` est bien sur le joueur ; le wiki dit « should at all times carry » (conseil) : le kit et le lit roulant ne sont pas donnés au départ mais se trouvent sur toutes les cartes : `RollerBed` ou `RollerBedItem` sur les 10 cartes, `FirstAidKit` sur 9 (aucun sur GateStation, qui a un `RandomMedkitSpawner`)) ✔ (vérif. 3e passe : `RollerBed` sur les 10 cartes (1 à 6), `FirstAidKit` sur 9, GateStation 0 avec 1 `RandomMedkitSpawner`) |
| Description courte | — | `Heal minor wounds / Rush the dying and dead to medbay / Search for and rescue injured crewmates` | JUSTE (cohérent) |
| Limite | non citée | `limit: 2` | — |
| Difficulté | « Medium to High » | `difficulty: 1` (Low) | FAUX ✔ |
| « Rang égal, ordres du CMO et du Capitaine seulement » | RP | Pas de hiérarchie en code | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : aucune hiérarchie dans `Paramedic.asset`) ✔ |

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
| « Pas lié aux mécaniques du jeu », ordonnances | RP | non vérifiable | À VÉRIFIER EN JEU (règle de serveur / pas dans le code) (3e passe : jeu de rôle ; le jeu ne code ni ordonnance ni thérapie) ✔ |

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
| Fonctionnalité du métier | « ne peut rien faire » | Existent : `Reagents/Pathogens` (SpaceCold, SpaceFlu, SpaceCancer, RedPlague, Paranoia, Vampirism), `Reactions/Sicknesses/*Cure` et `*Reaction`, `PetriDish.prefab` et `BoxOfPetriDishes`, `VirusFoodDispenser.prefab`, `Reactions/Others/VirusFood*` et `MixVirus*`, closet `BioHazardVirology`, cartouches PDA `VirusCartridges`, `PDAVirology`, `EventSickness.cs` (infecte des joueurs au hasard via `CureManager`). Aucun prefab de type pandemic/incubateur/centrifugeuse trouvé | À VÉRIFIER EN JEU (comportement en partie) (3e passe : la phrase « le seul virus est la stupidité » est PÉRIMÉE, six pathogènes et leurs remèdes existent ; mais si le métier est jouable de bout en bout (prélèvement, culture, vaccin) ne se juge qu'en essai : pas de machine de type pandemic dans le dépôt) ✔ |

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
| « Trois robots possibles » (Floor, Cleaning, Medical) | 3 | `Prefabs/Items/Spawners/Player/Simplebots/` : Blueprint CleanBot, FloorBot, MedBot, **Firebot**, **Securitron** ; `Prefabs/Mobs/Bot/Resources/Construction/` : Firebot et Securitron Assembly | PÉRIMÉ ✔ (cinq robots constructibles, pas trois ; preuve corrigée : les « Blueprint* » de `Spawners/Player/Simplebots` sont des modèles d'apparition de personnage (`CharacterSheet`), pas des plans de construction. `Mobs/Bot/Resources/Construction/` : Cleanbot, Floorbot, Medibot, Firebot, Securitron (Assembly + Body + Controller). 3e passe : Securitron = `BulletproofHelmet.prefab` + `RemoteSignaller` (composant `ContainerConstruct`), puis capteur de proximité, puis bras droit ; Firebot = `FireExtinguisher.prefab` + bras gauche ou droit, puis `FirefighterHelmet`, puis capteur ; les Assembly Cleanbot, Floorbot et Medibot sont aussi vendues dans `Cargo/Orders/Science/Robotics Assembly Crate.asset`) ✔ (vérif. 3e passe : `ContainerConstruct` de `BulletproofHelmet.prefab` = `RemoteSignaller` → `SecuritronAssembly` (étapes `ProximitySensor`, `CyborgRightArm`) ; celui de `FireExtinguisher.prefab` = `CyborgLeftArm` ou `CyborgRightArm` (n'importe lequel de la liste, `ContainerConstruct.cs` l.32) → `FirebotAssembly` (étapes `FirefighterHelmet`, `ProximitySensor`)) |
| « Medical bots ne font rien » | oui | `Prefabs/Mobs/Bot/.../MedBotController.prefab` ; `Mobs/BrainAI/States/SimpleBot/MedBotTaskAi.cs` : cherche dans un rayon de 5 cases un équipier avec Brute+Burn > 0, le rejoint (A*), puis `HealDamageOnAll(2, Brute)` et `HealDamageOnAll(2, Burn)` à chaque cycle (`taskPerformDuration`) ; émagué (`IsEmagged`) il inflige 5 Brute au lieu de soigner | FAUX (3e passe : le code d'un Medibot qui soigne existe, 2 Brute et 2 Burn par cycle dans un rayon de 5 cases ; « ne font rien » est PÉRIMÉ. Le rythme réel et le bon fonctionnement du déplacement ne se jugent qu'en essai) ✔ (vérif. 3e passe : `MedBotTaskAi.cs` l.34 et 58-61 relus ; script référencé par `MedBotController.prefab`) |
| « Seule machine : Exosuit Fabricator » | oui | `Objects/ExosuitFabricator.cs` ; cartes (objets à ≤ 10 cases du premier fabricateur) : Exosuit Fabricator sur 8 cartes (1 à 2 par carte ; aucun sur CaveStation ni UnRealStation) ; `ChargingDock` sur 7 cartes (Box, Fall, Gate, Mini, Outpost, Square, Starship) ; `CircuitImprinter` sur 6 cartes (Box, Fall, Outpost, Pog, Square et un `DepartmentCircuitImprinterScience` sur Starship) ; `Prefabs/Objects/Research/` contient aussi `Protolathe`, `TechnologyFabricator` | PÉRIMÉ (3e passe : l'Exosuit Fabricator est la seule machine de fabrication propre à la robotique, mais la salle contient aussi une borne de recharge `ChargingDock` et souvent un `CircuitImprinter`) ✔ |
| Chiffres : 50 tôles = 100K fer, 10 dalles par floorbot, étapes de montage | oui | `Objects/Machines/MaterialStorage.cs` : `Cm3PerSheet = 2000` (50 tôles = 100 000) ; `Items/Storage/Toolboxes/Toolbox.prefab` `ContainerConstruct` : `craftItem` = `FloorTile`, `amount: 10`. Stades (`BotConstruction.stageParts`) : Cleanbot = seau + capteur (`Bucket.prefab`) puis bras droit ; Floorbot = boîte à outils + 10 dalles puis capteur puis bras droit ; Medibot = kit (`FirstAidKit.prefab` : bras gauche ou droit) puis `HealthAnalyzer` puis capteur | JUSTE (3e passe : 50 tôles = 100 000, 10 dalles par floorbot et l'ordre des étapes correspondent ; nuance : le Medibot et le Firebot acceptent aussi le bras gauche, alors que le wiki dit « droit ») ✔ |
| « Mechs géants (eventually) » | futur | clearances MechScience/MechMedical… existent ; non vérifié | JUSTE (3e passe : aucun mécha jouable dans le dépôt, seulement des jouets `Items/Other/Toys/MechPrizes/*` et des clearances `MechMining`…`MechEngine` (85 à 89) ; « eventually » reste exact) ✔ (vérif. 3e passe : seuls `Toys/MechPrizes/*` et `Exosuit Fabricator` ressortent d'une recherche « mech/ripley/durand/exosuit ») |
| Étape « Congratulations, Clean bot » (floorbot) | texte | `FloorbotAssembly.prefab` → `botBlueprint` = `BlueprintFloorBot.prefab` (un robot de sol, pas un Cleanbot) | FAUX (3e passe : faute de rédaction du wiki, la section « Floor bots » se termine par « You now have a Clean bot » ; à corriger en « Floor bot ») ✔ (wiki l.100) |

Proposition : "Access: Robotics, Research, Rnd, Toxins, Construction (no maintenance)." "Robots: floor, cleaning, medical and fire bots can be built (a securitron assembly also exists: bulletproof helmet + remote signaller, then proximity sensor and right arm); medical bots heal 2 brute and 2 burn per cycle."

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
| Artefacts / machines | Artifact Research Console, Artifact Analyzer, sample container, data disk (10 000 crédits pour un disque parfait), artefacts dormants/Nitrous Oxide/uranium | Existent (`ArtifactResearchConsole.prefab`, `ArtifactSample.prefab`, `MachineBoardArtifactAnalyser`). Code : `CargoManager.ResearchReports.cs` : score max = 3 × 1000 (radiation, bluespace, bananium) + 3 × 2000 (effets) + 1000 (type) = 10 000, × `REPORT_SELL_PRICE / 10000` (12500/10000 = 1 en entier) ; rapport déjà enregistré : `sellCost = 1`. `ArtifactSliver.cs` : valeurs × `Random.Range(0.80, 1.20)` (±20 %) ; `Artifact.cs` : 3 à 5 échantillons maximum (`maxSamples`), mécanique = soudeur allumé, organique et géologique = traits dédiés, dormance par Nitrous Oxide (`CheckAtmosphere`) et réveil par `DormantTrigger` = trait Uranium ; `SampleContainer.prefab` = `3SlotStructure`. Armures `Anomaly` : `APHardsuit` 90, `AnomalySuit` 99, `PrototypeHardsuit` 100 | JUSTE en partie (3e passe : JUSTE pour les 10 000 crédits d'un rapport parfait, la dormance au Nitrous Oxide, le réveil à l'uranium, le soudeur pour les artefacts mécaniques, le conteneur à 3 objets, les armures 90 / 99 / 100 ; FAUX pour « les échantillons varient de 10 % » (le code fait ±20 %) et pour « un disque déjà vendu vaut 0 » (il vaut 1)) ✔ pour ±20 % et les 10 000 (vérif. 3e passe : `ArtifactSliver.cs` l.48-50 `Random.Range(0.80f, 1.20f)` « +- 20% accuracy » ; `CalculateAnomalyReportExportCost` l.158-168) ; corrigé pour le support : PÉRIMÉ « data disk » (vérif. 3e passe : `GUI_ArtifactConsole.PrintReport` (l.117-131) imprime un papier `Bureaucracy/Reports/AnomalyReport.prefab` titré « ==ANOMALY REPORT== », et `CargoManager.ParseResearchData` ne lit que des `Paper` ; aucun prefab de disque de données d'artefact dans le dépôt ; un rapport déjà enregistré est renommé « Anomaly report already registered! » et vaut 1) |

Proposition : Rename/convert as a Xenoarchaeology guide (it is not a job), convert the MediaWiki syntax. (vérif. 3e passe) "The console prints a paper anomaly report (there is no data disk); sell it at cargo. Samples vary by up to 20%."

---

## Métiers du jeu sans page dans le périmètre
Aucun : les 10 assets (Chemist, Chief Medical Officer, Geneticist, Medical Doctor, Paramedic, Psychiatrist, Virologist, Research Director, Roboticist, Scientist) ont une page. Le seul « absent » est une page sans métier (XenoBiologist).

## Non vérifié
Procédures de chirurgie, effets par tick des réactions (`Reactions/Body/*`), ratios exacts, recettes de robots (nombre de dalles, tôles), hiérarchie « ordres », contenu des kits/ceintures, comportement des machines hors code Unity. La résolution de certains prefabs d'équipement (gilet du Médecin, lunettes du Paramédic, ceinture du Généticien) n'a pas abouti (guid non résolus).

## Questions pour un joueur
Lignes restées À VÉRIFIER EN JEU après la vérification de la 3e passe (6 règles de serveur, 2 comportements en partie).
1. (Chemist) Sur le serveur, le Chemist doit-il obéir au CMO ?
2. (Chemist) Sur le serveur, le Chemist est-il sanctionné s'il fabrique de la drogue ou des explosifs (« Do not make lube grenades or transform your workplace into a drug lab ») ?
3. (Chief Medical Officer) Sur le serveur, le CMO partage-t-il l'autorité sur le Geneticist avec le Research Director ?
4. (Chief Medical Officer) Sur le serveur, le CMO peut-il déclarer un chef de département « unfit for duty » et réunir un conseil de crise ?
5. (Paramedic) Sur le serveur, le Paramedic ne reçoit-il d'ordres que du CMO et du Captain ?
6. (Psychologist) Sur le serveur, le Psychologue a-t-il le droit de prescrire des médicaments à un patient ?
7. (Chemist, effets des réactifs) Injectez 10 u de Bicaridine à un blessé et regardez le scanner médical : le soin est-il d'environ 1 point de brute par seconde, comme le dit le tableau (« 1 brute per tick ») ? (même test pour Potassium Iodide contre les radiations, « 0.1 per tick »)
8. (Virologist) Peut-on, en une partie, prélever un virus, le cultiver dans une boîte de Petri et fabriquer un vaccin ou un remède ?
