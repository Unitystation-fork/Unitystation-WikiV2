## Prerequisites

- You must have [node.js](https://nodejs.org/en/) installed.
- You must have the [UnityStation](https://github.com/unitystation/unitystation) project cloned.

## Setup

All the require a dictionary of all the prefabs and their corresponding sprites. This will take a long time at first, but will speed up all the listing processes to instant.

- textures.js (7Mb file, ~50k lines);
- prefabs.js (1Mb file, ~4k lines

  You must first generate these 2 files. Follow the instructions below.

1. edit textureCrawler.js and change this variable to point to the "UnityProject"! folder on your computer.
   > const basePath = 'C:/git/unitystation/UnityProject';
2. Open a bash console in the craftableLister folder (windows explorer, right click, Git Bash Here )
3. Run this command "node textureCrawler.js". this will generate the files mentioned above.

## Food Lister

It will output:

- a "recipes.txt" file containing a markdown table with all the food that can be crafted
- a "noncraftables.txt" file containinng a markdown table with all the food that is not craftable\*
- an "orphaned.txt" file containing a list of all the textures that have no prefab pointing to them

\*by craftable i mean it has no ingredients, but can still be found in the game (vendomat items, world items, items that can be spawned only by admins)

### How do i get it working?

1. edit the foodRecipesLister.js and change this variable to point to the "UnityProject"! folder on your computer.
   > var basePath = "C:/git/unitystation/UnityProject";
2. Open a bash console in the craftableLister folder (windows explorer, right click, Git Bash Here )
3. Run this command "node foodRecipeLister.js"

## Drinks Lister

It will output:

- a "drinks" folder, containing
  - a "drinks.txt" file containing all the drinks that can be crafted
  - a "simpleReagents.txt" file containinng all the simple reagents (juice, simple alcohol from machines)
  - a subfolder called "images"

### How do i get it working?

1. edit the drinksRecipeLister.js and change this variable to point to the "UnityProject"! folder on your computer.
   > var basePath = "C:/git/unitystation/UnityProject";
2. Open a bash console in the craftableLister folder (windows explorer, right click, Git Bash Here )
3. Run this command "node drinksRecipeLister.js"

## Construction

It will output:

- a "construction" folder, containing
  - a "construction.txt" file containing all the items that can be crafted with basic construction material (sheets, rods, wood, etc..)
  - a subfolder called "images"

### How do i get it working?

1. edit the constructionLister.js and change this variable to point to the "UnityProject"! folder on your computer.
   > var basePath = "C:/git/unitystation/UnityProject";
2. Open a bash console in the craftableLister folder (windows explorer, right click, Git Bash Here )
3. Run this command "node constructionLister.js"

## Botany lister

It will output:

- a "botany" folder, containing
  - a "botany.md" file containing all the seeds, images, produce and mutations
  - a subfolder called "images"

### How do i get it working?

1. edit the botanyLister.js and change this variable to point to the "UnityProject"! folder on your computer.
   > const BASE_PATH = "C:/git/unitystation/UnityProject";
2. Open a bash console in the craftableLister folder (windows explorer, right click, Git Bash Here )
3. Run this command "node botanyLister.js"
