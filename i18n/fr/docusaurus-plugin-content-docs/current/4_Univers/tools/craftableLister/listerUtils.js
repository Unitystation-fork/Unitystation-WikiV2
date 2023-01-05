const fs = require('fs');
const path = require('path');
const jsyaml = require('./js-yaml.min.js');

/**
 * Reads all the files in a folder and it's subfolders recursively
 * @param {*} dir path to folder
 * @param {*} done - callback function. 2 args called, err and an array with all the files
 */
const walk = function (dir, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let i = 0;
    (function next () {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

/**
 * Extracts a recipe from a given file path
 * @param {*} fileName - path to the .asset file
 * @returns(object)
 */
const extractRecipeFromScriptableObjectFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName).toString();

  const lines = fileContents.split('\r\n');
  const recipe = {
    name: '',
    ingredients: '',
    prefabId: ''
  };

  let isCraftable = false;
  lines.forEach((line) => {
    // hardcoded as per unity saving scheme (2 spaces)!
    if (line.indexOf('Name: ') === 2) {
      recipe.name = line.split('Name: ')[1];
    }

    if (line.indexOf('requiredAmount: ') !== -1) {
      recipe.ingredients += `${line.split('requiredAmount: ')[1]} `;
      isCraftable = true;
    }

    if (line.indexOf('ingredientName: ') !== -1) {
      recipe.ingredients += `${line.split('ingredientName: ')[1]} + `;
      isCraftable = true;
    }

    if (line.indexOf('Output: ') !== -1) {
      recipe.prefabId = line.split('guid: ')[1].split(',')[0];
    }
  });

  recipe.ingredients = recipe.ingredients.slice(
    0,
    recipe.ingredients.length - 3
  );

  if (isCraftable) {
    return recipe;
  } else {
    return null;
  }
};

/**
 * Reads the prefab id from a given fileName
 * @param {string} fileName
 */
const extractPrefabData = (fileName) => {
  const metaContents = fs.readFileSync(fileName).toString();
  const prefabId = metaContents.split('guid: ')[1].split('\r\n')[0];

  let prefabContents;
  try {
    prefabContents = fs.readFileSync(fileName.split('.meta')[0]).toString();
  } catch {
    // edge case for .meta files with no prefab (folders)
    return null;
  }

  let spriteId = null;
  //  let spriteSheetId = null;

  if (prefabContents.indexOf('m_Sprite') !== -1) {
    try {
      spriteId = prefabContents
        .split('m_Sprite')[1]
        .split('guid: ')[1]
        .split(',')[0];
    } catch {
      // edge case for prefabs with no sprites. the fk are those?
    }
  }

  if (spriteId === null && prefabContents.indexOf('PresentSpriteSet') !== -1) {
    try {
      spriteId = prefabContents
        .split('PresentSpriteSet')[1]
        .split('guid: ')[1]
        .split(',')[0];
    } catch {
      // edge case for prefabs with no sprites. the fk are those?
    }
  }

  // try to extract the nutritionLevel
  // propertyPath: NutritionLevel;
  // value: 113;
  let nutritionLevel = null;
  if (prefabContents.indexOf('NutritionLevel') !== -1) {
    nutritionLevel = prefabContents
      .split('NutritionLevel')[1]
      .split('value: ')[1]
      .split('\r\n')[0];
  }

  // try to extract the initialDescription
  // propertyPath: initialDescription
  // value: A base for any self-respecting burger.
  let initialDescription = null;
  if (prefabContents.indexOf('initialDescription') !== -1) {
    initialDescription = prefabContents
      .split('initialDescription')[1]
      .split('value: ')[1]
      .split('objectReference')[0]
      .replace('\r\n', '')
      .trim();

    while (initialDescription.indexOf('  ') !== -1) initialDescription = initialDescription.replace('  ', ' ');
  }

  // try to extract the prefab name
  // propertyPath: m_Name
  // value: AstrotamePack
  let name = null;
  if (prefabContents.indexOf('propertyPath: m_Name') !== -1) {
    try {
      name = prefabContents
        .split('propertyPath: m_Name')[1]
        .split('value: ')[1]
        .split('\r\n')[0];
    } catch {
    }
  }

  // try to extract the source prefab, if he has one
  // m_SourcePrefab: {fileID: 100100000, guid: bdbfea1235c0674488cd2a61b2e9cfa4, type: 3}
  let sourcePrefabId = null;
  if (spriteId === null && prefabContents.indexOf('m_SourcePrefab') !== -1) {
    try {
      sourcePrefabId = prefabContents
        .split('m_SourcePrefab')[1]
        .split('guid: ')[1]
        .split(',')[0];
    } catch {
      // edge case for prefabs with no sprites. the fk are those?
      // return null;
    }
  }

  //  if (spriteId === null) return null;

  return {
    prefabId,
    sourcePrefabId,
    name,
    spriteId,
    nutritionLevel,
    initialDescription
  };
};

const extractTextureData = (fileName) => {
  const pngMetaContents = fs.readFileSync(fileName).toString();
  const textureId = pngMetaContents.split('guid: ')[1].split('\r\n')[0];

  const pngFileName = fileName.replace('.meta', '').replace('.asset', '');
  return {
    textureId,
    pngFileName
  };
};

/**
 * Reads a yaml unity file and returns an object
 */
const fileToObject = (filePath) => {
  const fileContents = fs.readFileSync(filePath).toString();

  // fileContents = fileContents.split('MonoBehaviour')[0];

  let f2 = fileContents.replace(new RegExp(/%TAG(.*?)\n/gms), '');
  f2 = f2.replace(new RegExp(/!u!(.*?)\n/gms), '');
  f2 = f2.replace(new RegExp(/---/gms), '---\r\n');

  // clean up the tags so yaml doesn't shit itself

  // if (fileContents.indexOf('MonoBehaviour:') !== -1) {
  //   fileContents = fileContents.split('MonoBehaviour:');
  //   fileContents.shift();
  //   fileContents = "MonoBehaviour:" + fileContents.join('MonoBehaviour:');
  // }

  const obj = jsyaml.safeLoadAll(f2);

  // if (obj.length > 1) {
  //   console.log('MANY ', filePath)
  // }

  obj.rawText = fileContents;
  obj[0].rawText = fileContents;
  return (obj);
};

/**
 * Loads a list of prefa
 */
const loadPrefabs = (files) => {
  const dictionary = {};
  files.forEach(file => {
    const prefabMetaObject = fileToObject(file)[0];
    const prefabObject = fileToObject(file.split('.meta')[0]);
    dictionary[prefabMetaObject.guid] = prefabObject;
  });
  return dictionary;
};

module.exports = {
  walk,
  fileToObject,
  loadPrefabs,
  // refactor these functions below. they are too specific for food!
  extractRecipeFromScriptableObjectFile,
  extractPrefabData,
  extractTextureData
};
