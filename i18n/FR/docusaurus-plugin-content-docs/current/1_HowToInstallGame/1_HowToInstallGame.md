---
title: Comment Installer le jeu ?
sidebar_position: 2
---
Pour jouer, il vous faut télécharger deux éléments.

Le StationHub , au lancement il vous faudra créer un compte, valider l'email reçu et vous connecter.

Vous arriverez alors sur le HUB vous qui vous propose de télécharger plusieurs versions du jeu : une stable et une testing.

Une fois la version téléchargée vous pouvez vous connecter.

Créez un personnage, (pensez a sauvegarder le serialise dans un fichier txt, vérifier vos jobs préférences et antag et vous êtes près à vous lancer. 

https://github.com/unitystation/stationhub/releases

## Windows ##

Dans mes documents/Games/ :

- Créer le dossier "Unitystation"

- Télécharger le Zip "win" [Win.zip](https://github.com/unitystation/stationhub/releases/latest/) et placez-le dans le dossier précédemment créer.

- Faire ensuite un clic droit sur le Zip, et cliquer sur "extraire ici". ([7zip](https://www.7-zip.org/a/7z2107-x64.msi) est vivement recommandé) 

Vous devriez avoir un exécutable "StationHub.exe"

Pour créer un raccourci sur le bureau, faites un clic droit => envoyez vers => bureau.

## GNU_Linux ##
[Ctrl] + [Alt] + [T]
```bash
wget  https://raw.githubusercontent.com/Unitystation-fork/Unitystation-Others/main/Installation-Script/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh ; sudo chmod 750 ~/UnityStationInstaller.sh ; sudo ~/UnityStationInstaller.sh
```
le raccourcis sera dans votre Menu/Game 

## MacOS ##
 1. **Command(⌘) + [Space]** write "terminal" and validated with [enter] (⏎)
 2.  Copy past this line 
```bash
mkdir -p ~/Games/Unitystation ; cd ~/Games/Unitystation ; curl -O https://github.com/unitystation/stationhub/releases/download/930/osx930.zip ; curl -O https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png; unzip *.zip ; rm -rfv *.zip ./ ; chmod -R 750 ./StationHub ; exit
```
To start the game, just double click on "stationHub". in your game folder




ln -s ~/Applications/UnityStation

## Requies ##
4Gio de Ram (8 recommendé)
i5 (i7 recommandé)
~150-200Mio Hdd


