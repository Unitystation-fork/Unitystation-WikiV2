const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { inherits } = require('util');
const utils = require('./listerUtils');
const prefabs = require('./prefabs');

const BASE_PATH = 'C:/git/unitystation/UnityProject';

const machineBoardFiles = [];
const machineBoardsDictionary = {};

const crawlScripts = () => {
  return new Promise(resolve => {
    const craftableMachines = {};

    const texturePath = BASE_PATH + '/Assets/Resources/ScriptableObjects/Construction/MachineParts';
    utils.walk(texturePath, (err, res) => {
      if (err) throw new Error(err);

      const metaFiles = res.filter(
        (arg) => arg.indexOf('.asset.meta') !== -1
      );

      metaFiles.forEach(file => {
        const scriptMetaFile = utils.fileToObject(file)[0];
        const scriptFile = utils.fileToObject(file.split('.meta')[0])[0];

        const machineId = scriptFile.MonoBehaviour.machine.guid;
        const machineName = prefabs[machineId]?.name;
        const machineSprite = prefabs[machineId]?.spritePng;
        let partsAreValid = true;
        const machineParts = scriptFile.MonoBehaviour.machineParts.map(el => {
          if (prefabs[el.basicItem.guid]?.name === undefined) { partsAreValid = false; }
          return {
            id: el.basicItem.guid,
            name: prefabs[el.basicItem.guid]?.name,
            amount: el.amountOfThisPart
          };
        });

        craftableMachines[scriptMetaFile.guid] = {
          machineId,
          machineName,
          machineSprite,
          machineParts,
          partsAreValid
        };
      }); // end read
      resolve(craftableMachines);
    }); // endwalk
  });
};

const init = async () => {
  const scripts = await crawlScripts();

  Object.values(scripts).forEach(script => {
    const file = prefabs[script.machineId]?.file;
    if (file !== undefined) {
      const machinePrefab = utils.fileToObject(file)[0];
      const boardId = machinePrefab.rawText
        .split('machineBoardPrefab')[1]
        ?.split('guid: ')[1]
        ?.split(',')[0]
        ?.trim();

      script.boardName = prefabs[boardId]?.name;
      script.boardImage = prefabs[boardId]?.spritePng;

      //      console.log('machine ', script.machineName, ' has a board ', script.boardName);
    } else {
      //      console.log('no prefab found for ', script.machineId);
    }
  });

  // DEV FUNCTION. LIST THE INVALID MACHINES
  const scriptIsInvalid = (script) => {
    return (script.boardImage === undefined ||
      script.boardName === undefined ||
      script.machineSprite === undefined ||
      script.partsAreValid === false);
  };

  fs.mkdir('machines', () => {});
  fs.mkdir('machines/images', () => {});

  let finalText = '| Machine | Parts |\r\n';
  finalText += '| --- | --- |\r\n';

  Object.values(scripts).forEach(script => {
    if (!scriptIsInvalid(script)) {
      //      console.log('------------ valid ', script.machineName);
      const machinePng = path.basename(script.machineSprite);
      fs.copyFile(script.machineSprite, `machines/images/${path.basename(script.machineSprite)}`, (err) => {});
      finalText += `| ${script.machineName} <br/> ![${script.machineName}](${machinePng}) |`;
      finalText += 'MACHINE BASE HARDCODED! <br/> ';
      finalText += `1 ${script.boardName} ![${script.boardName}](${path.basename(script.boardImage)}) <br/> `;
      fs.copyFile(script.boardImage, `machines/images/${path.basename(script.boardImage)}`, (err) => {});
      script.machineParts.forEach(part => {
        // let partPng = path.basename(textur)
        const partPng = path.basename(prefabs[part.id].spritePng);
        finalText += `${part.amount} ${part.name} ![${part.name}](${partPng}) <br/>`;
        fs.copyFile(prefabs[part.id].spritePng, `machines/images/${partPng}`, (err) => {});
      });
      finalText += ' | \r\n ';
    } else {
      console.log('invalid ', script);
    }
  });

  if (fs.existsSync('machines/machines.txt')) fs.unlinkSync('machines/machines.txt');
  fs.writeFile('machines/machines.txt', finalText, () => {});

  // machines.forEach(machine => {
  //   console.log(prefabs[machine.id]?.name);
  //   console.log(prefabs[machine.board]?.name);
  //   console.log('partsId', machine.machineParts);
  //   console.log('---');
  // });
};

init();
