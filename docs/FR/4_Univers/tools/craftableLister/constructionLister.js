/* eslint-disable node/handle-callback-err */
const fs = require('fs');
const path = require('path');
const utils = require('./listerUtils');

const prefabs = require('./prefabs');
const textures = require('./textures');

// list of all the construction materials
let materialsFiles = []; // .meta files
let materialsDictionary = {};

// list of all the build
let buildFiles = []; // .meta files
const buildDictionary = {};

/**
load the c:\git\unitystation\UnityProject\Assets\Resources\ScriptableObjects\Construction\BuildList\

 */

let foldersRead = 0;

// basepath to the unityProject folder
const basePath = 'C:/git/unitystation/UnityProject';

// step 1> load the materials and their buildLists!
// c:\git\unitystation\UnityProject\Assets\Resources\Prefabs\Items\Construction\Materials\Resources\
const materialsPath = basePath + '/Assets/Resources/Prefabs/Items/Construction/Materials/Resources';
utils.walk(materialsPath, (err, res) => {
  // only the .asset interest us
  materialsFiles = res.filter(
    (arg) => arg.indexOf('.prefab.meta') !== -1
  );
  foldersRead++;
  init();
});

// step 2. read the build list files
const constructionPath = basePath + '/Assets/Resources/ScriptableObjects/Construction/BuildList';
utils.walk(constructionPath, (err, res) => {
  // only the .asset interest us
  buildFiles = res.filter(
    (arg) => arg.indexOf('.meta') !== -1
  );
  foldersRead++;
  init();
});

const init = () => {
  const finalListV2 = {};

  if (foldersRead !== 2) {
    return;
  }
  // STEP 1: read the materials and their corresponding build list
  materialsDictionary = utils.loadPrefabs(materialsFiles);
  Object.values(materialsDictionary).forEach(buildingMaterial => {
    const name = buildingMaterial.rawText
      .split('propertyPath: initialName')[1]
      ?.split('value: ')[1]
      ?.split('\n')[0]
      ?.replace('\r', '');

    const spriteId = buildingMaterial.rawText
      .split('propertyPath: m_Sprite')[1]
      ?.split('guid: ')[1]
      ?.split(',')[0];

    const buildListId = buildingMaterial.rawText
      .split('buildList')[1]
      ?.split('guid: ')[1]
      ?.split(',')[0];
    if (name && spriteId && buildListId) {
      finalListV2[name] = {
        spriteId,
        buildListId
      };
    }
  });

  buildFiles.forEach(file => {
    const buildMetaFile = utils.fileToObject(file)[0];
    const buildFile = utils.fileToObject(file.split('.meta')[0])[0];

    buildDictionary[buildMetaFile.guid] = buildFile.MonoBehaviour.entries;
  });

  for (const key in finalListV2) {
    const material = finalListV2[key];
    const craftables = buildDictionary[material.buildListId];
    if (!material.entries) material.entries = [];
    craftables.forEach(craftable => {
      material.entries.push({
        name: craftable.name,
        cost: craftable.cost,
        spritePng: prefabs[craftable.prefab.guid]?.spritePng
      });
    });
  };

  fs.mkdir('construction', () => {});
  fs.mkdir('construction/images', () => {});
  let finalTable = '';
  for (const key in finalListV2) {
    let categoryName = key;
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    let materialPng = textures[finalListV2[key].spriteId];
    fs.copyFile(materialPng, `construction/images/${path.basename(materialPng)}`, (err) => {
      if (err) {
        console.log('err', err);
      }
    });

    if (materialPng !== undefined) materialPng = materialPng?.split('\\').pop();
    finalTable += `## ${categoryName} ![${categoryName}](${materialPng}) \r\n`;
    finalTable += '| Picture | Name | Cost |\r\n';
    finalTable += '| ---- | ---- | ---- |\r\n';

    const craftables = finalListV2[key].entries;

    craftables.forEach(item => {
      const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);

      finalTable += `| ![${item.name}](${item.spritePng?.split('\\').pop()}) |`;
      finalTable += ` ${capitalizedName} |`;
      finalTable += ` ${item.cost} | \r\n`;

      if (item.spritePng) {
        fs.copyFile(item.spritePng, `construction/images/${path.basename(item.spritePng)}`, (err) => {
          if (err) {
            console.log('err', err);
          }
        });
      }
    });
    finalTable += '\r\n\r\n';
  }

  if (fs.existsSync('construction/construction.txt')) fs.unlinkSync('construction/construction.txt');
  fs.writeFile('construction/construction.txt', finalTable, () => {});
};
