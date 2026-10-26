> 🔗 **Liens**
> - Source : le code du jeu (aucune page dans les anciens wikis). Dépôt [unitystation/unitystation](https://github.com/unitystation/unitystation), branche `develop`
> - Fiche cible proposée : nouvelle page `docs/3_HowToPlay/Jobs/Antagonist_roles/Vampire.md` (même dossier que [Traitor.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/3_HowToPlay/Jobs/Antagonist_roles/Traitor.md))
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

# Fiche 18 : mode et antagoniste Vampires

- **Source** : le code du jeu uniquement (relevé le 26/10). Chemins relatifs à `UnityProject/Assets/`.
- **Priorité** : moyenne (le mode est en rotation, donc des joueurs le rencontrent, et il n'a aucune page)

**Où la mettre**

`docs/3_HowToPlay/Jobs/Antagonist_roles/Vampire.md`, avec une courte phrase « mode Vampires » dans `Antagonist_roles.md` si vous voulez une liste des modes (voir fiche 19).

**Ce qui existe déjà dans le wiki** (recherche dans `docs/` de `origin/main`)

Rien. « Vampire » n'apparaît nulle part dans les pages de jeu. (Le mot « Blob » ou « Cargonia » ont une page, pas celui-ci.)

## Ce que le code prouve

**Le mode de jeu** (`ScriptableObjects/GameModes/Vampires.asset`, classe `Scripts/US13/Systems/GameModes/Vampires.cs`)

| Champ | Valeur |
|---|---|
| `gameModeName` | Vampires |
| `description` | « A virus has appeared on the station converting a number of crew members into bloodthirsty vampires. The vampires must survive in a station desiring to kill/cure their species. » |
| `minPlayers` | 5 |
| `antagRatio` | 0.05 (5 %) |
| `minAntags` / `maxAntags` | 1 / 10 |
| `forceMinAntags` | 1 |
| `teamGameMode` | 1 : les vampires sont une équipe (rapport de fin de manche) |
| `midRoundAntags` | 0 : pas de vampire qui arrive en cours de partie par le tirage de mode |
| `canRespawn` | 1 |
| `allocateJobsToAntags` | 1 : un vampire a un métier |
| Métiers interdits | Captain, HoP, HoS, Warden, Detective, Cyborg, Chaplain (décodage de `nonAntagJobTypes` avec `JobType.cs`) |
| Maladies aléatoires | `randomSicknesses: 1`, ratio 0.05, 3 maladies possibles |

**En rotation : oui** (`GameModeData.asset`, liste `rotation`, 5e entrée). Le tirage se fait parmi les modes « possibles » avec le nombre de joueurs connectés (`GameMode.IsPossible` : au moins 5 joueurs ici). La configuration par défaut du dépôt choisit le mode avec `"InitialGameMode": "AppleShuffle"` (`StreamingAssets/Config/gameConfig.json`) ; un serveur peut changer cela.

**Départ** : `Vampires.SpawnAntag` ajoute 5.0 unités de « VampirismReagent » dans le sang du joueur choisi. Le vampirisme est donc une **maladie dans le sang** (`Vampire.cs`, antagoniste : « Should start as vampire no matter what »).

**L'antagoniste** (`ScriptableObjects/Antagonists/Antags/Vampire.asset`)

- Équipe : « The Vampiric Corruption » (`Antagonists/Teams/Vampires.asset`, affichée à la fin de manche).
- 2 objectifs ; objectif de base : **Survive** (« Stay alive until the end! », `Objectives/EscapeObjectives/Survive.asset`). Pas d'objectif d'évasion (`needsEscapeObjective: 0`), pas d'objectifs partagés.
- Objectifs d'équipe présents dans le dépôt (`Objectives/TeamObjectives/`) : **Ensure stable population** (« Ensure at least 1 vampire is alive but no more than », `maxAmountOfVampiresPercent: 10`, soit 10 %) et **Prevent vampirism cure** (« Prevent more than N vampires from being cured » : N = 10 % des vampires de départ, arrondi au-dessus ; `PreventCuredVampires.cs`).
- Son d'apparition : `EnterBlood.prefab`.

**Progression par stades** (`Scripts/US13/Systems/Antagonists/VampireStageProgression.cs`)

- Le stade dépend de la quantité de réactif de vampirisme dans le sang (et dans le foie). Plus de réactif, plus de stades ; moins, on perd des pouvoirs. Infobulle du jeu : « Use your vampire abilities to gain corruption and new powers! » (`UI_VampireStage.cs`).
- Un joueur qui tombe à un stade inférieur ou égal à 0 **n'est plus vampire** (guéri) : il quitte l'équipe (`RemoveVampire`).
- À partir du stade 3, une **cape** peut être équipée (`cloakEquipped`, retirée sous le stade 3).
- Boire du sang augmente le réactif (`SanguineMeleeEffect.cs`, `VampireStageProgression.Actions.cs`).
- Icônes d'actions présentes dans le dépôt (`Textures/interface/UI/screen actions/actions_vampire/`) : sanguine, hypnotic, night eyes, blood drain, blood corrupt, sanguine dagger. Un shader « Vampire Vision » (vision de nuit) existe.

## Brouillon de page (anglais)

```md
---
title: Vampire
---

# Vampire

In the Vampires game mode, a virus appears on the station and turns a few crew members into vampires (about 1 in 20 players, at least 1, with a minimum of 5 players in the round). Vampires win by surviving. The station wins by curing or killing them.

## Becoming a vampire

Vampirism is a reagent in your blood. The more of it you carry, the higher your vampire stage and the more powers you unlock. If the reagent drops to nothing you are cured and leave the vampire team.

## Objectives

- Survive until the end of the round.
- Keep the vampire population stable: at least one vampire alive, and no more than 10 percent of the crew.
- Do not let more than 10 percent of the vampires be cured.

## Powers

Vampires gain new abilities as their stage rises, for example night vision, blood drain and a sanguine dagger, and at stage 3 or higher a cloak.

## For the crew

Vampirism can be cured. (To confirm in game: which chemical or treatment cures it.)
```

## À vérifier

- À vérifier en jeu : ce que fait chaque pouvoir (les noms d'icônes ne disent pas l'effet), à quel stade chacun arrive, et à quelle quantité de réactif correspond chaque stade.
- À vérifier en jeu : comment on guérit (le code parle de guérison mais je n'ai pas lu la réaction de maladie `vampirismReaction`).
- À vérifier en jeu : si une victime mordue ou drainée devient vampire (contamination), et le « Vampire HUD » (lunettes `VampireHUD`).
- À vérifier : les deux objectifs d'équipe sont bien attachés à l'équipe (l'équipe référence deux objectifs par identifiant, que je n'ai pas recoupés avec les noms).
- Le chiffre « 1 vampire pour 20 joueurs » est `antagRatio 0.05` ; en pratique 1 vampire dès 5 joueurs (`forceMinAntags`).
- Aucune image proposée.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner avec une autre fiche (laquelle : ____)
- [ ] abandonner
