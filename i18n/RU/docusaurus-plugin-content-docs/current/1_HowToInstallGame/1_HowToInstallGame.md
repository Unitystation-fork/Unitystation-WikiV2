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
wget  https://raw.githubusercontent.com/Unitystation-fork/Unitystation-Others/main/Installation-Script/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh ; sudo chmod 750 ~/UnityStationInstaller.sh ; sudo ~/UnityStationInstaller.sh
```
ярлык будет находиться в вашем Меню/Игры 

## MacOS ##
 1. Нажмите **Cmd (⌘) + пробел**, напишите «terminal» и подтвердите **Enter** (⏎).
 2. Вставьте эту строку и нажмите **Enter**. Она скачает последнюю версию StationHub, распакует её в `~/Games/Unitystation` и скопирует в папку «Программы» (Applications):
```bash
mkdir -p ~/Games/Unitystation && cd ~/Games/Unitystation && curl -fL -o StationHub.zip "$(curl -fsSL https://api.github.com/repos/unitystation/stationhub/releases/latest | grep -o 'https://[^"]*/osx[0-9]*\.zip' | head -n 1)" && unzip -o StationHub.zip && tar -xf StationHub.tar && rm -f StationHub.zip StationHub.tar && rm -rf /Applications/StationHub.app && cp -R StationHub.app /Applications/
```
Чтобы начать игру, откройте **StationHub** из папки «Программы» (или из Launchpad). Если копирование в «Программы» запрещено (учётная запись без прав администратора), откройте `StationHub.app` в папке `~/Games/Unitystation`.

Чтобы позже обновить StationHub, выполните эту же строку ещё раз.

## Системные требования ##
4Гб оперативной памяти (рекомендуется 8Гб)
Процессор Core i5 (рекомендуется Core i7)
~150-200Mio Hdd
