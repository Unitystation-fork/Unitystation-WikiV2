To play, you need to download two items.
The StationHub, at launch you will have to create an account, validate the email you received and connect.
You will then be taken to the HUB where you can download several versions of the game: one stable and one testing.
Once you have downloaded the version you can connect.
Create a character, (remember to save the serialized one in a txt file), check your job preferences and antag and you are ready to go. 
https://github.com/unitystation/stationhub/releases

## Windows ##
In my documents/Games/ :
- Create the "Unitystation" folder
- Download the Zip "win" [Win.zip](https://github.com/unitystation/stationhub/releases/latest/) and place it in the folder previously created.
- Then right click on the zip, and click on "extract here". ([7zip](https://www.7-zip.org/a/7z2107-x64.msi) is highly recommended) 
You should have an executable "StationHub.exe".
To create a shortcut on the desktop, right click => send to => desktop.

## GNU_Linux ##
[Ctrl] + [Alt] + [T]
```bash
wget https://raw.githubusercontent.com/Peulleieoyukino/UnitySationInstaller/main/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh; sudo chmod 750 ~/UnityStationInstaller.sh; sudo ~/UnityStationInstaller.sh
```
the shortcut will be in your Menu/Game 

## MacOS ##
 1. **Command(⌘) + [Space]** write "terminal" and validated with [enter] (⏎)
 2. Copy past this line 
```properties
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 
```
 3. Then
```properties
brew install wget
```
 4.  Then
```bash
mkdir -p ~/Games/Unitystation/ ; cd ~/Games/Unitystation/ ; wget https://github.com/unitystation/stationhub/releases/download/930/osx930.zip ; wget https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png; unzip *.zip ; rm -rfv *.zip ./ ;sudo chmod -R 750 ./StationHub ; killall Terminal
```
To start the game, just double click on "stationHub".
#ln -s ~/Applications/UnityStation

## Requies ##
4Gb Ram (8 recommended)
i5 (i7 recommended)
~150-200Mio Hdd


