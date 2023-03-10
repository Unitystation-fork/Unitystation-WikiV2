---
title: Как установить игру
sidebar_position: 2
---

Чтобы играть, вам нужно загрузить два элемента.
StationHub, при запуске вам нужно будет создать учётную запись, подтвердить полученную электронную почту и подключиться.
Затем вы попадете в HUB, где сможете загрузить несколько версий игры: стабильную и тестовую.
После загрузки версии вы можете подключиться.
Создайте персонажа (не забудьте сохранить сериализованного в txt-файле), проверьте настройки профессии и антагониста, и вы готовы к работе. 
https://github.com/unitystation/stationhub/releases

## Windows ##
В "Мои Документы/Игры/" :
- Создайте папку "Unitystation"
- Скачайте Zip-файл "win" [Win.zip](https://github.com/unitystation/stationhub/releases/latest/) и поместите его в ранее созданную папку.
- Затем щёлкните правой кнопкой мыши на zip-файле и выберите "извлечь здесь". (настоятельно рекомендуется использовать [7zip](https://www.7-zip.org/a/7z2107-x64.msi)) 
У вас должен появиться исполняемый файл "StationHub.exe".
Чтобы создать ярлык на рабочем столе, щелкните правой кнопкой мыши => отправить на => рабочий стол.

## GNU_Linux ##
[Ctrl] + [Alt] + [T]
```bash
wget  https://raw.githubusercontent.com/Unitystation-fork/Unitystation-Others/blob/main/Installation-Script/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh ; sudo chmod 750 ~/UnityStationInstaller.sh ; sudo ~/UnityStationInstaller.sh
```
ярлык будет находиться в вашем Меню/Игры 

## MacOS ##
 1. **Cmd(⌘) + [пробел]** напишите "terminal" и подтвердите [enter] (⏎)
 2. Скопируйте эту строку 
 
```properties
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 
```
 3. Затем

```properties
brew install wget
```

 4.  Затем
```bash
mkdir -p ~/Games/Unitystation/ ; cd ~/Games/Unitystation/ ; wget https://github.com/unitystation/stationhub/releases/download/930/osx930.zip ; wget https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png ; unzip *.zip ; rm -rfv *.zip ./ ;sudo chmod -R 750 ./StationHub ; killall Terminal
```
Чтобы начать игру, просто дважды щёлкните на "stationHub".
#ln -s ~/Applications/UnityStation

## Системные требования ##
4Гб оперативной памяти (рекомендуется 8Гб)
Процессор Core i5 (рекомендуется Core i7)
~150-200Mio Hdd
