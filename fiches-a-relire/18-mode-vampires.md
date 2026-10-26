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

Rien. « Vampire » n'apparaît nulle part dans `docs/` (Blob et Cargonia ont une page, pas les vampires).

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
| `midRoundAntags` | 0 (voir plus bas : dans le code, cela empêche aussi le tirage des vampires en début de manche) |
| `canRespawn` | 1 |
| `allocateJobsToAntags` | 1 : un vampire a un métier |
| Métiers interdits | Captain, HoP, HoS, Warden, Detective, Cyborg, Chaplain (décodage de `nonAntagJobTypes` avec `JobType.cs`) |
| Maladies aléatoires | `randomSicknesses: 1`, ratio 0.05 : Space Flu, Space Cold, Paranoia (identifiants recoupés avec `Chemistry/Reagents/Pathogens/*.asset.meta`) ; le vampirisme n'en fait **pas** partie |

**En rotation : oui** (`GameModeData.asset`, liste `rotation`, 5e entrée). Le tirage se fait parmi les modes « possibles » avec le nombre de joueurs connectés (`GameMode.IsPossible` : au moins 5 joueurs ici). La configuration par défaut du dépôt choisit le mode avec `"InitialGameMode": "AppleShuffle"` (`StreamingAssets/Config/gameConfig.json`) ; un serveur peut changer cela.

