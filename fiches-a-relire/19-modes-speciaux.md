> 🔗 **Liens**
> - Source : le code du jeu (le MediaWiki n'a qu'une page « Highlander » vide). Dépôt [unitystation/unitystation](https://github.com/unitystation/unitystation), branche `develop`
> - Fiche cible proposée : une page de modes, par exemple `docs/3_HowToPlay/Jobs/Antagonist_roles/Antagonist_roles.md` (aujourd'hui un simple index) ou une nouvelle page `Game-Modes.md` dans le même dossier ; pour l'admin, voir aussi [AdminTools.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/2_UserInterface/AdminTools/AdminTools.md) (section GameModeManager)
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

# Fiche 19 : modes spéciaux (Extended, Highlander, Map Editor, Mixed)

- **Source** : le code du jeu uniquement (relevé le 26/10). Chemins relatifs à `UnityProject/Assets/`.
- **Priorité** : basse à moyenne. Ces quatre modes sont courts : je les ai regroupés au lieu de faire quatre fiches presque vides.

**Où la mettre**

Une page « Game modes » (ou une section de `Antagonist_roles.md`) avec un tableau et un paragraphe par mode. Highlander mérite un petit paragraphe à part parce qu'il a son propre antagoniste.

**Ce qui existe déjà dans le wiki** (recherche dans `docs/` de `origin/main`)

Les antagonistes Cargonia, Blob, Blood Brother, Nuclear Operative, Wizard, Traitor, Fugitive et Xenomorph ont une page dans `Antagonist_roles/` (Fugitive et Xenomorph ne sont pas des modes de jeu). Aucun des quatre modes de cette fiche n'a de texte. `AdminTools.md` montre une capture du « GameModeManager » mais ne liste pas les modes.

## Le mécanisme général (utile à toutes les fiches de modes)

- Le jeu garde une liste de **modes en rotation** (`ScriptableObjects/GameModes/GameModeData.asset`) : Cargonia, NukeOps, **Mixed**, Wizard, Vampires, Blob, BloodBrothers (décodage des identifiants avec les fichiers `.asset.meta`). Mixed est aussi le mode **par défaut** quand aucun autre n'est possible (`DefaultGameMode`).
- Extended a une référence à part (`extendedReference`) : il n'est ajouté à la rotation que si le serveur a `AllowExtendedGameMode: true`. La configuration du dépôt a `false` pour `AllowExtendedGameMode` et `ForceExtendedGameMode` (`StreamingAssets/Config/gameConfig.json`).
- Un mode n'est « possible » que s'il y a assez de joueurs connectés (`minPlayers`) et, si `forceMinAntags`, assez pour au moins `minAntags` antagonistes (`Scripts/US13/Systems/GameModes/GameMode.cs`, `IsPossible`).
- Les admins choisissent le prochain mode dans une liste construite à partir de la rotation, plus Extended si le serveur l'autorise (`GameModePage.cs`, `GameModeData.GetAvailableGameModeNames`) : Highlander, Map Editor, Changeling et aussi **Traitor** (le mode `GameModes/Traitor.asset`, nom « Traitor », existe mais n'est pas en rotation) n'y figurent donc pas. Un nom inconnu donne le mode par défaut, Mixed (`GameModeData.GetGameMode`).
- Noms affichés (`gameModeName`) : Cargonia s'affiche « Rebellion », NukeOps « Nuclear Emergency », BloodBrothers « Blood Brothers », Mixed « Base Mixed Game Mode ».

## 1. Extended

(`ScriptableObjects/GameModes/Extended.asset`, `Scripts/US13/Systems/GameModes/Extended.cs`)

- Nom affiché : Extended. Description : « Relax on the station without any pesky antags bothering you. »
- Aucun antagoniste : la classe renvoie toujours `null` pour le choix d'antagoniste (« no antags »), la liste d'antagonistes est vide, `antagRatio 0`, `midRoundAntags 0`.
- `minPlayers` 0 (donc toujours possible), `canRespawn 0`, maladies aléatoires désactivées.
- **Réservé au serveur** : pas en rotation ; activé seulement par `AllowExtendedGameMode` (il entre alors dans le tirage), ou imposé en permanence par `ForceExtendedGameMode` (`GameManager.GameMode.cs`, `SetGameMode`). Désactivé dans la configuration du dépôt.
- Victoire : aucun objectif d'antagoniste. À vérifier en jeu : fin de manche normale par la navette.

## 2. Highlander

(`ScriptableObjects/GameModes/Highlander.asset`, `Scripts/US13/Systems/GameModes/Highlander.cs`, antagoniste `ScriptableObjects/Antagonists/Antags/Highlander.asset`, événement `Scripts/US13/Systems/InGameEvents/InGameEventScripts/EventHighlander.cs`)

- Description du mode (texte du jeu) : deux buts, « Get dat fukken disk » et « Escape alone on the shuttle » ; quand « le bouton Highlander » est pressé, **tous les vivants** de la station reçoivent ces buts et l'équipement, les arrivants tardifs aussi. Le texte renvoie à une « section suivante » qui liste l'équipement et qui n'existe pas dans le jeu.
- Réglages : `minPlayers 6`, `antagRatio 1`, `midRoundAntags 1` avec chance 100, `canRespawn 1`. Le mode choisit au hasard parmi ses antagonistes possibles, un seul (Highlander).
- **Pas en rotation, pas dans la liste admin.** Dans le jeu il passe par un **événement** admin : `EventHighlander` (dans `Prefabs/SceneConstruction/NestedManagers/InGameEventsManager.prefab` : nom « Highlander », catégorie Antagonist (`EventType: 3`, énumération `InGameEventType` de `EventScriptBase.cs`), `MinPlayersToTrigger: 0`, `CanRandomlyTrigger: 0`, donc **ne se déclenche pas au hasard** et sans minimum de joueurs ; les réglages du mode, comme `minPlayers 6`, ne servent pas sur ce chemin).
- Quand l'événement démarre (`EventHighlander.OnEventStart`) : annonce de Centcom « Come 'n' git th' disk ye cunts. Ainlie yin kin win. » (si l'événement est « faux », `FakeEvent`, il n'y a que l'annonce) ; la liste des antagonistes actifs est vidée (`ActiveAntags.Clear()`) ; chaque joueur vivant est réapparu comme Highlander ; un minuteur de **900 secondes (15 minutes)** démarre (`eventTime: 900` dans le prefab) ; à la fin du minuteur la manche se termine ; quand la navette est appelée, l'appel et le rappel de la navette sont bloqués (`blockCall`, `blockRecall`). `OnShuttleCalled` appelle `StopCoroutine(StartRoundTimer())` avec un nouvel objet, pas celui du minuteur lancé : dans le code, le minuteur de 15 minutes n'est donc pas arrêté par l'appel de la navette (à vérifier en jeu).
- L'antagoniste Highlander : 2 objectifs de base, **Escape** (« Escape on the shuttle alive! ») et **Steal the nuke disk** (« Steal the nuke disk by hitting it with your sword »). Après l'apparition : régénération rapide activée et accent écossais (`Speech.Scotsman`). Métier « Highlander » : « As a scotsman, steal the nuclear disk and escape alive on the emergancy shuttle. »
- Il existe aussi un disque vinyle « Highlander Vinyl Record » (`Prefabs/Items/Bar/VinylRecordHighlander.prefab`), un béret Highlander (`BeretHighlander.prefab`), des sons Highlander (`AddressablePackingProjects/SoundAndMusic/.../Highlander/` ; l'antagoniste joue `Highlander.prefab` à son apparition) et une interface de minuteur (`HighlanderTimerUI.cs`).
- Le code **ne prouve pas** « escape alone » : l'objectif Escape dit seulement « alive ». À vérifier en jeu : la victoire à un seul survivant, l'équipement donné, et si le bouton existe encore dans le menu admin « Events ».

## 3. Map Editor

(`ScriptableObjects/GameModes/MapEditor.asset`, `Scripts/US13/Systems/GameModes/MapEditor.cs`)

- Nom affiché : **Map Editor**. Description : « Edit Unitystation maps ».
- `IsPossible()` renvoie toujours vrai ; aucun antagoniste ; `minPlayers 1` ; `canRespawn 1` ; il utilise sa propre liste de stations (`MainStations` différent des autres modes).
- **Pas un mode de jeu de serveur** : il est lancé depuis le lobby, par le bouton « Map Editor » du menu du compte (`Scripts/US13/UI/Systems/Lobby/GUI_AccountHeader.cs`, `OnMapEditorBtn` : choisit ce mode, affiche son nom au lieu de « Secret » (`SecretGameMode = false`) et héberge un serveur, `LobbyManager.HostServer`).
- À vérifier en jeu : les outils disponibles dans l'éditeur ; la page de dev existante `How-to-Map.md` en parle peut-être déjà (fiche 13).

## 4. Mixed (« Base Mixed Game Mode »)

(`ScriptableObjects/GameModes/MixedRound.asset`, classe `Scripts/US13/Systems/GameModes/MultiAntagonistGameMode.cs`)

- Nom affiché : **Base Mixed Game Mode**. Description du jeu : « has a mix of traitors and a 50% chance each of swap and changling at 10 and 20 pop respectively ».
- **Les données ne collent pas à cette description.** Les antagonistes du mode (`AntagonistDatas`) sont : Traitor (poids 0.75, dès 1 joueur) ; Swapper (unique, 10 % de chance, dès 3 joueurs) ; Vampire (unique, 10 % de chance, dès 3 joueurs). Il n'y a **pas de changeling**, ni de seuils à 10 et 20 joueurs. Le commentaire en bas de `MultiAntagonistGameMode.cs` décrit encore une autre idée (traitor 75, blood brothers > 15, swapper > 20, changeling > 30). Il faut croire les données, pas la description.
- Réglages : `minPlayers 1`, `antagRatio 0.3`, `minAntags 1`, `maxAntags 100`, `midRoundAntags 1` (chance 50), `canRespawn 0`, `allocateJobsToAntags 1`, maladies aléatoires ratio 0.05. Métiers interdits : Captain, HoP, HoS, Warden, Security Officer, Detective, AI, Cyborg (liste `nonAntagJobTypes` : 6, 22, 23, 35, 33, 17, 1, 16, décodée avec `JobType.cs`).
- Un « unique » n'est **tenté qu'une seule fois par manche** (`MultiAntagonistGameMode.PickAndCheckAntagonist`) : le premier joueur choisi comme antagoniste qui l'a activé dans ses préférences et n'est pas banni du rôle (et s'il y a assez de joueurs, `MinPop`) fait le test de 10 % (`RNG.RoleChance(0.1)`) ; réussi ou non, cet antagoniste est marqué comme tenté (`AntagManager.TriedAntagonists`) et personne ne le retente. Le même joueur fait donc d'abord le test Swapper, puis le test Vampire ; si les deux échouent, il devient Traitor (s'il a Traitor dans ses préférences).
- **En rotation : oui, et c'est le mode par défaut.**
- **Swapper** (`Antagonists/Antags/Swapper.asset`, `Swapper.cs`) : un objectif, « Swap with as many people as possible » (`Objectives/Swapper/Swapper Objective.asset`), plus l'objectif Escape (`AlwaysStartWithObjectives`). Il reçoit le sort **Body Swap** (`Spells/Swapper/BodySwap.asset` : « Swaps bodies with the target », recharge 300, portée 2) et le message « You are the Swap with as Many people you can ». À vérifier en jeu : le détail de l'échange de corps.

## Brouillon de page (anglais)

```md
---
title: Game modes
---

# Game modes

The server picks a game mode at the start of each round. Some modes need a minimum number of players.

| Mode | Minimum players | What happens |
|---|---|---|
| Mixed (default) | 1 | Mostly traitors, with a chance of a Swapper or a Vampire. |
| Vampires | 5 | A virus turns some crew into vampires. |
| Extended | none | No antagonists. Only enabled on servers that allow it. |
| Highlander | none (admin event) | Admin event: everyone alive becomes a Highlander and fights for the nuke disk. |
| Map Editor | none | Started from the lobby to edit maps. Not a normal round. |

## Highlander

An admin can start the Highlander event. Centcom announces it, every living player becomes a Highlander (fast regeneration, Scottish accent), and the round ends after 15 minutes. You must steal the nuke disk with your sword and escape alive on the shuttle. The shuttle cannot be recalled once called.

## Extended

A quiet round without antagonists.
```

## À vérifier

- Tout ce qui est marqué « à vérifier en jeu » ci-dessus.
- Une seule page ou une page par mode ? Pour Highlander, un événement admin plutôt qu'un mode : peut-être à placer dans la doc admin.
- Les autres modes en rotation (Cargonia affiché « Rebellion », NukeOps, Wizard, Blob, BloodBrothers) ne sont pas dans cette fiche : je n'ai relevé que ceux demandés.
- La liste de rotation vient du dépôt ; un serveur peut en avoir une autre.
- Hors périmètre mais vu en passant : la page actuelle `Cargonia.md` dit « The gamemode can currently only be triggered manually by an admin », alors que Cargonia (« Rebellion ») est dans la rotation du dépôt avec `minPlayers: 15`. À vérifier en jeu avant de corriger cette page.
- Aucune image proposée.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner avec une autre fiche (laquelle : ____)
- [ ] abandonner
