> 🔗 **Liens**
> - Page d'origine (MediaWiki) : https://wiki.unitystation.org/index.php/Guide_to_Ordnance
> - Fiche cible dans le dépôt : [docs/3_HowToPlay/Jobs/Science_roles/Scientist.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/3_HowToPlay/Jobs/Science_roles/Scientist.md)
> - Fiche cible en ligne : https://unitystation-wiki.unionrolistes.fr/HowToPlay/Jobs/Science_roles/Scientist/
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

# Fiche 04 : Guide to Ordnance

- **Source** : [Guide to Ordnance](https://wiki.unitystation.org/index.php/Guide_to_Ordnance)
- **Dernière modification** : 2025-07-22
- **Taille** : 2094 mots (compte de l'inventaire)
- **Priorité** : haute (Science)

**Où la mettre**

Fiche métier : `docs/3_HowToPlay/Jobs/Science_roles/Scientist.md`, chapitre « The Ordnance Lab ». Page longue : si le chapitre est trop gros pour `Scientist.md`, proposer à part une sous-page (voir si le mainteneur accepte une exception à la règle « pas de guides »). Le tableau « Useful Chemicals Reference » fait doublon avec la fiche 08 (Chemistry) : à garder à un seul endroit, plutôt dans `docs/3_HowToPlay/Jobs/Medical_roles/Chemist.md`.

**Ce qui existe déjà dans le wiki**

`Medical_roles/Chemist.md` a des recettes (format « Step 1, Step 2 ») mais pas Stabilizing Agent, Glycerol, Fluorosurfactant, etc. Aucune page sur les grenades chimiques, le détecteur de rendement d'explosion (BYD) ni les primes d'explosifs. `Cargo_roles/Quartermaster.md` ne mentionne l'ordnance que deux fois.

**À vérifier**

- Tableaux « Pyrotechnic Reactions » et « Useful Chemicals Reference » : recettes et températures à contrôler contre les recettes actuelles du jeu (Chemist.md avertit que d'autres recettes « turn to ash or out right don't work »).
- Les liens internes du tableau (ancres vers « Stabilizing Agent », « Glycerol », etc.) ont été rendus en simple texte, car ils pointaient dans la même page.
- Chiffres à confirmer en jeu : 15 primes au début de la manche, 15 RP par prime, total de 225 RP, 5 plaques de métal pour un boîtier de grenade, touche Z pour activer, variantes pyro (+300 K), cryo (-100 K) et AR.
- Contradiction avec la fiche 02 : singularité à plus de 400 unités ici, 450 u dans la fiche Scientist.
- La section « Mapping » en fin de page s'adresse aux développeurs et mappeurs, pas aux joueurs : à déplacer dans `docs/5_Dev/Introduction/development/How-to-Map.md` (ou à supprimer), pas dans la fiche métier. Ici : liste de 8 points (BYD, canon de masse, distributeurs de produits chimiques, béchers, boîtiers, combinaisons anti-bombe, compte-gouttes, bouteille de toxine).
- Images manquantes : Grenade chemg.png, BYD.png, OrdnanceUI.png.
- Mot « Cyrochemical » (faute d'origine pour « cryo ») conservé tel quel.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner dans `Scientist.md`, chapitre « The Ordnance Lab » (tableau de produits chimiques vers `Chemist.md`)
- [ ] abandonner

---

**Contenu converti en Markdown (anglais, non réécrit)**

---

Ordnance is the area of R&D focused on the synthesis of chemicals and explosives, in particular, chemical grenades. If your goal as a scientist is to become an expert in not only creating potent explosives, but versatile explosives to protect and assist the station, then ordnance is the area of research for you. 

## Chemical Grenades

> 🖼️ image manquante : Grenade chemg.png

Chemical grenades are what you will be using for the vast majority of your ordnance adventures. In essence, all a chemical grenade is, is two beakers/chem storage containers attached to a timer that mixes them. Using a chemical grenade is simple:

1. Locate an empty chemical grenade casing or make one with 5 metal sheets. 

2. Fill two beakers of any size with your desired chemicals

3. Place the beakers in the casing one after another

4. Use a screwdriver to secure the casing shut. 

5. Active the grenade in your hand by either clicking on it while holding or pressing the 'Z' key. 

6. Throw it! 

After a short delay, the chemical grenade will mix the contents of the two beakers, if your chemistry is correct, this can cause an explosion, foam, smoke, or whatever you have designed it to do. If the grenade was not designed to explode, then it is possible that the casing survived, as such, it can be recovered, and by un-securing the casing with a screwdriver and removing the beakers, the casing can be reused for further testing. 

Once researched in the techweb, scientist may also produce pyro, cyro and AR chemical grenade variants. 

Pyrochemical Grenades will increase the temperature of reactants by 300K on detonation. 

Cyrochemical Grenades will decrease the temperature of reactants by 100K on detonation. 

AR or advance release chemical Grenades will gradually mix reactants over time, configurable by the user. 

## The Blast Yield Detector

> 🖼️ image manquante : BYD.png

The blast yield detector is how you turn a series of random explosives into RP that can help the station. The blast yield detector will detect any explosions that take place in a cone on front of it, recording their yield and chemical composition, reporting it to its GUI. However, the most important feature of the detector is its *bounty list.* 

If you are constructing your own blast yield detector, ensure it is connected both to a valid APC for power and a research server of which it will transmit any data to and receive its targets. 

### Explosive Bounties

At the start of each round, the blast yield detector will be populated with 15 explosive targets or bounties. Each bounty will have a Required Yield, List of Required Reactions and a List of Required Reagents. If the detector detects an explosion that satisfies the requirements of a target, the target will complete and award 15RP. 

Required Yield: The explosive potency of the grenade. The target explosive must have a potency greater than or equal to the listed yield. The yield of any explosive will be displayed in the BYD after it detonates. Learning what chemical mixes result in which yields can take alot of time an experimentation to learn, but once it is learnt, doing so can become a breeze.

Required Effects: The required effects are the physical effects a grenade must trigger at the time of detonating, this might be smoke, explosives, foam etc. The quantity of the final effect must match with the displayed value. Getting them to match exactly can take time and some math. Ordnance departments come equipped with eyedroppers which can be utilised to place very precise amounts of reagents into beakers.

Required Reagents: The required reagents are chemicals that must be present before and after the beakers mix. Similar to the required reactions, these reagents must be in the exact quantity specified in the target and as such, the departments eyedroppers can once again be used to obtain precise amounts of each chemical. 

Once you have created a chemical grenade that you believe satisfies the requirement of a bounty, you must test it live. The grenade must be detonated in the view of the blast yield detector (Most stations come equipped with a Mass Driver or airlock for detonating explosives in space safely away from the station). If the grenade matches a bounty, that bounty will clear, and you will be awarded the RP. 

> 🖼️ image manquante : OrdnanceUI.png (légende : The GUI of the blast yield detector)

## Pyrotechnic Reactions

Below you can find a list of existing pyrotechnic chemicals that might prove useful in your experiments:

| Pyrotechnic Name | Description | Reactants | Formation Temperature | Detonation Temperature |
|---|---|---|---|---|
| Smoke Powder | Detonates to form a smoke cloud, will be laced with other chemicals found in the container. Can be stabilized by 1 part Stabilizing Agent per 30u of smoke powder. | **Makes 3 parts** 1 part Phosphorus <br /> 1 part Potassium <br /> 1 part Sugar | 0K | 0K (Unstable) 374K (Stable) |
| Flash Powder | Flashes and stuns nearby players for a short duration. | **Makes 3 parts** 1 part Aluminum <br /> 1 part Potassium <br /> 1 part Sulfur | 0K | 374K |
| Sonic Powder | Deafens nearby players for a moderate duration. Also stuns players for a short duration. | **Makes 3 parts** 1 part Oxygen <br /> 1 part Cola <br /> 1 part Phosphorus | 0K | 300K |
| EMP | Fries electronics in a given area. Can cause cybernetics to malfunction. | **Makes 1 part** 1 part Uranium <br /> 1 part Iron | 0K | 0K |
| Foam | Coats the floor in slippery foam depositing chemicals found within the container. | **Makes 3 parts** 1 part Fluorosurfactant <br /> 1 part Water | 0K | 0K |
| Metal Foam | Coats the floor in metallic foam that hardens into walls. | **Makes 5 parts** 3 parts Aluminum / Iron <br /> 1 part Foaming Agent <br /> 1 part Fluorosulfuric Acid | 0K | 0K |
| Smart Metal Foam | Coats the floor in metallic foam with only the outermost tiles hardening into walls. | **Makes 5 parts** 3 parts Aluminum / Iron <br /> 1 part Smart Foaming Agent <br /> 1 part Fluorosulfuric Acid | 0K | 0K |
| Liquid Dark Matter | Sucks in nearby objects with a strength proportional to amount detonated. Will form a singularity if over 400 units of it are detonated at once. Can be stabilized with 1 part Stabilizing Agent for each 30u of Liquid Dark Matter | **Makes 3 parts** 1 part Stable Plasma <br /> 1 part Radium <br /> 1 part Carbon | 0K | 0K (Unstable) 473K (Stable) |
| Nitroglycerin | Explodes with a potency of 10 | **Makes 2 parts** 1 part Glycerol <br /> 1 part Fluorosulfuric Acid <br /> 1 part Sulfuric Acid | 0K | 474K |
| Azide | Explodes with a potency of 6 Takes 1 second to detonate, highly reactive, will detonate on formation. | **Makes 6 parts** 1 part Oxygen <br /> 1 part Chlorine <br /> 1 part Nitrogen <br /> 1 part Ammonia <br /> 1 part Sodium <br /> 1 part Silver | 0K | 0K |
| Black Powder | Explodes with a potency of 3 | **Makes 3 parts** 1 part Saltpetre <br /> 1 part Charcoal <br /> 1 part Sulfur | 0K | 474K |
| Methamphetamine | Explodes with a potency of 2. Has medicinal properties | **Makes 4 parts** 1 part Diethylamine / Ephedrine <br /> 1 part Iodine <br /> 1 part Phosphorus <br /> 1 part Hydrogen | 300K (Diethylamine) 372K (Ephedrine) | 300K (Diethylamine) 380K (Ephedrine) |
| Welding Fuel | Explodes with a potency of 2 | **Makes 1 part** 1 part Welding Fuel | 0K | 474K |
| Chlorine Triflouride | Explodes with a potency of 1, highly reactive, will detonate on formation. | **Makes 4 parts** 1 part Chlorine <br /> 3 parts Fluorine | 0K | 0K |
| Explosion Potassium Water | Explodes with a potency of 0.8, highly reactive, will detonate on formation. | **Makes 1 part** 1 part Water <br /> 1 part Potassium | 0K | 0K |

## Useful Chemicals Reference

Below you can find a list of useful chemicals for forming pyrotechnics or adding to grenades:

| Chemical Name | Reactants | Formation Temperature |
|---|---|---|
| Stabilizing Agent | **Makes 3 parts** 1 part Iron <br /> 1 part Hydrogen <br /> 1 part Oxygen | 150K - 300K |
| Stabilizing Agent Destabilize | **Removes Reactants** 1 part Stabilizing Agent <br /> 1 part Table Salt | 0K - 150K |
| Glycerol | **Makes 1 part** 3 parts Corn Oil <br /> 1 part Sulfuric Acid | 100K - 350K |
| Fluorosurfactant | **Makes 5 parts** 2 parts Carbon <br /> 2 parts Fluorine <br /> 1 part Sulfuric Acid | 0K |
| Fluorosulfuric Acid | **Makes 4 parts** 1 part Fluorine <br /> 1 part Hydrogen <br /> 1 part Potassium <br /> 1 part Sulfuric Acid | 380K |
| Ephedrine | **Makes 4 parts** 1 part Sugar <br /> 1 part Oil <br /> 1 part Hydrogen <br /> 1 part Diethylamine | 0K |
| Diethylamine | **Makes 2 parts** 1 part Ammonia <br /> 1 part Ethanol | 0K |
| Ammonia | **Makes 3 parts** 1 part Nitrogen <br /> 3 parts Hydrogen | 0K |
| Foaming Agent | **Makes 1 part** 1 part Lithium <br /> 1 part Hydrogen | 0K |
| Smart Foaming Agent | **Makes 5 parts** 3 parts Foaming Agent <br /> 1 part Acetone <br /> 1 part Iron | 0K |
| Oil | **Makes 3 parts** 1 part Welding Fuel <br /> 1 part Hydrogen <br /> 1 part Carbon | 0K |
| Acetone | **Makes 3 parts** 1 part Oil <br /> 1 part Welding Fuel <br /> 1 part Oxygen | 0K |
| Saltpetre | **Makes 3 parts** 1 part Potassium <br /> 1 part Nitrogen <br /> 1 part Oxygen | 0K |
| Space Cleaner | **Makes 2 parts** 1 part Ammonia <br /> 1 part Water | 0K |
| Space Lube | **Makes 4 parts** 1 part Water <br /> 1 part Silicon <br /> 1 part Oxygen | 0K |
| Table Salt | **Makes 3 parts** 1 part Sodium <br /> 1 part Chlorine <br /> 1 part Water | 0K |

## Tips & Tricks

* Don't stress about putting all your reagents in the same beaker at first. If the explosive requires reagents like space lube, mix them separately before transferring them all to the final beaker. 
* For required reactions, ensure they cannot react before the beakers mix. If you put potassium in one beaker, ensure no water is put in that same beaker, keep them separate until the grenade triggers.
* Using the Techweb, higher capacity beakers can be researched, these higher capacity beakers, such as meta material and bluespace beakers, can prove invaluable when creating larger or more complex grenades. 
* Ordnance is one of the science departments that can benefit from multiple scientists collaborating, as most ordnance labs have enough equipment for two scientists to work simultaneously. 
* To save time, employ the use of science goggles, science googles allow you to see the content of containers such as beakers when inspecting, saving you time having to place beakers back inside the chem dispenser to check their composition. 
* Bounties don't have to be done in order! If you are more confident with some bounties over others, you can always knock out the easier ones first, then take your time with the harder ones later on. 
* Bounties can amount to 225 RP throughout an entire round, this is a substantial portion of the Techweb from ordnance alone, if you are struggling to research the Techweb, don't neglect ordnance!

## Mapping

If you are a developer planning on mapping an ordnance lab, make sure you can tick all the following boxes:

- [ ] The department has a blast yield detector; the detector is facing in the correct direction and is properly connected to the research server.

- [ ] The department contains some method of detonating explosives safely in the view of the BYD. This is often done with a mass driver, but other methods can be used as well. 

- [ ] The department has at least 2 Chem Dispensers, explore having upwards of 4 for larger stations.

- [ ] The department is adequately equipped with beakers. At the bare minimum, at least 2 boxes of beakers should be present, Accompanied by at least 2 large beakers. 

- [ ] The department comes pre-equipped with at least 4 chemical grenade casings, and a screwdriver to tinker with them. 

- [ ] The department has a bomb suit locker for scientists to wear while testing, on larger maps, explore having up to 4 bomb suits. 

- [ ] The department has atleast 2 eyedroppers, consider having significantly more (Upwards of 4) for larger stations. 

- [ ] The department should have one bottle of toxin for specific bounties that require it. Be careful before adding more.