**Départ** : `Vampires.SpawnAntag` ajoute 5.0 unités de « VampirismReagent » dans le sang du joueur choisi (l'antagoniste `Vampire.cs` fait de même dans `AfterSpawn` : « Should start as vampire no matter what »). Le vampirisme est donc un **pathogène dans le sang** (`Chemistry/Reagents/Pathogens/Vampirism.asset`).

**Problème vu dans le code (à vérifier en jeu)** : en début de manche, `GameMode.AntagJobAllocation` choisit les antagonistes avec `HandleRatioAndPickAntagonist`, et la version de base de cette méthode (`GameMode.cs`) renvoie `null` tout de suite si `MidRoundAntags == false`. `Vampires.cs` ne la remplace pas (Cargonia, autre mode à `midRoundAntags: 0`, la remplace, lui). Le mode Vampires ne désignerait donc **aucun vampire** au départ. De plus, `Vampires.SpawnAntag` ne fait pas apparaître le corps du joueur choisi (il n'appelle pas `AntagManager.ServerSpawnAntag`, contrairement à la version de base). Tant que ce n'est pas vérifié en jeu, ne pas écrire dans le wiki combien de vampires il y a au départ.

**L'antagoniste** (`ScriptableObjects/Antagonists/Antags/Vampire.asset`)

- Équipe : « The Vampiric Corruption » (`Antagonists/Teams/Vampires.asset`, affichée à la fin de manche).
- Objectif personnel : **Survive** (« Stay alive until the end! », `Objectives/EscapeObjectives/Survive.asset`). `numberOfObjectives: 2`, mais Survive est le seul objectif de base et les objectifs partagés sont interdits (`canUseSharedObjectives: 0`) : le tirage s'arrête donc à ce seul objectif (`AntagData.GenerateObjectives`). Pas d'objectif d'évasion (`needsEscapeObjective: 0`).
- Objectifs **d'équipe**, attachés à l'équipe dans `Antagonists/Teams/Vampires.asset` (`coreObjectives`, identifiants recoupés avec les `.asset.meta`) :
  - **Ensure stable population** (`TeamObjectives/VampireTeamAmount.asset`, classe `CorrectVampireAmount.cs`) : au moins 1 vampire vivant et au plus `1 + 10 % des joueurs en jeu`, arrondi au-dessus (`MaxNumberOfVampires`). Le texte de l'objectif se termine par « The chaplain sees to your demise. » (`UpdateObjectiveDescription`).
  - **Prevent vampirism cure** (`TeamObjectives/PreventCure.asset`, classe `PreventCuredVampires.cs`) : « Prevent more than N vampires from being cured », N = 10 % (arrondi au-dessus) de **tous les vampires de la manche**, y compris ceux devenus vampires en cours de partie (`historicVampires`, complété par `AddNewVampire`).
- Son d'apparition : `EnterBlood.prefab`.

**Progression par stades** (`Scripts/US13/Systems/Antagonists/VampireStageProgression.cs`)

- Le stade dépend de la quantité de réactif de vampirisme dans le sang (et dans le foie). Plus de réactif, plus de stades ; moins, on perd des pouvoirs. Infobulle du jeu : « Use your vampire abilities to gain corruption and new powers! » (`UI_VampireStage.cs`).
- **N'importe quel joueur** dont le stade dépasse 0 devient vampire et rejoint l'équipe (`Evolve` → `CreateVampire`), même s'il n'était pas antagoniste au départ.
- Un joueur qui tombe à un stade inférieur ou égal à 0 **n'est plus vampire** (guéri) : il quitte l'équipe (`RemoveVampire`).
- La **cape** est retirée si le stade descend sous 3 (`Devolve` : `newStage < 3 && cloakEquipped`).
- Gagner du réactif (code `VampireStageProgression.Actions.cs`, valeurs du prefab `Prefabs/Player/Resources/Player_V4(uNet).prefab`) : **Blood Drain** (portée 1,5, 1,5 s ; impossible sur un autre vampire ; marche aussi sur les animaux) et les coups de la **dague sanguine** (`SanguineMeleeEffect.cs`) transforment une partie du sang pris en réactif ; **Corrupt Victim** (portée 1,5, 1,5 s) injecte **4,5 unités** de vampirisme à la victime et en donne **10** au vampire (`corruptionAmount: 4.5`, `selfCorruptionAmount: 10` dans le prefab, qui remplacent les valeurs 2,5 et 20 écrites dans le code). C'est la contamination : la victime devient vampire si son stade dépasse 0.
- Seuils des stades : la réaction `Chemistry/Reactions/Sicknesses/VampirismReaction.asset` (nom affiché « Unholy Blood Corruption ») a des seuils 0, 1, 10 et 20 (`StageConcentrationThreshold`) ; l'unité exacte (unités ou concentration) n'est pas vérifiée.
- Pouvoirs par stade (`stageAbilities` du prefab du joueur, recharge `CooldownTime` entre parenthèses) :
  - stade 1 (« You feel a new strength within you and a thirst for the blood… ») : **Blood Drain** (15), **Eyes of the Night** (vision de nuit), **Summon Dagger** (15 ; coûte au vampire 20 de dégâts et 30 de sang, `selfDamage`, `bloodTaken`), plus une mutation ;
  - stade 2 (« The corruption surges through your veins… ») : **Hypnotic Stare** (420 ; durée 10, portée 4,5, cône de 90° dans le prefab) et **Corrupt Victim** (300) ;
  - stade 3 (« Your strength is supreme. ») : **Sanguine Cloak** (30), plus des mutations.
- Icônes d'actions présentes dans le dépôt (`Textures/interface/UI/screen actions/actions_vampire/`) : sanguine, hypnotic, night eyes, blood drain, blood corrupt, sanguine dagger. Un shader « Vampire Vision » (vision de nuit) existe.

## Brouillon de page (anglais)

```md
---
title: Vampire
---

# Vampire

In the Vampires game mode (at least 5 players), a virus appears on the station and turns a few crew members into vampires. Vampires win by surviving. The station wins by curing or killing them.

## Becoming a vampire

Vampirism is a reagent in your blood. The more of it you carry, the higher your vampire stage and the more powers you unlock. Anyone whose blood carries enough of it becomes a vampire. If your stage drops to zero you are cured and leave the vampire team.

## Objectives

- Survive until the end of the round.
- As a team, keep the vampire population stable: at least one vampire alive, and no more than one plus 10 percent of the players.
- As a team, do not let more than 10 percent of all the round's vampires be cured.

## Powers

Vampires gain new abilities as their stage rises:

| Stage | Abilities |
|---|---|
| 1 | Blood Drain (drink blood to gain corruption), Eyes of the Night (night vision), Summon Dagger (costs you some health and blood) |
| 2 | Hypnotic Stare, Corrupt Victim (inject vampirism into a victim to turn them) |
| 3 | Sanguine Cloak |

If your stage drops, you lose the abilities of the higher stages.

## For the crew

Vampirism can be cured. (To confirm in game: which chemical or treatment cures it.)
```

## À vérifier

- **À vérifier en jeu en premier** : le mode Vampires donne-t-il vraiment des vampires au départ (voir « Problème vu dans le code ») ? Les vampires du mode Mixed, eux, passent par le chemin normal (`AntagManager.ServerSpawnAntag` puis `Vampire.AfterSpawn`).
- À vérifier en jeu : l'effet exact de Hypnotic Stare et de la cape, et à quelle quantité de réactif correspond chaque stade (seuils 1, 10, 20 de l'asset).
- À vérifier en jeu : comment on guérit. La réaction `Chemistry/Reactions/Sicknesses/VampirismCure.asset` existe mais ses ingrédients sont vides dans l'asset ; le texte de l'objectif d'équipe nomme le Chaplain (« The chaplain sees to your demise. »).
- À vérifier en jeu : si les 4,5 unités injectées par Corrupt Victim suffisent pour qu'une victime devienne vampire, et le « Vampire HUD » (lunettes `VampireHUD`).
- `antagRatio 0.05` et `maxAntags 10` sont dans l'asset, mais vu le problème ci-dessus, aucun nombre de vampires au départ n'est prouvé.
- Aucune image proposée.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner avec une autre fiche (laquelle : ____)
- [ ] abandonner
