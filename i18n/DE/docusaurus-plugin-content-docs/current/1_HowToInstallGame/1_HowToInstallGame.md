---
title: Wie man das Spiel installiert
sidebar_position: 2
---
Für das Spiel benötigen Sie zwei Komponenten.

1. StationHub: Dort müssen SIe sich mit ihrem Konto anmelden. Falls Sie noch kein Konto besitzen, müssen Sie ein Konto registrieren. Folgen Sie den Anweisungen in der E-Mail, die an Sie gesendet wurde.

Sie werden dann zum HUB weitergeleitet, wo Sie nun aus mehreren Versionen des Spieles auswählen können:

1.  eine stabile Version (für die meisten Nutzer empfohlen)

2.  eine Testversion (nur für erfahrene Nutzer, diese Version kann Fehler enthalten!)

Sobald die entsprechende Version  heruntergeladen wurde, können Sie sich anmelden.

Erstellen Sie einen Charakter (Denken Sie daran, die Seriennummer in einer txt-Datei zu speichern).

Anschließend überprüfen Sie Ihre Job-Einstellungen und den Tag, danach können Sie dirkt einsteigen und loslegen.

  [https://github.com/unitystation/stationhub/releases](https://github.com/unitystation/stationhub/releases)

  
# Windows 

Für Windows benötigen Sie noch eine Software, die komprimierte Dateien entpacken kann.

Wir empfehlen hierfür [7zip]([https://www.7-zip.org/a/7z2107-x64.msi](https://www.7-zip.org/a/7z2107-x64.msi)).

7-ZIP ist eine freie Software mit offenem Quelltext, die alle gängigen Dateiformate unterstützt. Das Programm darf auf allen, egal ob privat oder gewerblich genutzten, Computern verwendet werden.
  
In "Meine Dokumente"/Games/ :

- Erstellen Sie den Ordner "Unitystation".

  - Laden Sie die Zip-Datei "win" [Win.zip] ([https://github.com/unitystation/stationhub/releases/latest/](https://github.com/unitystation/stationhub/releases/latest/)) herunter und legen Sie die Datei im zuvor erstellten Ordner ab.

- Klicken Sie nun mit der rechten Maustaste auf die Zip-Datei und klicken Sie auf "Hier entpacken". (Wir verwenden [7zip]([https://www.7-zip.org/a/7z2107-x64.msi](https://www.7-zip.org/a/7z2107-x64.msi)))

Sie sollten nun eine ausführbare Datei "StationHub.exe" haben.

Um eine Verknüpfung auf dem Desktop zu erstellen, klicken Sie mit der rechten Maustaste => Senden an => Desktop.


# GNU_Linux 

[Ctrl] + [Alt] + [T] 
```bash
wget  https://raw.githubusercontent.com/Unitystation-fork/Unitystation-Others/main/Installation-Script/UnityStationInstaller.sh -O ~/UnityStationInstaller.sh ; sudo chmod 750 ~/UnityStationInstaller.sh ; sudo ~/UnityStationInstaller.sh
```
Die Verknüpfung befindet sich dann in Ihrem Menü/Spiel
Oder verwenden Sie das Flatpak:

[https://flathub.org/apps/details/org.unitystation.StationHub](https://flathub.org/apps/details/org.unitystation.StationHub)

  

# MacOS #

1. Drücken Sie **Befehl (⌘) + Leertaste**, schreiben Sie "terminal" und bestätigen Sie mit **Enter** (⏎).

2. Fügen Sie diese Zeile in das Terminal ein und bestätigen Sie mit **Enter**. Sie lädt die neueste Version von StationHub herunter, entpackt sie in `~/Games/Unitystation` und kopiert sie in den Ordner „Programme“ (Applications):

```bash
mkdir -p ~/Games/Unitystation && cd ~/Games/Unitystation && curl -fL -o StationHub.zip "$(curl -fsSL https://api.github.com/repos/unitystation/stationhub/releases/latest | grep -o 'https://[^"]*/osx[0-9]*\.zip' | head -n 1)" && unzip -o StationHub.zip && tar -xf StationHub.tar && rm -f StationHub.zip StationHub.tar && cp -R StationHub.app /Applications/
```

Um das Spiel zu starten, öffnen Sie **StationHub** im Ordner „Programme“ (oder im Launchpad).

Um StationHub später zu aktualisieren, führen Sie dieselbe Zeile erneut aus.

# Anforderungen #

-   OS: Linux / Windows / MacOS
-   Prozessor: Intel Core i5 (Intel Core i7 empfohlen)
-   Memory: 4 GB RAM (8 GB RAM empfohlen)
-   Speicher: ~150-200 MB vorhandener HD Platz
