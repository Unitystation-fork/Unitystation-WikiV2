Um zu spielen, müssen Sie zwei Elemente herunterladen.

Die StationHub, beim Start müssen Sie ein Konto erstellen, validieren Sie die E-Mail, die Sie erhalten haben und verbinden.

Sie werden dann zum HUB weitergeleitet, wo Sie mehrere Versionen des Spiels herunterladen können: eine stabile und eine Testversion.

Sobald du die Version heruntergeladen hast, kannst du dich verbinden.

Erstellen Sie einen Charakter (denken Sie daran, die Seriennummer in einer txt-Datei zu speichern), überprüfen Sie Ihre Job-Einstellungen und den Tag und schon können Sie loslegen. 

https://github.com/unitystation/stationhub/releases

## Windows ##
In "Meine Dokumente"/Games/ :

- Erstellen Sie den Ordner "Unitystation".

- Laden Sie die Zip-Datei "win" [Win.zip] (https://github.com/unitystation/stationhub/releases/latest/) herunter und legen Sie sie in dem zuvor erstellten Ordner ab.

- Klicken Sie dann mit der rechten Maustaste auf die Zip-Datei und klicken Sie auf "Hier entpacken". ([7zip](https://www.7-zip.org/a/7z2107-x64.msi) ist sehr empfehlenswert) 

Sie sollten nun eine ausführbare Datei "StationHub.exe" haben.

Um eine Verknüpfung auf dem Desktop zu erstellen, klicken Sie mit der rechten Maustaste => Senden an => Desktop.

## GNU_Linux ##

[Strg] + [Alt] + [T]
```bash
wget https://raw.githubusercontent.com/Peulleieoyukino/UnitySationInstaller/main/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh; sudo chmod 750 ~/UnityStationInstaller.sh; sudo ~/UnityStationInstaller.sh
```
die Verknüpfung befindet sich dann in Ihrem Menü/Spiel 

oder verwenden Sie das Flatpak
https://flathub.org/apps/details/org.unitystation.StationHub

## MacOS ##
 1. **Befehl(⌘) + [Leertaste]** schreibe "terminal" und bestätige mit [enter] (⏎)
 2.  Kopieren Sie diese Zeile ein 
```bash
mkdir -p ~/Games/Unitystation ; cd ~/Games/Unitystation ; curl -O https://github.com/unitystation/stationhub/releases/download/930/osx930.zip ; curl -O https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png; unzip *.zip ; rm -rfv *.zip ./ ; chmod -R 750 ./StationHub ; exit
```
Um das Spiel zu starten, doppelklicken Sie einfach auf "stationHub". in Ihrem Spielordner


ln -s ~/Applikationen/UnityStation



## Anforderungen ##

4Gb Ram (8 empfohlen)


i5 (i7 empfohlen)


~150-200Mio Festplatte
