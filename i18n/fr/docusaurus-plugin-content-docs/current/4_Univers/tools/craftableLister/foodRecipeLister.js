const fs = require('fs');
const path = require('path');
const utils = require('./listerUtils');

const prefabs = require('./prefabs');
const textures = require('./textures');

// basepath to the unityProject folder
const BASE_PATH = 'C:/git/unitystation/UnityProject';

const craftingManagerPath = `${BASE_PATH}/Assets/Resources/Prefabs/SceneConstruction/NestedManagers/craftingManager.prefab`;

const craftingManagerObj = utils.fileToObject(craftingManagerPath);
const subObj = craftingManagerObj.filter(
  (el) => el?.MonoBehaviour?.meals !== undefined
)[0];

const extractGuids = (arr) => {
  return arr.map((el) => el.guid);
};

const meals = extractGuids(subObj.MonoBehaviour.meals.recipeList);
const cuts = extractGuids(subObj.MonoBehaviour.cuts.recipeList);
const roll = extractGuids(subObj.MonoBehaviour.roll.recipeList);
const simplemeal = extractGuids(subObj.MonoBehaviour.simplemeal.recipeList);
const grind = extractGuids(subObj.MonoBehaviour.grind.grinderRecipeList);

// CRAWL THE RECIPES
const crawlRecipes = () => {
  return new Promise((resolve) => {
    const allRecipes = {};
    const scriptablePath = `${BASE_PATH}/Assets/Resources/ScriptableObjects/FoodRecipes`;
    let scriptableFiles = [];

    utils.walk(scriptablePath, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      // only the .asset interest us
      scriptableFiles = res.filter((arg) => arg.indexOf('asset.meta') !== -1);

      scriptableFiles.forEach((file) => {
        const metaObj = utils.fileToObject(file)[0];
        const recipeObj = utils.fileToObject(file.replace('.meta', ''));
        const outputId = recipeObj[0].MonoBehaviour.Output.guid;

        const ingredients = recipeObj[0].MonoBehaviour.Ingredients;

        allRecipes[metaObj.guid] = {
          outputId: outputId,
          ingredients
        };
      });
      resolve(allRecipes);
    });
  });
};

// CRAWL THE REAGENTS FOR THE GRINDER
const crawlReagents = () => {
  return new Promise((resolve) => {
    const reagentObjects = {};

    const reagentsPath = `${BASE_PATH}/Assets/Resources/ScriptableObjects/Chemistry/Reagents/`;
    utils.walk(reagentsPath, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      // only the .asset interest us
      reagentsFiles = res.filter((arg) => arg.indexOf('.asset.meta') !== -1);

      // parse all the reagents and their names!
      reagentsFiles.forEach((file) => {
        const reagentMeta = utils.fileToObject(file)[0];
        const reagentAsset = utils.fileToObject(file.split('.meta')[0])[0];
        const reagentGuid = reagentMeta.guid;

        reagentObjects[reagentGuid] = {
          name: reagentAsset.MonoBehaviour.displayName,
          description: reagentAsset.MonoBehaviour.description
        };
      });
      resolve(reagentObjects);
    });
  });
};

const init = async () => {
  const recipes = await crawlRecipes();
  const reagents = await crawlReagents();

  const finalMeals = meals.map((mealId) => {
    return {
      outputPrefab: prefabs[recipes[mealId].outputId],
      ingredients: recipes[mealId].ingredients
        .map(
          (ingredient) =>
            `${ingredient.requiredAmount} ${ingredient.ingredientName}`
        )
        .join(',')
    };
  });

  const finalSimplemeals = simplemeal.map((mealId) => {
    return {
      outputPrefab: prefabs[recipes[mealId].outputId],
      ingredients: recipes[mealId].ingredients
        .map(
          (ingredient) =>
            `${ingredient.requiredAmount} ${ingredient.ingredientName}`
        )
        .join(', ')
    };
  });

  const finalCuts = cuts.map((mealId) => {
    return {
      outputPrefab: prefabs[recipes[mealId].outputId],
      ingredients: recipes[mealId].ingredients
        .map(
          (ingredient) =>
            `${ingredient.requiredAmount} ${ingredient.ingredientName}`
        )
        .join(', ')
    };
  });

  const finalRolls = roll.map((mealId) => {
    return {
      outputPrefab: prefabs[recipes[mealId].outputId],
      ingredients: recipes[mealId].ingredients
        .map(
          (ingredient) =>
            `${ingredient.requiredAmount} ${ingredient.ingredientName}`
        )
        .join(', ')
    };
  });

  const finalGrind = grind.map((mealId) => {
    const reagentId = recipes[mealId].outputId;
    return {
      outputPrefab: {
        name: reagents[reagentId].name,
        description: reagents[reagentId].description
      },
      ingredients: recipes[mealId].ingredients
        .map(
          (ingredient) =>
            `${ingredient.requiredAmount} ${ingredient.ingredientName}`
        )
        .join(', ')
    };
  });

  fs.mkdir('foods', () => {});
  fs.mkdir('foods/images', () => {});

  let finalMd = '';
  finalMd += recipeListToMd('MicroWave', finalMeals) + '\r\n\r\n';
  finalMd += recipeListToMd('Knife', finalCuts) + '\r\n\r\n';
  finalMd += recipeListToMd('Rolling pin', finalRolls) + '\r\n\r\n';
  finalMd += recipeListToMd('Combined', finalSimplemeals) + '\r\n\r\n';

  finalMd += recipeListToMd('Grinder', finalGrind) + '\r\n\r\n';

  if (fs.existsSync('foods/foods.txt')) fs.unlinkSync('foods/foods.txt');
  fs.writeFile('foods/foods.txt', finalMd, () => {});

//  console.log('foodImages', allFoodImages);
};

const recipeListToMd = (title, recipes) => {
  let finalText = '';
  finalText += `## ${title} \r\n`;
  finalText += '| Picture | Name | Ingredients | Description | \r\n';
  finalText += '| --- | --- | --- | --- | \r\n';
  recipes.forEach((meal) => {
    const pngFile = meal?.outputPrefab?.spritePng;
    if (pngFile) {
      // remove image from all foods
      const pngIndex = allFoodImages.indexOf(path.basename(pngFile));
      if (pngIndex !== -1) {
        allFoodImages.splice(pngIndex, 1);
      }

      fs.copyFile(pngFile, `foods/images/${path.basename(pngFile)}`, (err) => {
        if (err) {
          console.log('err', err);
        }
      });
    }
    finalText += `| ![${meal.outputPrefab.name}](${path.basename(
      pngFile || ''
    )}) |`;
    finalText += ` ${meal.outputPrefab.name} |`;
    finalText += ` ${meal.ingredients} |`;
    finalText += ` ${meal.outputPrefab.initialDescription || 'N/A'} | \r\n`;
  });
  return finalText;
};

const allFoodImages = [];
Object.values(textures).map(pngUrl => {
  if (pngUrl.indexOf('items\\food') !== -1) {
    allFoodImages.push(path.basename(pngUrl));
  }
});
// console.log(allFoodImages);

init();
