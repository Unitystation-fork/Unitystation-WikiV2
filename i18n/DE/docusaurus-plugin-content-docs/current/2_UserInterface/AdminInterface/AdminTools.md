
{# {{tag>UI interface of the BROUILLON game admin tool}} #}
## Unitystation ![unityico](https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png?raw=true)
## Content ##

`├── 1 - Admin Tool`<br></br>
`│        ├── 1.1 - Spawn item`<br></br>
`│        ├── 1.2 -  Clone & delete Item`<br></br>
`│        └── 1.3 -  Variable Viewer`<br></br>
`├── 2 - Admin Menu`<br></br>
`│        ├── 2.1 - MHELP`<br></br>
`│        ├── 2.2 - [Admin Tool Panel]`<br></br>
`│        │        ├──  2.2a - Game Mode`<br></br>
`│        │        ├──  2.2b - Player Manager`<br></br>
`│        │        │        ├──  2.2b.1 - Kick`<br></br>
`│        │        │        ├──  2.2b.2 - Ban`<br></br>
`│        │        │        ├──  2.2b.3 - JobBan`<br></br>
`│        │        │        ├──  2.2b.4 - Smite`<br></br>
`│        │        │        ├──  2.2b.5 - Respawn`<br></br>
`│        │        │        ├──  2.2b.6 - Teleport Admin TO Player - Aghost`<br></br>
`│        │        │        ├──  2.2b.7 - Teleport Player TO Admin`<br></br>
`│        │        │        ├──  2.2b.8 - Teleport Player TO Admin`<br></br>
`│        │        │        ├──  2.2b.9 - Teleport Player TO Admin - ALL`<br></br>
`│        │        │        ├──  2.2b.10 - heal`<br></br>
`│        │        │        └──  2.2b.11 - mentor`<br></br>
`│        │        ├──  2.2c - CentCom`<br></br>
`│        │        ├──  2.2d - Events Managers`<br></br>
`│        │        ├──  2.2e - Round Managers`<br></br>
`│        │        ├──  2.2f - Dev Tools`<br></br>
`│        │        └──  2.2g - Server Settings`<br></br>
`│        ├── 2.3 - ACHAT`<br></br>
`│        ├── 2.4 - ALOGS`<br></br>
`│        ├── 2.5 - AHELP`<br></br>
`│        ├── 2.6 - [INFO]`<br></br>
`│        ├── 2.7 - Global Sound`<br></br>
`│        ├── 2.8 - Global Music`<br></br>
`│        ├── 2.9 - AGHOST`<br></br>
`│        └── 2.10 - ALERTS`<br></br>
`└── 3 - CREDIT`<br></br>

## 1 - Administrator-Symbolleiste
Die Administrator-Symbolleiste befindet sich oben rechts auf dem Bildschirm. Nach dem Start des Spiels können Sie die letzte Schaltfläche ganz rechts verwenden.

### 1.1 - Gegenstand spawnen ###
Wenn Sie in der Suchleiste suchen, werden die Ergebnisse direkt darunter angezeigt.
Klicke mit der linken Maustaste auf den Gegenstand, um ihn auszuwählen, und mit der linken Maustaste auf das Feld, um ihn dem Spiel hinzuzufügen.

================

### 1.2 - Gegenstände klonen und löschen
Ein Fenster wird geöffnet. Alles, was Sie mit dem Cursor markieren, kann entweder kopiert werden (der Name des markierten Gegenstands ist im Fenster markiert) oder es wird gelöscht.
Beachten Sie, dass es derzeit kein Ctrl+W gibt.

================

### 1.3 - Variablenfenster ###
Das Variablenfenster setzt sich wie folgt zusammen
![VariableViewerPannel](https://i.imgur.com/eGwefyk.png)Les couleurs de variable peuvent ainsi être différenciées.
![VariableColor](https://i.imgur.com/jsMibs1.png)
**1 ** = Aktualisierungshierarchie

**2 ** = Hierarchie der Suchschaltflächen

**3 ** = Suchhierarchiefeld

**4 ** = Seite mit allen Spielobjekten des Spiels, in der Hierarchie

**4a** = Name des Spielobjekts

**4b** = Schaltfläche zum Ein- und Ausblenden der Kinder des Spielobjekts

**4c** = Feld zur Auswahl des Spielobjekts

**5 ** = Name des aktuell ausgewählten Spielobjekts

**6 ** = Nach links blättern in der Liste der Komponenten, die dem ausgewählten Spielobjekt zugeordnet sind

**7 ** = Nach rechts blättern in der Liste der Komponenten, die mit dem ausgewählten Spielobjekt verbunden sind

**8 ** = Debug-Optionen wie Funktionen und Skriptvariablen/Variablen, die mehr als nur das Setzen eines Wertes erfordern, anzeigen

**9 ** = Ausgewählte Variablen am Objekt aktualisieren

**10** = Änderungen an den Client weiterleiten, damit die Änderungen auf dem Client sichtbar sind

**11** = das Fenster schließen

**12** = Durch die Historie der ausgewählten Skripte blättern

**13** = Name des aktuellen Skripts

**14** = Panel mit allen Variablen/Funktionen, die mit dem Skript zusammenhängen

================
## 2 - Admin-Menü ##
![AdminToolButton](https://i.imgur.com/u6dFEtq.png)

Im Gegensatz zu den Admin-Tools ist das Menü verfügbar, sobald Sie sich mit dem Server verbinden.

### 2.1 - MHELP ##
![MentorChat](https://i.imgur.com/Kgewtjp.png)

MentorChat.

Ermöglicht es Spielern, mit dem angegebenen Mentor zu chatten (vorübergehend oder nicht)

auf der linken Seite - Liste der Spieler

rechts - Verlauf und Korrespondenzbereich.

================
### 2.2 - [Admin-Symbolleiste] ###
![Pannel](https://i.imgur.com/zWCeQzz.png)

Dieses Panel ist in 7 Fenster unterteilt.

#### 2.2a - [GameModeManager] ####
![GameModeManager](https://i.imgur.com/wMViLXt.png)

#### 2.2b - SpielerManager ####
![PlayerManager](https://i.imgur.com/Go0hAUI.png)

In diesem Fenster sind mehrere visuelle Werkzeuge zusammengefasst.

Auf der linken Seite befindet sich eine Liste der Spieler.

Wenn die Liste zu lang ist, können Sie die Suchfunktion oben verwenden.

================
##### 2.2b.1 - Einen Spieler kicken #####

================
##### 2.2b.2 - Einen Spieler sperren #####
![hier Bildbeschreibung eingeben] (https://i.imgur.com/sdtcGgo.png)

================
##### 2.2b.3 - Verbot eines Berufs #####
![JobBan](https://i.imgur.com/iEcdIhM.png)

Ermöglicht es dir, Spieler aufgrund ihres Berufs zu sperren oder zu verbannen. Funktioniert auch für Antagonisten.

================
##### 2.2b.4 - Schaden #####
![Smite](https://i.imgur.com/vAMpcrl.png)

================
##### 2.2b.5 - Wiederbelebung #####
![Respawn](https://i.imgur.com/AC5pPcj.png)
Ermöglicht es Ihnen, einen Spieler wieder zum Leben zu erwecken (auch wenn er noch lebt).

Im rechten Feld können Sie verschiedene Optionen auswählen, die kumulativ sind.

Zum Beispiel können Sie einen Charakter mit "Cleaner" + "Blob" wiederbeleben.

================
##### 2.2b.6 - Admin zum Spieler teleportieren - AGHOST #####
**Du** wirst im Geistermodus (unsichtbar) zu dem ausgewählten Spieler teleportiert

================
##### 2.2b.7 - Einen Administrator zu einem Spieler teleportieren #####
**Sie** teleportieren sich zu dem ausgewählten Spieler


================
##### 2.2b.8 - Spieler zum Administrator teleportieren #####
Teleportiert den **ausgewählten **Spieler** zu Ihnen


================
##### 2.2b.9 - Zum Admin teleportieren - ALLE Spieler #####

Alle Spieler werden zum Admin teleportiert

Funktioniert nicht, wenn man ein Geist ist.

================
##### 2.2b.10 - Heilen #####
Sobald ein Spieler ausgewählt ist, kannst du ihn vollständig heilen.

Beachte, dass diese Heilung verlorene Gliedmaßen nicht wiederherstellt.

Auch der Tod wird damit nicht geheilt.

================
##### 2.2b.11 - Mentor zuweisen #####
Ermöglicht es dir, ausgewählten Spielern die Rolle eines Mentors zu geben.

-Zurzeit
kann damit nur zusätzlich das Mentor-Interface geöffnet werden.


================
#### 2.2c - CC (Zentralkommando, CentComm) ####
![CentComm](https://i.imgur.com/h1IA8gc.png)

Dies ist ein Werkzeug für Rollenspiele** `/!\* **Dies ist ein Werkzeug für Rollenspiele** `/!\*`.

CentComm ist eine Einheit oberhalb des Kapitäns.

Für weitere Informationen, siehe

| CenterComp** | [Central-Command-Officer.md], [Death-Squad.md], [Emergency-Response-Team.md] [Redshield-Officer.md]|

#### 2.2d - Ereignis-Manager ####
![EventManager](https://i.imgur.com/1PYvGB4.png)** Ereignistyp:**.

* Zufällig

* Spaß

* Spezial

* Antagonist

* Debugger


**Ereignis zum Auslösen: **(Unterkategorie)

zur Bestätigung **[Ereignis ausführen]** drücken.

#### 2.2e - Aktueller Rundenmanager ####

#### 2.2f - Entwickler-Tools ####
![DevTool](https://i.imgur.com/plGL6aB.png)

#### 2.2g - Server-Einstellungen ####
![ServerSettings](https://i.imgur.com/7LMIvPP.png)

Verschiedene "andere" Einstellungen zur Serversteuerung werden hier gesammelt, neue werden bald hinzugefügt.

### 2.3 - ACHAT ###
[Einkaufen] (https://i.imgur.com/uVoHfiK.png)
Chat-Fenster im Spiel für Administratoren, nur zwischen ihnen.
### 2.4 - ALOGS ###
![AdminLogs](https://i.imgur.com/uvhI6EE.png)
Administratoren-Logs

Logs von Admin-Operationen, wie z.B. das Spawnen von Gegenständen.

### 2.5 - AHELP ###
![AHELP](https://i.imgur.com/9dd4Vxh.png)
Chat-Fenster vom Spieler zum Admin

Der Spieler kann das Fenster öffnen, indem er die Eingabetaste drückt, dann drückt er die [help]-Taste unten links, dieses Fenster zeigt die Nachricht für den Admin, links die Liste der Unterhaltungen.

### 2.6 - [INFO] ###
![Info](https://i.imgur.com/S3bbx59.png)
Diese kleine Taste (1. Taste, 2. Zeile)

ermöglicht es Ihnen, Informationen direkt im Spiel anzuzeigen, die den Namen des Charakters, den Kontonamen, den Status und die Gesundheit enthalten.

### 2.7 - Globaler Ton

Sound-Player, hörbar für den gesamten Server.

### 2.8 - Globale Musik ###
![MusicPlayer](https://i.imgur.com/NrEMea1.png)

Musikplayer, der auf dem gesamten Server hörbar ist.

### 2.9 - APRIZRAK ###
![APPRISER](https://i.imgur.com/qPV89TN.png) erlaubt es Ihnen, aus Ihrem Körper herauszutreten,

nützlich, um Objekte erscheinen zu lassen oder den Spieler zu beobachten, ohne gesehen zu werden.

### 2.10 - WARNUNGEN ###
![ALERTS](https://i.imgur.com/RdMFluj.png)

In diesem Fenster erhalten Sie Rückmeldungen zu Ereignissen, z. B. wenn ein Spieler einen anderen Spieler tötet.

## 3 - DANKSAGUNGEN ##
Dank an Bod (admin/dev) für die Erstellung dieses Tools
[Fr_Dae](http://twitch.tv/Fr_Dae) (für das Schreiben dieser Wikiseite)
@Peulleieo#1996 für die Korrektur (en)
@CV514#7004 für die Korrekturen (ru)
@GemInee#5127 für den Code
