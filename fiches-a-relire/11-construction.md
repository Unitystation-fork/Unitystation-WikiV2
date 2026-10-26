> 🔗 **Liens**
> - Page d'origine (MediaWiki) : https://wiki.unitystation.org/index.php/Guide_to_construction
> - Fiche cible dans le dépôt : [docs/3_HowToPlay/Jobs/Engineering_roles/Engineer.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/3_HowToPlay/Jobs/Engineering_roles/Engineer.md)
> - Fiche cible en ligne : https://unitystation-wiki.unionrolistes.fr/HowToPlay/Jobs/Engineering_roles/Engineer/
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

# Fiche 11 : Guide to construction

- **Source** : [Guide to construction](https://wiki.unitystation.org/index.php/Guide_to_construction)
- **Dernière modification** : 2024-02-07
- **Taille** : 1316 mots (compte de l'inventaire)
- **Priorité** : moyenne

**Où la mettre**

Fiche métier : `docs/3_HowToPlay/Jobs/Engineering_roles/Engineer.md`, section « Construction » (ligne 56 environ), nouvelle sous-section « Floors and walls » juste avant les sous-sections par matériaux. Les tableaux complexes de l'ancien wiki (cellules fusionnées) ont été convertis en fiches par élément : Item, Requires to build, How to build, How to deconstruct, Tools.

**Ce qui existe déjà dans le wiki**

`Engineer.md` a « Bob the Builder » (matériaux, menu de construction, mur = girder + 2 plaques), puis « Construction » avec un tableau par matériau (Metal, Glass, Wooden plank...) donnant le coût en plaques. Absents : Lattice, Catwalk, Plating, Iron Floor Tile, Reinforced Floor, Carpeted Floor, procédures de démontage, Reinforced Wall pas à pas, Hidden Door.

**À vérifier**

- Page marquée « Work In Progress » avec des `//TODO` (tableau d'outils, section matériaux) : conservés dans le texte, à retirer.
- Dernière modification de 2024-02 : vérifier les étapes de démontage du mur renforcé (11 étapes) en jeu.
- Le texte renvoie vers « Supply crates#Exotic Carpet Crate » (page non extraite).
- Les couleurs `<font color='gray'>` ont été retirées.
- Beaucoup d'images manquantes (une par élément, plus les outils : Lattice.png, Catwalk.png, Plating.png, Floor.png, Wood Floor.png, Reinforced Floor.png, Carpeted Floor.png, wall.png, R_wall.png...).
- Le wiki actuel illustre les recettes avec des images dans `/img/Construction/` : choisir si on réutilise ce dossier.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner dans `Engineer.md`, section « Construction »
- [ ] abandonner

---

**Contenu converti en Markdown (anglais, non réécrit)**

---

If you wish to do any engineering job, such as Station Engineer (ancien lien : Engineer) you will be required to know how to construct machines, objects and various other things.

## Basic Tools

Before you can begin any construction or deconstruction you need to gather a few useful tools. 
Engineering roles such as Station Engineer (ancien lien : Engineer) start with a loaded toolbelt, but if you find yourself without one, tools can also be found in blue mechanical toolboxes and yellow electrical toolboxes. If you have access, tools can also be made at an Autolathe for a small material cost or dispensed from a Youtool vending machine.

//TODO Add tool table

//TODO Add material section.

## Constructions:

### Floors:

#### Lattice

The basic base for all types of construction, this is placed directly in space.

![Lattice.png](../images/mediawiki/Lattice.png)

**Item:** Lattice

**Requires to build:** Rods x1

**How to build:**

Use the rod on an empty space tile.

**How to deconstruct:**

Use **wirecutters** to cut the lattice into one rod.

**Tools:** Wirecutters

#### Catwalk

Built ontop of a lattice, mainly used for aesthetic purposes.

![Catwalk.png](../images/mediawiki/Catwalk.png)

**Item:** Catwalk

**Requires to build:** Rods x1

**How to build:**

Use the rods on a lattice.

**How to deconstruct:**

Use **wirecutters** to cut the catwalk into 2 rods.

**Tools:** Wirecutters

#### Plating

The basic floor which you put things like wires and pipes upon. 'All' floors and walls are built on top of this. Machines and objects cannot be secured unless floor plating is present.

> 🖼️ image manquante : Plating.png (absente aussi de l'ancien wiki)

**Item:** Plating

**Requires to build:** Floor tile x1

**How to build:**

Use a floor tile on a lattice or catwalk.

**How to deconstruct:**

Use a **crowbar** on *broken* plating, otherwise it does not deconstruct.

**Tools:** Crowbar

#### Iron Floor Tile

This is the basic "nice" floor, this floor should be considered used in all public areas, hence why there's none of these in maintenance tunnels.

> 🖼️ image manquante : Floor.png (absente aussi de l'ancien wiki)

**Item:** Steel Floor

**Requires to build:** Floor tile x1

**How to build:**

Use a floor tile on plating.

**How to deconstruct:**

Use a **crowbar** on a floor tile to remove it. It will be destroyed if broken.

**Tools:** Crowbar

#### Wood Floor

This is a fancy floor, used in the library and similar places.

> 🖼️ image manquante : Wood Floor.png (absente aussi de l'ancien wiki)

**Item:** Wood Floor

**Requires to build:** Wood tile x1

**How to build:**

Use a wood tile on plating. Wood tiles can be made of planks of wood.

**How to deconstruct:**

Detach it with a **crowbar**.

**Tools:** Crowbar

#### Reinforced Floor

This is a reinforced floor, used in science and similar areas for better protection against fire or explosions.

> 🖼️ image manquante : Reinforced Floor.png (absente aussi de l'ancien wiki)

**Item:** Reinforced Floor

**Requires to build:** Rods x2

**How to build:**

Use rods on a plating.

**How to deconstruct:**

Use a **wrench** to dismantle it to two rods.

**Tools:** Wrench

#### Carpeted Floor

This is a carpeted floor, used to make your office or local chapel look fancy.

> 🖼️ image manquante : Carpeted Floor.png (absente aussi de l'ancien wiki)

**Item:** Carpeted Floor

**Requires to build:** Carpet x1

**How to build:**

Use any type of carpet floor on a plating.

**How to deconstruct:**

Use a **crowbar** to pick up the carpet tile.

**Tools:** Crowbar

Some other carpets are available from cargo (ancien lien : Supply_crates#Exotic_Carpet_Crate)

### Walls

#### Normal Wall

This is the standard type of wall found around the station, they are easy to construct and remove but are not as strong as reinforced walls. They also come in a hidden door variety. Walls can also be made out of different minerals. They're useful for:
* Keeping people out.
* Keeping people in.
* Keeping people from going places.

> 🖼️ image manquante : wall.png (absente aussi de l'ancien wiki)

**Item:** Wall

**Requires to build:** Metal x4

**How to build:**

1. Stand where you want the wall.
1. Click the **metal** in your hand to open the construction panel.
1. Choose 'Girder' from the list.
1. Use the remaining 2 sheets of **metal** on the girder.

**How to deconstruct:**

1. **Weld** off the plating.
1. Use a **Wrench** to unsecure the girder.
1. **Screwdriver** to disassemble the girder.

**Tools:** Welder, Wrench, Screwdriver

#### Reinforced Wall

This is the reinforced type of wall found in secure areas of station, they are reasonably simple to construct, but are very time consuming to remove. They also can be made as a hidden door. They're useful for:
* Keeping people in and out of high security areas.

> 🖼️ image manquante : R_wall.png (absente aussi de l'ancien wiki)

**Item:** Reinforced Wall

**Requires to build:** Metal x2 Plasteel x2

**How to build:**

1. Stand where you want the reinforced wall.
1. Click the **metal** in your hand to open the construction panel.
1. Choose 'Girder' from the list.
1. Use the **plasteel** on the girders to reinforce them.
1. Use the last **plasteel** sheet on the reinforced girders to finish the wall.

**How to deconstruct:**

1. **Wirecutters** to cut the outer grille.
1. **Screwdriver** to remove the support lines.
1. **Weld** through the metal cover.
1. **Crowbar** to pry off the cover.
1. **Wrench** to loosen the support rods.
1. **Weld** through the support rods.
1. **Crowbar** to pry off the outer sheath.
1. **Screwdriver** to unsecure the support struts.
1. **Wirecutters** to remove the support struts.
1. **Wrench** to unsecure the girder.
1. **Screwdriver** to disassemble it.

**Tools:** Welder, Wrench, Screwdriver, Wirecutters, Crowbar

#### Normal/Reinforced Hidden Door

Also known as "Fake Walls" or "Hidden Walls". With a little imagination, hidden doors can be used in many marvelous tactics, varying from ambushes to passages into your very own secret hideaway room.
* Click to open.
* An almost undetectable escape route.
* Otherwise, same as a regular wall.

**Item:** Hidden Door / Reinforced Hidden Door

**Requires to build:** Metal x4 or Metal x2 Plasteel x2

**How to build:**

1. Stand where you want the door.
1. Click the **metal** in your hand to open the construction panel.
1. Choose 'Girder' from the list.
1. Use a wrench to unsecure the girder
1. Use the remaining 2 sheets of **metal**, or **plasteel** for a reinforced type, on the girder.

To turn a normal wall into a hidden door, deconstruct it until the final screwdriving of the girder, and instead use 2 sheet of metal on the girder.

**How to deconstruct:**

1. **Screwdriver** to tighten the bolts and turn it into a regular wall. Or...
1. **Weld** to dismantle the false wall.
1. **Screwdriver** again to disassemble the girder.

**Tools:** Screwdriver, Welder
