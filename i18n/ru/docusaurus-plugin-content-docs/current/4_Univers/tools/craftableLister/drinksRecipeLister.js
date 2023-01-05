const fs = require('fs');
const path = require('path');
const utils = require('./listerUtils');

const textures = require('./textures');

// list of all the reactions
let reactionFiles = []; // .meta files
const reactionObjects = []; // .asset objects

// list of all reagents
let reagentsFiles = []; // .meta files
const reagentObjects = []; // .asset objects

let morphableGlassObject;
const glassKeys = {};

/**
 * The how-to. not in this particular order
 *
 * 1) read all the reagents (ingredients), even toxins
 * 2) read all the reactions
 * 4) UNIQUE STEP FOR DRINKS
 * read the morphableglass file and map them
 * 5) put them all together. each reaction outputs a guid. we search that in the morphableglass and take
 * it's description and spritesheet. search the ingredients in the reagents
 * after we find a recipe, we delete it from the glassKeys
 *
 * 6). whatever is left in the glassKeys dictionary are the non-craftables
 * we output those separately
 *
 * // as of december 2020, there are 121 recipes and 51 simple reagents!
 */

let foldersRead = 0;

// basepath to the unityProject folder
const basePath = 'C:/git/unitystation/UnityProject';

// 1. load the morphableglass file
morphableGlassObject = utils.fileToObject(basePath + '/Assets/Resources/ScriptableObjects/Chemistry/Visual/DrinkingGlassMorphable.asset')[0];

// step 2. read the reaction files
const reactionsPath = basePath + '/Assets/Resources/ScriptableObjects/Chemistry/Reactions';
utils.walk(reactionsPath, (err, res) => {
  // only the .asset interest us
  reactionFiles = res.filter(
    (arg) => arg.indexOf('.asset') !== -1 && arg.indexOf('.meta') === -1
  );
  foldersRead++;
  init();
});

// step 3. load all the reagents
const reagentsPath = basePath + '/Assets/Resources/ScriptableObjects/Chemistry/Reagents/';
utils.walk(reagentsPath, (err, res) => {
  // only the .asset interest us
  reagentsFiles = res.filter(
    (arg) => arg.indexOf('.asset.meta') !== -1
  );
  foldersRead++;

  init();
});

const init = () => {
  if (foldersRead !== 2) {
    return;
  }

  // 1. parse the glassKeys
  morphableGlassObject.MonoBehaviour.spritesData.m_keys.forEach((el, index) => {
    glassKeys[el.guid] = morphableGlassObject.MonoBehaviour.spritesData.m_values[index];
  });

  // parse all the reagents and their names!
  reagentsFiles.forEach(file => {
    const reagentMeta = utils.fileToObject(file)[0];
    const reagentAsset = utils.fileToObject(file.split('.meta')[0])[0];
    const reagentGuid = reagentMeta.guid;

    reagentObjects[reagentGuid] = {
      name: reagentAsset.MonoBehaviour.displayName,
      description: reagentAsset.MonoBehaviour.description
    };
  });

  // parse all the reactions and ingredient names
  const failedReactions = [];
  reactionFiles.forEach(file => {
    const reaction = utils.fileToObject(file)[0];
    if (reaction.MonoBehaviour.results.m_keys.length !== 0) {
      const reactionGuid = reaction.MonoBehaviour.results.m_keys[0].guid;
      try {
        reactionObjects[reactionGuid] = {
          name: reagentObjects[reactionGuid].name,
          description: glassKeys[reactionGuid].CustomDescription,
          spriteId: glassKeys[reactionGuid].MainSprite.guid,
          ingredients: reaction.MonoBehaviour.ingredients.m_keys.map(el => reagentObjects[el.guid].name)
        };
        const amounts = reaction.rawText
          .split('ingredients:')[1]
          .split('m_values:')[1]
          .split('\r\n')[0]
          .trim()
          .replace(new RegExp(/0/gi), '')
          .split('')
          .map(el => parseInt(`0x${el}`));
        reactionObjects[reactionGuid].amounts = amounts;
      } catch {
        failedReactions.push(reaction.MonoBehaviour.m_Name);
      }
    }
  });
  Object.values(reactionObjects).forEach(reaction => {
    reaction.spriteFile = textures[reaction.spriteId];
  });

  fs.mkdir('drinks', () => {});
  fs.mkdir('drinks/images', () => {});

  // OUTPUT THE CRAFTABLE RECIPES!
  let allDrinks = '| Picture | Name | Recipe | Description |\r\n';
  Object.values(reactionObjects).forEach((reaction) => {
    const pngFilePath = reaction.spriteFile.split('\\').pop();

    fs.copyFile(reaction.spriteFile, `drinks/images/${path.basename(reaction.spriteFile)}`, (err) => {
      if (err) {
        console.log('err', err);
      }
    });

    let ingredients = '';
    for (let i = 0; i < reaction.ingredients.length; i++) {
      ingredients += `${reaction.amounts[i]} ${reaction.ingredients[i]}, `;
    }
    ingredients = ingredients.split(',');
    ingredients.pop();
    ingredients = ingredients.join(',').trim(); // remove last comma;

    // create the wiki .md table

    allDrinks += `| ![${reaction.name}](${pngFilePath}) |`;
    allDrinks += ` ${reaction.name} |`;
    allDrinks += ` ${ingredients} |`;
    allDrinks += ` ${reaction.description} |\r\n`;
  });
  if (fs.existsSync('drinks/drinks.txt')) fs.unlinkSync('drinks/drinks.txt');
  fs.writeFile('drinks/drinks.txt', allDrinks, () => {});

  // remove the craftables from the glasses collection!
  Object.keys(reactionObjects).forEach(reactId => delete glassKeys[reactId]);
  for (const key in glassKeys) {
    const glass = glassKeys[key];
    const pngFile = textures[glass.MainSprite.guid];
    if (pngFile) {
      glass.pngFile = pngFile.split('\\').pop();
    }
  }

  // output the remaining glass shapes
  // non-craftable glasses (based on simple reagents, juice / alcohol)
  let simpleReagents = '| Picture | Name | Description |\r\n';
  Object.values(glassKeys).forEach((glass) => {
    const pngFullPath = textures[glass.MainSprite.guid];
    const pngFilePath = textures[glass.MainSprite.guid].split('\\').pop();
    fs.copyFile(pngFullPath, `drinks/images/${path.basename(pngFullPath)}`, (err) => {
      if (err) {
        console.log('err', err);
      }
    });

    simpleReagents += `| ![${glass.CustomName}](${pngFilePath}) |`;
    simpleReagents += ` ${glass.CustomName} |`;
    simpleReagents += ` ${glass.CustomDescription} |\r\n`;
  });
  if (fs.existsSync('drinks/simpleReagents.txt')) fs.unlinkSync('drinks/simpleReagents.txt');
  fs.writeFile('drinks/simpleReagents.txt', simpleReagents, () => {});
};
