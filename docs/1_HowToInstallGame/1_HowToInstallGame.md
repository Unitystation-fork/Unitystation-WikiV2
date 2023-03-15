---
title: How to install game
sidebar_position: 2
---

To play, you need to download two items.

The StationHub, at launch you will have to create an account, validate the email you received and connect.

You will then be taken to the HUB where you can download several versions of the game: one stable and one testing.

Once you have downloaded the version you can connect.

Create a character, (remember to save the serialized one in a txt file), check your job preferences and antag and you are ready to go.

https://github.com/unitystation/stationhub/releases

## Windows ##
In "my documents"/Games/ :

- Create the "Unitystation" folder

- Download the Zip "win" [Win.zip](https://github.com/unitystation/stationhub/releases/latest/) and place it in the folder previously created.

- Then right click on the zip, and click on "extract here". ([7zip](https://www.7-zip.org/a/7z2107-x64.msi) is highly recommended)

You should have an executable "StationHub.exe".

To create a shortcut on the desktop, right click => send to => desktop.

## GNU_Linux ##

[Ctrl] + [Alt] + [T]
```bash
wget  https://raw.githubusercontent.com/Unitystation-fork/Unitystation-Others/main/Installation-Script/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh ; sudo chmod 750 ~/UnityStationInstaller.sh ; sudo ~/UnityStationInstaller.sh
```
the shortcut will be in your Menu/Game

or use the flatpak
https://flathub.org/apps/details/org.unitystation.StationHub

## MacOS ##
 1. **Command(⌘) + [Space]** write "terminal" and validated with [enter] (⏎)
 2.  Copy past this line
```bash
mkdir -p ~/Games/Unitystation ; cd ~/Games/Unitystation ; curl -O https://github.com/unitystation/stationhub/releases/download/931/osx931.zip ; curl -O https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png; unzip *.zip ; rm -rfv *.zip ./ ; chmod -R 750 ./StationHub ; exit
```
To start the game, just double click on "stationHub". in your game folder




ln -s ~/Applications/UnityStation




## Requies ##

4Gb Ram (8 recommended)

i5 (i7 recommended)

~150-200Mio Hdd


