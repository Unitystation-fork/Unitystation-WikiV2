
**Table of Contents**

[TOCM]

[TOC]

{# {{tag>UI interface of the BROUILLON game admin tool}} #}

# Admin Interface

![unityico]([https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png?raw=true](https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png?raw=true))

## Content ##

```properties
├── 1 - Admin Tool
│	├── 1.1 - Spawn item
│	├── 1.2 - Clone & delete Item
│	└── 1.3 -Variable Viewer
├── 2 - Admin Menu
│ 	├── 2.1 - MHELP
│ 	├── 2.2 - [Admin Tool Panel]
│ 	│	├── 2.2a - Game Mode
│ 	│	├── 2.2b - Player Manager
│ 	│	│	├── 2.2b.1 - Kick
│ 	│	│	├── 2.2b.2 - Ban
│ 	│	│	├── 2.2b.3 - JobBan
│ 	│	│	├── 2.2b.4 - Smite
│ 	│	│	├── 2.2b.5 - Respawn
│ 	│	│	├── 2.2b.6 - Teleport Admin TO Player - Aghost
│ 	│	│	├── 2.2b.7 - Teleport Player TO Admin
│ 	│	│	├── 2.2b.8 - Teleport Player TO Admin
│ 	│	│	├── 2.2b.9 - Teleport Player TO Admin - ALL
│ 	│	│	├── 2.2b.10 - heal
│ 	│	│	└── 2.2b.11 - mentor
│ 	│	├── 2.2c - CentCom
│ 	│	├── 2.2d - Events Managers
│ 	│	├── 2.2e - Round Managers
│ 	│	├── 2.2f - Dev Tools
│ 	│	└── 2.2g - Server Settings
│ 	├── 2.3 - ACHAT
│ 	├── 2.4 - ALOGS
│ 	├── 2.5 - AHELP
│ 	├── 2.6 - [INFO]
│ 	├── 2.7 - Global Sound
│ 	├── 2.8 - Global Music
│ 	├── 2.9 - AGHOST
│ 	└── 2.10 - ALERTS
└── 3 - CREDIT
```

## 1 - Administrator-Symbolleiste
Die Administrator-Symbolleiste befindet sich oben rechts auf dem Bildschirm. Nach dem Start des Spiels können Sie die letzte Schaltfläche ganz rechts verwenden.

### 1.1 - Gegenstand spawnen ###

Wenn Sie in der Suchleiste suchen, werden die Ergebnisse direkt darunter angezeigt.

Klicke mit der linken Maustaste auf den Gegenstand, um ihn auszuwählen, und mit der linken Maustaste auf das Feld, um ihn dem Spiel hinzuzufügen.

------------

### 1.2 - Gegenstände klonen und löschen

Ein Fenster wird geöffnet. Alles, was Sie mit dem Cursor markieren, kann entweder kopiert werden (der Name des markierten Gegenstands ist im Fenster markiert) oder es wird gelöscht.

Beachten Sie, dass es derzeit kein Ctrl+W gibt.

------------

### 1.3 - Variablenfenster ###

Das Variablenfenster setzt sich wie folgt zusammen

![VariableViewerPannel]([https://i.imgur.com/eGwefyk.png)Les](https://i.imgur.com/eGwefyk.png)Les) couleurs de variable peuvent ainsi être différenciées.

![VariableColor]([https://i.imgur.com/jsMibs1.png](https://i.imgur.com/jsMibs1.png))

1. Aktualisierungshierarchie
2. Hierarchie der Suchschaltflächen
3. Suchhierarchiefeld
4. Seite mit allen Spielobjekten des Spiels, in der Hierarchie
	4a.  Name des Spielobjekts
	4b.  Schaltfläche zum Ein- und Ausblenden der Kinder des Spielobjekts
	4c.  Feld zur Auswahl des Spielobjekts
5.   Name des aktuell ausgewählten Spielobjekts
6.   Nach links blättern in der Liste der Komponenten, die dem ausgewählten Spielobjekt zugeordnet sind
7.   Nach rechts blättern in der Liste der Komponenten, die mit dem ausgewählten Spielobjekt verbunden sind
8.   Debug-Optionen wie Funktionen und Skriptvariablen/Variablen, die mehr als nur das Setzen eines Wertes erfordern, anzeigen
9.   Ausgewählte Variablen am Objekt aktualisieren
10.  Änderungen an den Client weiterleiten, damit die Änderungen auf dem Client sichtbar sind
11.  das Fenster schließen
12.  Durch die Historie der ausgewählten Skripte blättern
13.  Name des aktuellen Skripts
14.  Panel mit allen Variablen/Funktionen, die mit dem Skript zusammenhängen

------------

## 2 - Admin-Menü ##

![AdminToolButton]([https://i.imgur.com/u6dFEtq.png](https://i.imgur.com/u6dFEtq.png))

Im Gegensatz zu den Admin-Tools ist das Menü verfügbar, sobald Sie sich mit dem Server verbinden.

### 2.1 - MHELP ##

![MentorChat]([https://i.imgur.com/Kgewtjp.png](https://i.imgur.com/Kgewtjp.png))

- MentorChat.

- Ermöglicht es Spielern, mit dem angegebenen Mentor zu chatten (vorübergehend oder nicht)

- auf der linken Seite - Liste der Spieler

- rechts - Verlauf und Korrespondenzbereich.

------------

### 2.2 - [Admin-Symbolleiste] ###

![Pannel]([https://i.imgur.com/zWCeQzz.png](https://i.imgur.com/zWCeQzz.png))

Dieses Panel ist in 7 Fenster unterteilt.

#### 2.2a - [GameModeManager] ####

![GameModeManager]([https://i.imgur.com/wMViLXt.png](https://i.imgur.com/wMViLXt.png))

#### 2.2b - SpielerManager ####

![PlayerManager]([https://i.imgur.com/Go0hAUI.png](https://i.imgur.com/Go0hAUI.png))

- In diesem Fenster sind mehrere visuelle Werkzeuge zusammengefasst.

- Auf der linken Seite befindet sich eine Liste der Spieler.

- Wenn die Liste zu lang ist, können Sie die Suchfunktion oben verwenden.

------------

##### 2.2b.1 - Einen Spieler kicken #####

------------

##### 2.2b.2 - Einen Spieler sperren #####

![hier Bildbeschreibung eingeben] ([https://i.imgur.com/sdtcGgo.png](https://i.imgur.com/sdtcGgo.png))

------------

##### 2.2b.3 - Verbot eines Berufs #####

![JobBan]([https://i.imgur.com/iEcdIhM.png](https://i.imgur.com/iEcdIhM.png))


Ermöglicht es dir, Spieler aufgrund ihres Berufs zu sperren oder zu verbannen. Funktioniert auch für Antagonisten.

------------

##### 2.2b.4 - Schaden #####

![Smite]([https://i.imgur.com/vAMpcrl.png](https://i.imgur.com/vAMpcrl.png))

------------

##### 2.2b.5 - Wiederbelebung #####

![Respawn]([https://i.imgur.com/AC5pPcj.png](https://i.imgur.com/AC5pPcj.png))

Ermöglicht es Ihnen, einen Spieler wieder zum Leben zu erwecken (auch wenn er noch lebt).

Im rechten Feld können Sie verschiedene Optionen auswählen, die kumulativ sind.

Zum Beispiel können Sie einen Charakter mit "Cleaner" + "Blob" wiederbeleben.

------------

##### 2.2b.6 - Admin zum Spieler teleportieren - AGHOST

**Du** wirst im Geistermodus (unsichtbar) zu dem ausgewählten Spieler teleportiert

------------

##### 2.2b.7 - Einen Administrator zu einem Spieler teleportieren

**Sie** teleportieren sich zu dem ausgewählten Spieler

------------

##### 2.2b.8 - Spieler zum Administrator teleportieren

Teleportiert den **ausgewählten **Spieler** zu Ihnen

------------

##### 2.2b.9 - Zum Admin teleportieren - ALLE Spieler

Alle Spieler werden zum Admin teleportiert

Funktioniert nicht, wenn man ein Geist ist.

------------

##### 2.2b.10 - Heilen

Sobald ein Spieler ausgewählt ist, kannst du ihn vollständig heilen.

Beachte, dass diese Heilung verlorene Gliedmaßen nicht wiederherstellt.

Auch der Tod wird damit nicht geheilt.

------------

##### 2.2b.11 - Mentor zuweisen

Ermöglicht es dir, ausgewählten Spielern die Rolle eines Mentors zu geben.

-Zurzeit

kann damit nur zusätzlich das Mentor-Interface geöffnet werden.

------------

#### 2.2c - CC (Zentralkommando, CentComm) ####

![CentComm]([https://i.imgur.com/h1IA8gc.png](https://i.imgur.com/h1IA8gc.png))

Dies ist ein Werkzeug für Rollenspiele** `/!\* **Dies ist ein Werkzeug für Rollenspiele** `/!\*`.

CentComm ist eine Einheit oberhalb des Kapitäns.

Für weitere Informationen, siehe

| CenterComp** | [Central-Command-Officer.md], [Death-Squad.md], [Emergency-Response-Team.md] [Redshield-Officer.md]|

#### 2.2d - Ereignis-Manager ####

![EventManager]([https://i.imgur.com/1PYvGB4.png](https://i.imgur.com/1PYvGB4.png))** Ereignistyp:**.

* Zufällig
* Spaß
* Spezial
* Antagonist
* Debugger

**Ereignis zum Auslösen: **(Unterkategorie)

zur Bestätigung **[Ereignis ausführen]** drücken.

#### 2.2e - Aktueller Rundenmanager ####

#### 2.2f - Entwickler-Tools ####

![DevTool]([https://i.imgur.com/plGL6aB.png](https://i.imgur.com/plGL6aB.png))

#### 2.2g - Server-Einstellungen ####

![ServerSettings]([https://i.imgur.com/7LMIvPP.png](https://i.imgur.com/7LMIvPP.png))

Verschiedene "andere" Einstellungen zur Serversteuerung werden hier gesammelt, neue werden bald hinzugefügt.

------------

### 2.3 - ACHAT ###

[Einkaufen] ([https://i.imgur.com/uVoHfiK.png](https://i.imgur.com/uVoHfiK.png))

Chat-Fenster im Spiel für Administratoren, nur zwischen ihnen.

------------

### 2.4 - ALOGS ###

![AdminLogs]([https://i.imgur.com/uvhI6EE.png](https://i.imgur.com/uvhI6EE.png))

Administratoren-Logs

Logs von Admin-Operationen, wie z.B. das Spawnen von Gegenständen.

------------

### 2.5 - AHELP ###

![AHELP]([https://i.imgur.com/9dd4Vxh.png](https://i.imgur.com/9dd4Vxh.png))

Chat-Fenster vom Spieler zum Admin


Der Spieler kann das Fenster öffnen, indem er die Eingabetaste drückt, dann drückt er die [help]-Taste unten links, dieses Fenster zeigt die Nachricht für den Admin, links die Liste der Unterhaltungen.

------------

### 2.6 - [INFO] ###

![Info]([https://i.imgur.com/S3bbx59.png](https://i.imgur.com/S3bbx59.png))

Diese kleine Taste (1. Taste, 2. Zeile)


ermöglicht es Ihnen, Informationen direkt im Spiel anzuzeigen, die den Namen des Charakters, den Kontonamen, den Status und die Gesundheit enthalten.

------------

### 2.7 - Globaler Ton


Sound-Player, hörbar für den gesamten Server.

------------

### 2.8 - Globale Musik ###

![MusicPlayer]([https://i.imgur.com/NrEMea1.png](https://i.imgur.com/NrEMea1.png))


Musikplayer, der auf dem gesamten Server hörbar ist.

------------

### 2.9 - APRIZRAK ###

![APPRISER]([https://i.imgur.com/qPV89TN.png](https://i.imgur.com/qPV89TN.png)) erlaubt es Ihnen, aus Ihrem Körper herauszutreten,


nützlich, um Objekte erscheinen zu lassen oder den Spieler zu beobachten, ohne gesehen zu werden.

------------

### 2.10 - WARNUNGEN ###

![ALERTS]([https://i.imgur.com/RdMFluj.png](https://i.imgur.com/RdMFluj.png))


In diesem Fenster erhalten Sie Rückmeldungen zu Ereignissen, z. B. wenn ein Spieler einen anderen Spieler tötet.


------------
