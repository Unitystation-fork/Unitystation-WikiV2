const fs = require('fs');
const path = require('path');
const utils = require('./listerUtils');

const prefabs = require('./prefabs');
const textures = require('./textures');

// basepath to the unityProject folder
const BASE_PATH = 'C:/git/unitystation/UnityProject';

const seeds = {};

const getObjectDeepProp = (theObject, propName) => {
  let result = null;
  if (theObject[propName] !== undefined) return theObject[propName];

  if (Array.isArray(theObject)) {
    theObject.forEach(el => {
      result = null || getObjectDeepProp(el, propName);
    });
  } else if (typeof theObject === 'object') {
    for (const key in theObject) {
      result = null || getObjectDeepProp(theObject[key], propName);
    }
  }

  return result;

  // if (theObject instanceof Array) {
  //   for (let i = 0; i < theObject.length; i++) {
  //     result = getObject(theObject[i]);
  //     if (result) {
  //       break;
  //     }
  //   }
  // } else {
  //   for (const prop in theObject) {
  //     if (prop == propName) {
  //       return theObject[prop];
  //     }
  //     if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
  //       result = getObject(theObject[prop]);
  //       if (result) {
  //         break;
  //       }
  //     }
  //   }
  // }
  // return result;
};

// CRAWL THE RECIPES
const crawlSeeds = () => {
  return new Promise((resolve) => {
    const seedObj = {};
    const seedPath = `${BASE_PATH}/Assets/Resources/Prefabs/Items/Botany/Seeds`;

    utils.walk(seedPath, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      // only the .asset interest us
      metaFiles = res.filter((arg) => arg.indexOf('prefab.meta') !== -1);

      metaFiles.forEach((file) => {
        const metaObj = utils.fileToObject(file)[0];
        const seedPrefab = utils.fileToObject(file.replace('.meta', ''));
        try {
          const modifications = seedPrefab[0].PrefabInstance.m_Modification.m_Modifications;

          // const name = seedPrefab.rawText.split('initialName')[1]
          //   .split('value: ')[1]
          //   .split('\n')[0]
          //   .replace(new RegExp(/\r/g), '');

          const name = modifications.filter(el => el.propertyPath === 'initialName')[0].value;

          const description = modifications.filter(el => el.propertyPath === 'initialDescription')[0]?.value;

          // const produceGuid = modifications.filter(el => el.propertyPath === 'plantData.ProduceObject')[0]?.objectReference.guid;
          // const treeSpriteId = modifications.filter(el => el.propertyPath === 'plantData.FullyGrownSpriteSO')[0]?.objectReference.guid;

          const produceGuid = seedPrefab.rawText.split('plantData.ProduceObject')[1]
            ?.split('guid: ')[1]
            ?.split(',')[0];

          const treeSpriteId = seedPrefab.rawText.split('plantData.FullyGrownSpriteSO')[1]
            ?.split('guid: ')[1]
            ?.split(',')[0];

          const spriteId = seedPrefab.rawText.split('m_Sprite')[1]
            ?.split('guid: ')[1]
            ?.split(',')[0];

          let mutations = modifications.filter(el => el.propertyPath.indexOf('plantData.MutatesInToGameObject') !== -1);
          mutations = mutations
            .map(el => el.objectReference.guid)
            .map(el => prefabs[el])
            .filter(el => el !== undefined);

          // const mutationsIds = seedPrefab.rawText.split('plantData.MutatesInToGameObject');
          // mutationsIds.shift();
          // mutationsIds = mutationsIds.map(el => el.split[])
          //   .split('guid: ')[1]
          //   .split(',')[0];

          seedObj[metaObj.guid] = {
            name,
            produceGuid,
            producePrefab: prefabs[produceGuid],
            produceSprite: prefabs[produceGuid],
            treeSpriteId,
            treeSprite: textures[treeSpriteId],
            spriteId,
            description,
            mutations
          };
        } catch (err) {
          console.log('bull', file);
        }
      });
      resolve(seedObj);
    });
  });
};

const init = async () => {
  const seeds = await crawlSeeds();

  fs.mkdir('botany', () => {});
  fs.mkdir('botany/images', () => {});

  let finalMd = '';
  finalMd += '| Picture | Name | Description | Ready to harvest | Produce | Mutates Into | \r\n';
  finalMd += '| --- | --- | --- | --- | --- | --- | \r\n';

  for (const key in seeds) {
    const seed = seeds[key];
    const picture = path.basename(textures[seed.spriteId] || '');
    const harvestPicture = path.basename(seed.treeSprite || '');
    //    const mutations = seed.mutations.map(el => el.name);
    const producePng = path.basename(seed.producePrefab?.spritePng || '');

    let mutationsMd = seed.mutations.map(el => {
      const mutatedPngPath = el.spritePng;
      mutatedPngPath && fs.copyFile(mutatedPngPath, `botany/images/${path.basename(mutatedPngPath)}`, (err) => {
        if (err) {
          console.log('err', err);
        }
      });
      return `![${el.name}](${path.basename(mutatedPngPath)})`;
    });

    mutationsMd = mutationsMd.join(' ');

    textures[seed.spriteId] && fs.copyFile(textures[seed.spriteId], `botany/images/${path.basename(textures[seed.spriteId])}`, (err) => {
      if (err) {
        console.log('err', err);
      }
    });
    seed.treeSprite && fs.copyFile(seed.treeSprite, `botany/images/${path.basename(seed.treeSprite)}`, (err) => {
      if (err) {
        console.log('err', err);
      }
    });
    seed.producePrefab?.spritePng && fs.copyFile(seed.producePrefab?.spritePng, `botany/images/${path.basename(seed.producePrefab?.spritePng)}`, (err) => {
      if (err) {
        console.log('err', err);
      }
    });

    finalMd += `| ![${seed.name}](${picture}) |`;
    finalMd += ` ${seed.name} |`;
    finalMd += ` ${seed.description} |`;
    finalMd += ` ![harvest sprite](${harvestPicture}) |`;
    finalMd += ` ${seed.producePrefab?.name || 'N/A'} ![${seed.producePrefab?.name || ''}](${producePng}) |`;
    finalMd += ` ${mutationsMd} |`;
    finalMd += '\r\n';
  }

  if (fs.existsSync('botany/botany.md')) fs.unlinkSync('botany/botany.md');
  fs.writeFile('botany/botany.md', finalMd, () => {});
};

init();
