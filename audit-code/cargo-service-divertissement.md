# Audit cargo-service-divertissement — wiki contre le code du jeu (develop, 2026-10-26)

Vérifié par une 2e relecture : 73 verdicts FAUX/PÉRIMÉ/ABSENT confirmés (✔) + 22 JUSTE échantillonnés confirmés, 6 corrigés (fusil du Bartender, équipement du Shaft Miner, emag du Cargo Technician, ceinture du Janitor, Red Mead, Tool Crate), 0 passé en À VÉRIFIER EN JEU.

Résumé (recompté ligne par ligne : un verdict par étiquette dans la colonne Verdict, « FAUX (n) » compte n) : 13 pages (12 métiers + Cargo Bounties), 45 FAUX, 11 PÉRIMÉS, 19 ABSENTS (dont 3 listes de contenu absent), 16 À VÉRIFIER EN JEU, 55 JUSTES. (L'ancien résumé, 29 / 9 / 10 / 14, ne correspondait pas aux tableaux : ceux-ci donnaient 48 FAUX, 10 PÉRIMÉS, 19 ABSENTS, 19 À VÉRIFIER EN JEU, 50 JUSTES.)
Méthode : code lu sur `unitystation/unitystation` `develop` (assets via raw.githubusercontent, quota API épuisé ; copie locale jeu-code pour les scripts). Les clearances sont décodées avec `Scripts/US13/Systems/Clearance/Clearance.cs` (entiers 32 bits little-endian dans `issuedClearance`). Les équipements viennent de `ScriptableObjects/Inventory/Populators/Occupations/*Populator.asset` (GUID résolus par les `.meta` des prefabs). Chemins ci-dessous relatifs à `UnityProject/Assets/`.

## Constats transversaux (valables pour presque toutes les pages)
- **Accès « Maintenance »** : le jeu donne `MaintTunnels` seulement à Assistant, Janitor, Cargo Technician, Quartermaster, Shaft Miner. Il ne le donne PAS à Bartender, Botanist, Cook, Chaplain, Clown, Curator, Mime. Toutes les pages Service/Entertainment/Civilian qui écrivent « Maintenance » sont donc fausses pour ces 7 métiers. Tous les métiers ont aussi `ExternalAirlocks` (jamais cité par le wiki). ✔ Revérifié : décodage refait sur les 13 `.asset` (enum `Clearance` séquentiel, MaintTunnels = 12 = `0c000000`, ExternalAirlocks = 13) ; l'ID reçoit bien `occupation.IssuedClearance` (`Items/IDCard.cs` l. 141 et 273), et la liste faible effectif s'ajoute seulement si `IsLowPop` (`IClearanceSource.cs` l. 17). Aucun des 7 n'a MaintTunnels, même en faible effectif.
- **Départements du jeu** (`ScriptableObjects/Departments/*.asset`) : Cargo = Quartermaster (chef), Cargo Technician, Shaft Miner ; Service = Janitor, Cook, Bartender, Botanist ; Entertainment = Clown, Mime ; Civilian = Assistant, Curator, Lawyer, Chaplain. Le wiki range Chaplain et Curator dans « Entertainment_Roles » et appelle Assistant « Service ». ✔ Revérifié (et `jobCategory` de l'Assistant = 7 = Crewe, pas Service = 6). (Signalé sans proposer de déplacement pour Lawyer/Geneticist, comme demandé ; ici je signale juste le département du jeu.)
- **Difficulté** : champ `difficulty` (0 Zero, 1 Low, 2 Medium, 3 High, 4 Extreme). Les couleurs du wiki ne contredisent pas fondamentalement, voir détails.
- **Tableau « Rôle : X »** des fiches : « Role type » n'est pas la catégorie du jeu (`jobCategory`) ; voir département.

## Assistant — `docs/3_HowToPlay/Jobs/Service_roles/Assistant.md` ↔ `ScriptableObjects/Occupations/Assistant.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom affiché | Assistant | `displayName: Assistant` | JUSTE |
| Département | Service | `Departments/Civilian.asset` (occupations : Assistant, Curator, Lawyer, Chaplain) ; `jobCategory: 7` = Crewe, pas Service | FAUX ✔ |
| Accès | Maintenance | `issuedClearance` = MaintTunnels, ExternalAirlocks | JUSTE (manque ExternalAirlocks) |
| Difficulté | Easy | `difficulty: 0` | JUSTE |
| Description courte | (non citée) | « Assist the crew. Learn Unitystation, use OOC for help. Ask the HOP for a job. » | ABSENT ✔ |
| Limite | non citée | `limit: 99` | — |
| Équipement | Grey jumpsuit non cité ; « welder » pour souder des portes (idée de jeu) | `AssistantPopulator` : GreyJumpsuit, PDABase, BlackShoes, ID ; pas d'outil | JUSTE / À VÉRIFIER EN JEU (souder une porte) |
Proposition : "Role type: Civilian. Access: Maintenance, External airlocks."

## Bartender — `docs/3_HowToPlay/Jobs/Service_roles/Bartender.md` ↔ `Occupations/Service/Bartender.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Bartender | `displayName: Bartender` | JUSTE |
| Département | Service | `Departments/Service.asset` | JUSTE |
| Accès | Bar, Maintenance | `issuedClearance` : Bar, ExternalAirlocks, Theatre. Pas de MaintTunnels. En faible effectif (`issuedLowPopClearance`) : Kitchen, Hydroponics | FAUX ✔ (Maintenance) ; Theatre et accès faible effectif ABSENTS ✔ |
| Difficulté | Easy | `difficulty: 1` (Low) | JUSTE |
| Limite | non citée | `limit: 1` | — |
| Équipement | « un fusil à pompe tirant des cartouches beanbag et un gilet type 1 » | `BartenderPopulator` : BartendersUniform, RadioHeadsetService, BeerGoggles, LaceupShoes, ArmorVestSlim, PDABartender, ID. Pas de fusil sur le personnage, mais les cartes en placent un au bar | JUSTE sur 4 cartes sur 5 (corrigé : `StreamingAssets/Maps/MainStations/*.json`, un `S3HunterShotgun` est posé sur la case du `BoozeStorageCabinet` du bar sur FallStation, MiniStation et OutpostStation, et à côté sur SquareStation, avec une `BoxOfBeanbags` sur Fall, Mini et Square ; rien au bar de BoxStationV1. Le gilet est bien fourni : ArmorVestSlim) |
| « limite de deux tirs » | « two shots at a time » | non prouvable par les assets étudiés | À VÉRIFIER EN JEU |
| Recettes texte (7) : Bloody Mary 1/2/1, Martini 2/1, Cuba Libre 3/1, Gin Tonic 2/1, Manhattan 2/1, Screwdriver 2/1, Syndicate Bomb 1/1 | | `ScriptableObjects/Chemistry/Reactions/Drinks/*.asset` (BloodyMary, Martini, CubaLibre, GinTonic, Manhattan, Screwdriver, Syndicatebomb) identiques | JUSTE |
| Tableau « Complex recipes » (120 lignes) | | 115 identiques au jeu (comparaison automatique ingrédients/quantités). | JUSTE |
| Bahama Mama | 2 Rum, 2 Orange Juice, 1 Lime Juice, 1 Ice | `Reactions/Drinks/BahamaMama` : 2 Rum, 1 Kahlua, 1 Pineapple Juice, 1 Creme de Coconut -> 5 | FAUX ✔ |
| Demon's Blood | 1 Rum, 1 SM Wind, 1 Blood, 1 Dr. Gibb | 1 Rum, 1 SM Wind, 1 Dr. Gibb (pas de sang) | FAUX ✔ |
| Devil's Kiss | 1 Blood, 1 Kahlua, 1 Rum | 1 Kahlua, 1 Rum (pas de sang) | FAUX ✔ |
| Nar'Sour | utilise « Blood » | le jeu utilise un réactif au GUID `eea053…`, absent de la copie locale (aussi utilisé par des réactions d'extraits de slime) | À VÉRIFIER EN JEU |
| Red Mead | 1 Blood, 1 Mead | `Reactions/Drinks/RedMead.asset` : 1 HumanBlood, 1 Mead -> 2 | JUSTE (corrigé : le GUID `efcde7…` se résout en `ScriptableObjects/Health/BloodTypes/HumanBlood.asset`, le sang humain) |
| Recettes du jeu absentes du wiki | | Mushroom Tea, Long Haul, Painkiller, Triumphal Arch, Planet Cracker, White Tirizian, Amaretto Alexander, Dark and Stormy, Long John Silver, Sea Breeze, Lean, Ginger Amaretto, Mauna Loa, Chocolate Milk, Pina Colada, Tropical Storm, Godmother, Admiralty, Drunken Espatier, Mushi Kombucha, The Doctor's Delight, Cherry Shake, Godfather, Protein Blend, Tich Toch, Salt and Swell… (`Reactions/Drinks/`) | ABSENT ✔ |
Propositions : "Access: Bar, Theatre, External airlocks (Kitchen and Hydroponics too on low population)." Shotgun: say it is not on you but in the bar's booze cabinet on most maps (not on BoxStation). Fix Bahama Mama (2 Rum, 1 Kahlua, 1 Pineapple Juice, 1 Creme de Coconut), Demon's Blood and Devil's Kiss (no Blood).

## Botanist — `docs/.../Service_roles/Botanist.md` ↔ `Occupations/Service/Botanist.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Botanist / Service | `displayName: Botanist` ; `Departments/Service.asset` | JUSTE |
| Accès | Hydroponics, Maintenance | Hydroponics, ExternalAirlocks ; faible effectif : Bar, Kitchen. Pas de MaintTunnels | FAUX ✔ (Maintenance) |
| Difficulté | Medium | `difficulty: 2` (Medium) | JUSTE |
| Limite | non citée | `limit: 3` | — |
| Équipement | non détaillé | `BotanistPopulator` : BotanistsJumpsuit, Apron, BotanistsLeatherGloves, BotanyBackpack, PDABotanist, RadioHeadsetService, BlackShoes, ID | ABSENT ✔ (info) |
| Description courte | | « Grow fresh produce / Tend to your garden / Experiment! » | — |
| Voyants du bac | vert récolte, rouge mauvaises herbes, bleu soif, orange faim | `Scripts/US13/Objects/Botany/HydroponicsTray.cs` : 4 voyants (récolte, mauvaises herbes weedLevel > 5 ou pestLevel > 5, eau, nutriment `<10`). Les couleurs ne se lisent pas dans le code | JUSTE (fonctions) / couleurs À VÉRIFIER EN JEU. Les parasites (pests) déclenchent aussi le voyant « herbes » : ABSENT ✔ (`UpdateWeedsFlag` : weedLevel > 5 ou pestLevel > 5, ligne 370) |
| Tableaux de graines (Bush, Cereal, Drogu, …) | graines, mutations | graines = prefabs non couverts par mon extraction | À VÉRIFIER EN JEU |
Proposition : "Access: Hydroponics, External airlocks (Bar and Kitchen on low population)." Mention that pests also light the weed indicator.

## Cook — `docs/.../Service_roles/Cook.md` ↔ `Occupations/Service/Cook.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Cook / Service | `displayName: Cook` ; Service | JUSTE |
| Accès | Kitchen & Butcher, Maintenance | Kitchen, Morgue, ExternalAirlocks ; faible effectif : Bar, Hydroponics. Pas de MaintTunnels. Pas d'accès « Butcher » dans l'enum `Clearance` | FAUX ✔ (Maintenance) ; « Butcher » = probablement Morgue, À VÉRIFIER EN JEU |
| Difficulté | Easy | `difficulty: 1` | JUSTE |
| Limite | non citée | `limit: 2` | — |
| Équipement | non cité | CooksSuit, ChefHat, CooksApron, RadioHeadsetService, PDACook, BlackShoes, ID | ABSENT ✔ (info) |
| Nutrition « de 1 à 500, 400 au début, seuils 500/300/200/100/0 » | | `HealthV2/Living/PolymorphicSystems/Hunger/HungerSystem.cs` : la faim est calculée par nutriments dans le sang/réserves de graisse (`NumberOfMinutesBeforeStarving = 30`, états Full/Normal/Hungry/Malnourished/Starving). Aucune échelle 1 à 500 ; seuils réels dans `HungerCalculationMethods/` (minutes de nutriment 10/5 pour Normal/Hungry, ou 40/20/15/10 de nutriment dans le sang) ; les messages « You're stuffed! » etc. n'existent plus que dans une maladie (`RedPlagueMessages.asset`) | PÉRIMÉ ✔ |
| Pâte : 15 farine + 10 eau | | `Chemistry/Reactions/Food/Dough.asset` : Flour 15, Water 10 | JUSTE |
| Micro-ondes « 10 secondes » | | `Objects/Machines/Microwave.cs` : `DefaultTimerTime = 10`, pas de +5 s (`InteractableMicrowave.cs`) | JUSTE |
| Tableaux micro-ondes / couteau / rouleau / broyeur | | recettes dans `ScriptableObjects/FoodRecipes/CookedFoods`, `Crafting/Recipes/Food` (418 assets) ; noms recoupés pour le micro-ondes, pas le reste | À VÉRIFIER EN JEU |
Proposition : replace the 1-500 nutrition paragraph with: hunger is now driven by nutriments stored in the body (about 30 min before starving), with states Full / Normal / Hungry / Malnourished / Starving. Access: Kitchen, Morgue, External airlocks.

## Janitor — `docs/.../Service_roles/Janitor.md` ↔ `Occupations/Service/Janitor.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Janitor / Service | `displayName: Janitor` ; Service | JUSTE |
| Accès | Janitorial closet, Maintenance | Janitor, MaintTunnels, ExternalAirlocks | JUSTE |
| Difficulté | Easy | `difficulty: 1` | JUSTE |
| Limite | non citée | `limit: 2` | — |
| Équipement | galoches, janibelt avec serpillière, lampe, panneau, 4 flacons de nettoyant | `JanitorPopulator` : Galoshes, JanitorsJumpsuit, 2 x JanibeltFull, BlackGloves, PDAJanitor, RadioHeadsetService. `Populators/Items/Belt/JanibeltFullPopulator.asset` (`DeprecatedContents`, bien utilisé par `StoragePopulator.cs`) : TrashBag, CustodialHolobarrierProjector, SoapDeluxe, SpaceCleaner (x1), Flashlight, Mop, WetFloorSign | FAUX ✔ pour « 4 flacons » (1 flacon par ceinture) ; la serpillière, la lampe et le panneau sont JUSTES (corrigé : les 2 objets « non résolus » sont la serpillière Mop et un savon SoapDeluxe) |
| Sac poubelle « 15 objets », seau 70, serpillière 25/5, nettoyant 100/6 | | non vérifié dans les prefabs (hors extraction) | À VÉRIFIER EN JEU |
Proposition: the belt holds a mop, a flashlight, a wet floor sign, one space cleaner bottle, a bar of soap, a trash bag and a holobarrier projector (not 4 cleaner bottles). You also get a second full janibelt.

## Chaplain — `docs/.../Entertainment_Roles/Chaplain.md` ↔ `Occupations/Service/Chaplain.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Chaplain | `displayName: Chaplain` | JUSTE |
| Département | Civilian (dans le dossier Entertainment) | `Departments/Civilian.asset` | JUSTE (le dossier wiki est « Entertainment ») |
| Accès | Maintenance, Church | ChapelOffice, Crematorium, ExternalAirlocks, Theatre. Pas de MaintTunnels | FAUX ✔ (Maintenance) ; Crematorium/Theatre ABSENTS ✔ |
| Difficulté | easy | `difficulty: 2` (Medium) | FAUX ✔ |
| Limite | non citée | `limit: 1` | — |
| Équipement | « Null rod, bible » | `ChaplainPopulator` : MagicSandals, ChaplainsJumpsuit, NullRod, BibleWhiskey, TrophyRack, RadioHeadsetService, PDAChaplain | JUSTE |
| Description courte | | « Preach / Hold services and funerals / Make up a religion » | JUSTE |
| Livre saint | soigne 10 brute et burn, 40 % de 10 dégâts au cerveau, intention d'aide | `Scripts/US13/Items/Others/HolyBook.cs` : `healthModifier = 10`, seul le Chaplain, uniquement sur la tête ; 60 % en intention Harm, 40 % sinon ; un seul soin par coup (brute d'abord, puis burn) ; dégâts : 10 Brute sur la partie « cerveau » (TODO : pas encore de vrai dégât cérébral) | PÉRIMÉ ✔ (seul écart réel : 10 de brute OU de burn par coup, pas les deux ; le wiki dit déjà « sur la tête » et « 40 % en intention d'aide », ce qui est juste ; 60 % en Harm non cité) |
| Null rod se transforme en armes | | non vérifié | À VÉRIFIER EN JEU |
Proposition: "Access: Chapel office, Crematorium, Theatre, External airlocks. Difficulty: Medium." Holy book: heals 10 brute, then burn, per hit on the head; harms with 40% chance (60% on harm intent).

## Clown — `docs/.../Entertainment_Roles/Clown.md` ↔ `Occupations/Service/Clown.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Clown / Entertainment | `Departments/Entertainment.asset` | JUSTE |
| Accès | Maintenance | ClownOffice, ExternalAirlocks, Theatre. Pas de MaintTunnels | FAUX ✔ |
| Difficulté | « HONK » | `difficulty: 0` | À VÉRIFIER EN JEU (jeu de mots) |
| Limite | non citée | `limit: 1` | — |
| Équipement | PDA glissant, peau de banane | `ClownPopulator` : ClownShoes, ClownSuit, ClownMask, BikeHorn, Banana, GigglesVonHonkerton, PDAClown, ID | JUSTE (klaxon ABSENT ✔) |
| Description courte | | « Entertain the crew / Play harmess pranks / Tell (bad) jokes and puns » | — |
| PDA glissant | « your PDA is slippery » | prefab PDAClown non lu | À VÉRIFIER EN JEU |
Proposition: "Access: Clown's office, Theatre, External airlocks."

## Curator — `docs/.../Entertainment_Roles/Curator.md` ↔ `Occupations/Service/Curator.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom | Curator | `displayName: Curator` | JUSTE |
| Département | Civilian | `Departments/Civilian.asset` | JUSTE (dossier wiki Entertainment) |
| Accès | Maintenance ; « same amount of access as an assistant » | Library, ExternalAirlocks. Pas de MaintTunnels | FAUX ✔ |
| Difficulté | easy | `difficulty: 1` (Low) | JUSTE |
| Limite | non citée | `limit: 1` | — |
| Équipement | non cité | TreasureHunterUniform, CuratorHat, CuratorCoat, RadioHeadsetService, PDACurator | ABSENT ✔ (info) |
| Description courte | | « Read books / Write books / Report on station news » | — |
Proposition: "Access: Library, External airlocks (no maintenance access)." Fix the traitor paragraph accordingly.

## Mime — `docs/.../Entertainment_Roles/Mime.md` ↔ `Occupations/Service/Mime.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Mime / Entertainment | `Departments/Entertainment.asset` | JUSTE |
| Accès | Mime's office, Maintenance | MimeOffice, ExternalAirlocks, Theatre. Pas de MaintTunnels | FAUX ✔ (Maintenance) ; Theatre ABSENT ✔ |
| Difficulté | Easy | `difficulty: 1` | JUSTE |
| Limite | non citée | `limit: 1` | — |
| Équipement | masque, uniforme, sac, bouteille de rien | `MimePopulator` : FrenchBeret, MimeMask, Suspenders, MimesOutfit, ParcelParceaux, WhiteGloves, BottleOfNothing, PDAMime | JUSTE (béret, bretelles, gants ABSENTS ✔) |
| Sorts | Speech, boîte, chaise, mur invisibles | 4 sorts dans `spells` (GUID non résolus ; le nom `vowOfSilence` apparaît) | JUSTE pour le nombre ; noms À VÉRIFIER EN JEU |
Proposition: "Access: Mime's office, Theatre, External airlocks."

## Cargo Technician — `docs/.../Cargo_roles/Cargo-Technician.md` ↔ `Occupations/Supply/Cargo Technician.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Cargo Technician / Cargo | `Departments/Cargo.asset` | JUSTE |
| Accès | Cargo, Mining, Maintenance | `issuedClearance` : Cargo, ExternalAirlocks, MaintTunnels, Mailsorting. Mining et MiningStation seulement en faible effectif (`issuedLowPopClearance`) | PÉRIMÉ ✔ (Mining pas en plein effectif ; Mailsorting ABSENT ✔) |
| Supérieur | Quartermaster | Quartermaster = `headOccupations` de Cargo | JUSTE |
| Difficulté | Easy | `difficulty: 1` | JUSTE |
| Limite | non citée | `limit: 3` | — |
| Équipement | non cité | CargoTechniciansJumpsuit, FingerlessGloves, RadioHeadsetCargo, PDACargoTechnician | ABSENT ✔ (info) |
| Description courte | | « Order things for people / Load and unload crates / Deliver the orders » | — |
| Emag « Cryptographic Sequencer » | « prized possession of the Cargo Tech » (paragraphe traître) | Pas d'emag au départ, mais la phrase est dans la section traître et ne parle pas d'équipement de départ ; l'emag `EMagCryptographicSequencer` est vendu dans l'uplink (`ScriptableObjects/PDA/UplinkCategoryList.asset`) | JUSTE (corrigé : le rapport a lu un conseil de traître comme une liste d'équipement) |
| Recyclage des caisses vides contre une part du prix | | non retrouvé dans `CargoManager.cs` (seules les ventes de contenu `ContentSellPrice` et d'exports `ExportCost` apparaissent) | À VÉRIFIER EN JEU |
| Section « Cargo Bounties » (doublon de la page Bounties) | | voir Cargo Bounties | idem |
Proposition: "Access: Cargo, Mail sorting, Maintenance, External airlocks (Mining on low population only)."

## Quartermaster — `docs/.../Cargo_roles/Quartermaster.md` ↔ `Occupations/Supply/Quartermaster.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Quartermaster / Cargo | `Departments/Cargo.asset` `headOccupations` | JUSTE |
| Accès | « ??? » | Cargo, ExternalAirlocks, Mailsorting, MaintTunnels, Mining, MiningStation, Qm | ABSENT ✔ |
| Difficulté | Medium | `difficulty: 2` | JUSTE |
| Limite | non citée | `limit: 1` ; `priority: 2` | — |
| Équipement | non cité | Sunglasses, QuartermastersJumpsuit, RadioHeadsetCargo, PDAQuartermaster, BlackGloves, BlackShoes | ABSENT ✔ (info) |
| Description courte | | « Order equipment for the station / Coordinate shaft miners / Flood the station with paperwork » | — |
Catalogue (`ScriptableObjects/Cargo/Orders/**`, prix = `CreditCost`) comparé au tableau du wiki. Vérification : seules les commandes rangées dans une des 15 catégories de `Cargo/CargoData.asset` sont en vente (`CargoManager.cs` ligne 158 : `Supplies = new List<CargoCategory>(cargoData.Categories)`). 8 fichiers à la racine de `Orders/` ne sont dans aucune catégorie, donc pas commandables : Cleaning Supplies Crate 700, Helmets Crate 500, High Voltage Cable Crate 700, Medium Voltage Cable Crate 800, Mining Tools Crate 600, Oxygen Tank Crate 1200, Robusting Crate 1000, Tools Crate 700.
| Article | Wiki | Jeu | Verdict |
|---|---|---|---|
| R550c PDW | 2000 | 3000 (2 objets) | FAUX ✔ |
| R550c ammo | 1000 | 1500 | FAUX ✔ |
| .38 special ammo | 800 | 1100 | FAUX ✔ |
| Laser carbines | 2000 | 3000 | FAUX ✔ |
| « E-guns » 3 lasers 3000 | | « Energy Carbine Crate » 3000 (2 objets) | PÉRIMÉ ✔ (nom/contenu) |
| SWAT gear | 2400 | 4000 | FAUX ✔ |
| Seeds crate | 1000 | 1440 | FAUX ✔ |
| Handcuffs | 900 | 600 | FAUX ✔ |
| Stun batons | 600 | 800 | FAUX ✔ |
| Type I-B body armor | 800 (3 gilets, 3 casques) | 8000 (8 objets : 2 MKII SWAT suits, 2 casques SWAT, 2 masques, 2 paires de gants) | FAUX ✔ (prix et contenu) |
| Medical kits | 800 | 1000 | FAUX ✔ |
| Defibrillators | 800 | 900 | FAUX ✔ |
| Medical peripherals | 700 | 770 | FAUX ✔ |
| Beakers boxes (rangé Medical) | 700 | « Beakers Crate » 700 dans Science | PÉRIMÉ ✔ (catégorie) |
| Robotics assembly | 800 | 1260 | FAUX ✔ |
| Circuit board crate | 800 | 1320 | FAUX ✔ |
| Reactor starting rod | 1000 | 1150 | FAUX ✔ |
| Janitorial supplies | 700 | 890 | FAUX ✔ |
| Party supplies crate (seau, serpillière…) 700 | | « Party Equipment Crate » 1000 (18 objets) ; « Cleaning Supplies Crate » 700 existe mais n'est pas en vente | PÉRIMÉ ✔ |
| Bulk / exotic carpeting | 800 / 1600 | 1080 / 2085 | FAUX ✔ |
| Cargo packing supplies | 700 | 975 | FAUX ✔ |
| Shaft Miner Starter Kit | 800 | 1200 (`Cargo/Orders/Mining and Cargo/Shaft Miner Starter Kit.asset`) | FAUX ✔ |
| Ordnance / Biological / Internals / Firefighting / Radiation | 600 / 800 / 1000 / 1000 / 800 | 650 / 1000 / 1860 / 1308 / 850 | FAUX ✔ (5) |
| 50 Plasteel | 16500 | 17800 | FAUX ✔ |
| Art supplies / Festive wrapping | 600 / 750 | 727 / 2100 | FAUX ✔ |
| Wizard / Theatre / Formalwear / Foam force / Original costumes | 1000 / 750 / 900 / 600 / 600 | 1000 / 955 / 1450 / 920 / 950 | FAUX ✔ (4), Wizard JUSTE |
| Uniformes « 600 ~ 100000 » | | de 700 (Botanist, Lawyer) à 10000 (Captain Set) | FAUX ✔ |
| Low/Medium/High voltage cables | Low 800, Cable 800, High 700 | en vente : seulement « Electrical Cables Crate » 3840 (Engineering). Les fichiers Medium Voltage 800 et High Voltage 700 existent mais ne sont dans aucune catégorie ; pas de « Low » | PÉRIMÉ ✔ (corrigé : le rapport donnait Medium/High comme commandables) |
| « Plasma Generator » 1000 | | introuvable ; seuls PACMAN et SUPERPACMAN 1000 | PÉRIMÉ ✔ |
| Tool Crate | 700 (2 caisses à outils, 2 ceintures) | « Tools Crate » 700 hors catalogue ; en vente : « Toolbox Crate » 1000 | PÉRIMÉ (corrigé : le rapport le donnait JUSTE, mais `Orders/Tool Crate.asset` n'est dans aucune catégorie) |
| Prix JUSTES (identiques) | | Shotguns 3000, Shotgun ammo 1000, Riot 3000, Firing pins 2000, Exotic seeds 1500, Donk 800, Ingredients 1000, Imported meats 1000, Pizza 2000, Potted plants 700, Bullet proof 2000, Medical surplus 2000, Body bags 800, Surgical 1200, Reactor control 2000, fuel 2500, Replacement lights 1000, Blank IDs 750, Bureaucracy 750, Plasma cutter 3000, Advanced 6000, tous les matériaux/canisters (hors 50 plasteel), Big band 1000, Religious 1400, Funeral 1000 | JUSTE |
| Absents du wiki | | Civilian Weaponry 500 (fichier « Crank Weapon Crate »), Scottish Weaponry 1500 (emag), Special Ops Grenades 1500 (emag), Special Delivery Pizza 3000 (emag), Clown-grade Cream Pies 2500 (emag), Contraband Posters 1000 (emag), Security Night Vision Squad Set 4000, Blood Packs 3000, exotic chemicals 8000, Engine Construction (field gen, emitter, particle accelerator, grounding rod, radiation collector, singularity, energy ball), Engineering Gear 1650, Insulated gloves 1600, Toolbox 1000, Conveyor 700, Circuit imprinter board 6000, vendor refills (1000 à 4000), Assorted Fruits 1000, tout le rayon Livestock (Bird, Cat, Chicken, Corgi, Cow, Fox, Pug 800 à 2200), Freon canister 6000, Amber 5000, Slime 5090, Vacpacks 10000, Monkey cubes 5000, Artifact 10000, PDA 600, Jukebox 4000, Toner 1000, Posters 1000, Laser Tag 780 | ABSENT ✔ (corrigé : retirés de la liste Helmets, Mining Tools, Oxygen Tank, Robusting, qui ne sont pas en vente ; « Compact » = les Shotguns du wiki et « Energy » = les E-guns, déjà traités ; ni Compact ni Energy ne demandent l'emag) |
| Colonne « Crate Reclamation Payout (refund %) » | 25 à 100 % | champ `ContentSellPrice` du jeu (500, 29 pour la pizza, etc.) sans pourcentage ; règle de remboursement non retrouvée | À VÉRIFIER EN JEU |
| Crédits de départ / quota | non cités | `CargoManager.cs` : `Credits = 1000` au démarrage de manche (ligne 155) | ABSENT ✔ |
Proposition: update the crate price table from the categories of `ScriptableObjects/Cargo/CargoData.asset` (not every file in `Orders/` is on sale), and replace "Access: ???" with "Cargo, Mining, Mining station, Mail sorting, QM office, Maintenance, External airlocks".

## Shaft Miner — `docs/.../Cargo_roles/Shaft-Miner.md` ↔ `Occupations/Supply/Shaft Miner.asset`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Nom / département | Shaft Miner / Cargo | `Departments/Cargo.asset` | JUSTE |
| Accès | Mining, Cargo, Maintenance | Cargo, ExternalAirlocks, MaintTunnels, Mining, MiningStation | JUSTE (MiningStation ABSENT ✔) |
| Supérieur | Quartermaster | chef de Cargo | JUSTE |
| Difficulté | Hard - Very Hard | `difficulty: 3` (High) | JUSTE/PÉRIMÉ ✔ (Very Hard serait 4, Extreme) |
| Limite | non citée | `limit: 3` | — |
| Équipement de départ | « you get given » : hardsuit de mineur, sacoche, lanterne, pioche, pelle ; PKA « a few in the mining department » | Sur le personnage (`ShaftMinerPopulator`) : ExplorersJumpsuit, MiningBoots, ExplorerBag (MiningSurvivalBox, Seclite, SurvivalKnife), BlackGloves, RadioHeadsetMining, PDAShaftMiner. Le reste est posé par les cartes au département Mining | JUSTE (corrigé : casiers `MinersEquipmentLocker` (« Closet_Locker_Mining ») remplis par `SpawnableLists/Closets/Mining.asset` = Pickaxe, MiningSatchel, Lantern, Shovel, ProtoKineticAccelerator, ExplorerGasMask, ExplorerBag, ExplorersJumpsuit, MiningBoots, sur Box (4), Fall, Outpost, Square (3 chacune) ; MiniStation pose 2 PKA, 4 pioches, 4 pelles directement ; les `SuitStorageUnitMiningEVA` (toutes les cartes) contiennent MiningHardsuit + casque (`SSUMiningEVA.asset`). Nuance : c'est à prendre dans le département, pas sur soi) |
| Description courte | | « Mine ores / Process them into useful materials / Kill hostile wildlife » | — |
| Prix de vente des minerais (5, 200, 1000, 125, 100, 125, 50, 500, 300 /u) | | non trouvés dans les assets `ScriptableObjects/Mining/*Material.asset` (ils ne portent que les points de travail) | À VÉRIFIER EN JEU |
| Points de travail (1,1,15,60,18,30,30,16,50,50) | | `Mining/*Material.asset` `laborPoint` : Iron 1, Glass 1, Plasma 15, Bananium 60, Gold 18, Titanium 30, Uranium 30, Silver 16, Diamond 50, Bluespace 50 | JUSTE |
| Machine d'équipement des mineurs (prix) | Pickaxe 100, Silver 1000, Diamond 2000, PKA 750, Shovel 100, Webbing 400, Kit 1000, First aid 600, Cigar 5000 | `Prefabs/Objects/Machines/VendingMachines/MiningEquipment.prefab` : identiques | JUSTE |
| Articles du distributeur absents | | Proto Kinetic Crusher/Machete/Spear/Hammer/Claw 1250, Jump Boots 2500, Artifact Detector 500, Night Vision Goggles 2000, Mining Scanner 250 | ABSENT ✔ |
| ORM : points via bouton « claim » sur l'ID | | `Objects/Mining/OreRedemptionMachine.cs` `ClaimLaborPoints` | JUSTE |
| « 3 cases / portée 3 du PKA », canaux radio Supplies et Science, casque | | non vérifiés | À VÉRIFIER EN JEU |
Proposition: keep the tool list but say where it is: you spawn with an explorer bag (survival box, flashlight, knife); the pickaxe, shovel, lantern, satchel and PKA are in the miner lockers of the Mining department, the mining hardsuit in its suit storage units. More can be bought at the Mining Equipment Vendor.

## Cargo Bounties — `docs/.../Cargo_roles/Cargo-Bounties.md` ↔ `ScriptableObjects/Cargo/Bounties/**` + `Prefabs/SceneConstruction/NestedManagers/CargoManager.prefab`
| Point | Wiki dit | Jeu dit (preuve) | Verdict |
|---|---|---|---|
| Génération aléatoire depuis une liste | | `CargoManager.cs` : toutes les 320 à 690 s environ, 1 à 2 primes tirées de `randomBountiesList` ; onglet Bounties (`GUI_CargoPageBounties.cs`) | JUSTE |
| Récompenses | tableau complet | Toutes les valeurs correspondent aux assets (ex. Airlock 400, Heart 1250, Goliath 2000, AI module 1800, Cream pies 2000…) | JUSTE |
| « Raw Meats x10 » | x10 | `Raw Meats.asset` demande 6 (le texte du wiki dit déjà 6) | FAUX ✔ (nom) |
| Hot Ice x10 « small budgetary bonus » | | titre du jeu : « Bonus alloy quota: send 10 Hot Ice » | PÉRIMÉ ✔ (texte) |
| Plasma glass | « Send 5 » | demande 5 ; reward 750 | JUSTE |
| Bag of Holding, 5000 | | `Science Bounties/Bag Of Holding.asset` dans la liste aléatoire (`CargoManager.prefab` `randomBountiesList`) ; reward 5000 | ABSENT ✔ |
| Crowbars 200, Welders 200, Wrenches 200 | | assets existent mais ne sont PAS dans la liste aléatoire du prefab | JUSTE (non listés) |
| Dead Facehugger 1500, Monster Bread 1350 etc. | | identiques | JUSTE |
Proposition: add "Bag of Holding – Send 1 bag of holding. 5000" under Science; rename "Raw Meats x10" to "Raw Meats x6".

## Ce que je n'ai pas pu vérifier
- Prefabs d'objets (PKA, PDA glissant du Clown, volumes seau/serpillière/sac poubelle), car seuls les ScriptableObjects et scripts sont en local. (2e relecture : contenu du bar et du département Mining lu dans les cartes `StreamingAssets/Maps/MainStations/*.json` ; les 2 objets du janibelt sont résolus : Mop et SoapDeluxe.)
- Valeurs de vente des minerais (par unité), tableaux de graines/mutations du Botanist, recettes de couteau/combiné/broyeur du Cook (418 assets), remboursement des caisses vides.
- Couleurs (voyants des bacs, textes colorés), tactique et conseils (non jugés).
