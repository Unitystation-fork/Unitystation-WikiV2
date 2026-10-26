> 🔗 **Liens**
> - Page d'origine (MediaWiki) : https://wiki.unitystation.org/index.php/Guide_to_Mapping
> - Fiche cible dans le dépôt : [docs/5_Dev/Introduction/development/How-to-Map.md](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/docs/5_Dev/Introduction/development/How-to-Map.md)
> - Fiche cible en ligne : https://unitystation-wiki.unionrolistes.fr/Dev/Introduction/development/How-to-Map/
> - Suivi : [ticket de relecture](https://github.com/Unitystation-fork/Unitystation-WikiV2/issues/372)

# Fiche 13 : Guide to Mapping

- **Source** : [Guide to Mapping](https://wiki.unitystation.org/index.php/Guide_to_Mapping)
- **Dernière modification** : 2024-10-05
- **Taille** : 863 mots (compte de l'inventaire)
- **Priorité** : dev

**Où la mettre**

Fichier proche existant : `docs/5_Dev/Introduction/development/How-to-Map.md` (4 100 mots, cartographie dans l'éditeur Unity). Proposé : nouveau chapitre « Mapping in game: the Map Editor » dans ce fichier, juste après « Getting Started ». Variante : nouvelle page `In-Game-Map-Editor.md` à côté, vu la taille de `How-to-Map.md`.

**Ce qui existe déjà dans le wiki**

`How-to-Map.md` : Setting Up Your Workspace, Introduction to Scenes, Getting Started, Important Sidebar Functions (Test Runner, Tile Palette, Matrix Check, LogLevels, PixelArt Editor), Creating a MainStation Map, Asteroids and Ruins, Shuttles, Mapping Guidelines, Pull Request a New Map Scene. Aucune mention du « Map Editor » du jeu, du Dev Spawner, du Tile Changer, du Variable Viewer ni du Copy-Paste de matrices. « Matrix Check » existe côté éditeur Unity : lien à faire avec la caméra « Matrix check » de la fiche.

**À vérifier**

- Le guide décrit un autre flux de travail (dans le jeu, via StationHub, bouton « Map Editor ») que celui de `How-to-Map.md` (éditeur Unity) : à dire clairement en introduction.
- Faute dans le texte d'origine (« Copy-Pate »), conservée.
- Aucune image dans cette page.
- Titre « So, you want to create your own mainstation »... « you can everything about » : phrase cassée à l'origine.

**Décision**

- [ ] copier tel quel
- [ ] réécrire
- [ ] fusionner dans `How-to-Map.md`, nouveau chapitre
- [ ] abandonner

---

**Contenu converti en Markdown (anglais, non réécrit)**

---

So, you want to create your own mainstation? Or maybe just a new asteroid. In either case, you can everything about Unitystation's in-game mapping system on this page!

## Getting Started:

In order to begin mapping, simply open a local installation of the game by opening stationhub, pressing on the 'Installations' tab, and then pressing launch on your desired game version.

Once the game has booted up, you will be presented with a series of options including to join and host a game. In order to being mapping, press the 'Map Editor' button.

The map editor game mode boots up a pseudo round on a template station map where you are granted admin powers.

To continue, spawn in as an assistant. 

You are now ready to being mapping!

### Mapping Tools:

In the mapping gamemode you will have access to a variety of tools to make mapping possible. To access these tools, press the admin tab in the top right of the screen. You will be given access to the following tools:

**Dev Spawner (Spawn Object):** Can be used to spawn in any object into the game world, used to introduce new items/objects into your map. By default, these objects are classified as 'runtime spawned' and won't be saved into the map data. If you wish to override this, press the right most check box in the dev spawner GUI, this will tell the spawner to spawn all objects as mapped and so they will be saved as they are when mapping. This exists so a mapper may place random item spawners into the world and the spawners will get saved but not the random loot they spawned when placed. 

**Dev Cloner (Clone Object):** After selecting an existing object, will allow you to place copies.

**Dev Destroyer (Destroy Object):** Can be used to instantly delete any object in the scene.

**Tile Changer (Tile Changer):** Can be used to alter the games tilemap by adding or removing tiles from given layers and matrices. In unitystation, mainstations, asteroids, awaysites & shuttles are all their own distinct matrices. When editing your station/map, ensure you select the correct matrix in the tile changer dropdown menu.

**Variable Viewer (Open Variable Viewer):** Often abbreviated as VV, This tool allows you to inspect and change the values of ingame data on objects. To begin using VV, either ctrl right-click on a target object and select the 'view script variables' option, or manually open the VV menu and select what object you wish to edit in the VV hierarchy. Once you have selected an object, you will see a series of labelled boxes, these are the objects 'components', the scripts behind the scenes that determine how an object behaves. Select the component you wish to edit and the relevant fields that that component relies upon will become visible to edit. Make sure you know what you are doing when you change script variables!

**Device Linker (Open Device Linker):** Allows you to link devices as you would with a multitool without having to physically interact with them. First select the 'master' object such as an APC or door button, then select all the objects you wish to be connected to this device.

**Device Rotator (Open Device Rotator):** Allows you to rotate already placed objects that possess the rotatable component. Press and hold the target object then drag your mouse in the direction of the desired rotation. (Device's may only point in the 4 cardinal directions).

**Device Mover (Open Device Mover):** Allows you to move existing objects to varying degrees of precision. It functions the same as the device rotator in terms of input. If you wish the output position to be rounded, tick the 'Round Output' box and select the degree of precision on the slider.

**Copy-Pate (Open Copy Paste):** Allows you to copy, paste and save large regions of a matrix.  

To Copy: Click and drag to select the target area to copy, then press again to confirm the selection. Use the drop down to select the target matrix to save. Press saves to confirm copy, this will copy the matrix data to your computer's clipboard. By default, the tool will only copy objects marked with the 'mapped' flag. If you wish to override this, select the relevant bool. 

Compact save, saves the map data into a more compact size, but the resulting format is less human readable.

To Paste: Select either an existing matrix to paste onto, or a new matrix name to create and paste the data onto, then press the load button.

**Camera Controls (Open Camera Controls):** Camera controls allow's you to show and hide specific layers in the game world as well as enable debug views. 

Lighting View allows you to toggle on and off the in-game lighting to better see while mapping.

Mapping view turns all mapping objects visible, this includes player spawn points, gas setters, maint generators & random item spawners.

Matrix check colours all matrices a different colour, this allows you to test and see whether objects and tiles are on the correct matrix. Your station should be entirely contained on one matrix, which each shuttle given its own matrix.
