
{{tag>Game BROUILLON Admin tool interface UI}}
# Unitystation ![unityico](https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png?raw=true)
## Index ##

`├── 1 - Admin Tool`<br>
`│	├── 1.1 - Spawn item`<br>
`│	├── 1.2 -  Clone & delete Item`<br>
`│	└── 1.3 -  Variable Viewer`<br>
`├── 2 - Admin Menu`<br>
`│	├── 2.1 - MHELP`<br>
`│	├── 2.2 - [Admin Tool Panel]`<br>
`│	│	├──  2.2a - Game Mode`<br>
`│	│	├──  2.2b - Player Manager`<br>
`│	│	│	├──  2.2b.1 - Kick`<br>
`│	│	│	├──  2.2b.2 - Ban`<br>
`│	│	│	├──  2.2b.3 - JobBan`<br>
`│	│	│	├──  2.2b.4 - Smite`<br>
`│	│	│	├──  2.2b.5 - Respawn`<br>
`│	│	│	├──  2.2b.6 - Teleport Admin TO Player - Aghost`<br>
`│	│	│	├──  2.2b.7 - Teleport Player TO Admin`<br>
`│	│	│	├──  2.2b.8 - Teleport Player TO Admin`<br>
`│	│	│	├──  2.2b.9 - Teleport Player TO Admin - ALL`<br>
`│	│	│	├──  2.2b.10 - heal`<br>
`│	│	│	└──  2.2b.11 - mentor`<br>
`│	│	├──  2.2c - CentCom`<br>
`│	│	├──  2.2d - Events Managers`<br>
`│	│	├──  2.2e - Round Managers`<br>
`│	│	├──  2.2f - Dev Tools`<br>
`│	│	└──  2.2g - Server Settings`<br>
`│	├── 2.3 - ACHAT`<br>
`│	├── 2.4 - ALOGS`<br>
`│	├── 2.5 - AHELP`<br>
`│	├── 2.6 - [INFO]`<br>
`│	├── 2.7 - Global Sound`<br>
`│	├── 2.8 - Global Music`<br>
`│	├── 2.9 - AGHOST`<br>
`│	└── 2.10 - ALERTS`<br>
`└── 3 - CREDIT`<br>
`=========================================================`<br>
## 1 - Admin Tool ##
Le panneau d’outils d’admin est situé en haut à droite de votre écran, une fois la partie démarrée, vous pourrez utiliser le dernier bouton tout à droite.

### 1.1 - Spawn item ###
Disposant d’une barre de recherche, vous trouverez en dessous les résultat.
un clic gauche sur un élément pour le sélectionner, et un clic gauche sur le terrain pour l’ajouter au jeu.

================

### 1.2 -  Clone & delete Item ###
Une fenêtre s’ouvre, tout ce que vous sélectionnerez avec votre curseur sera soit prêt pour une copy (le nom de l’objet sélectionné est noté dans la fenêtre) soit sera supprimé.
attention, il n’existe pour le moment pas de Ctrl W

================

### 1.3 -  Variable Viewer ###<br>
La fenêtre de variable est composée ainsi<br>
![VariableViewerPannel](https://i.imgur.com/eGwefyk.png)Les couleurs de variable peuvent ainsi être différenciées.<br>
![VariableColor](https://i.imgur.com/jsMibs1.png)<br>
**1** = rafraîchissement, hiérarchie<br>
**2** = Bouton de recherche, hiérarchie <br>
**3** = Recherche dans la hiérarchie, champ<br>
**4** = Page contenant tous les objets du jeu, dans la hiérarchie.<br>
**4a** = Nom de l'objet du jeu<br>
**4b** = Bouton pour afficher ou cacher les enfants de l'objet de jeu<br>
**4c** = Boîte pour sélectionner l'objet de jeu<br>
**5** = Nom de l'objet de jeu actuellement sélectionné<br>
**6** = Défilement à gauche dans la liste des composants attachés à l'objet de jeu sélectionné.<br>
**7** = Défilement à droite dans la liste des composants attachés à l'objet de jeu sélectionné.<br>
**8** = Afficher les options de débogage telles que les fonctions et les variables définies par script/variables qui nécessitent plus qu'une simple mise à la valeur.<br>
**9** = Rafraîchir les variables sélectionnées sur l'objet.<br>
**10** = Mettre en réseau les changements sur le client pour que les changements soient visibles sur les clients.<br>
**11** = Fermer la fenêtre<br>
**12** = Faire défiler l'historique des scripts sélectionnés<br>
**13** = Nom du script actuel<br>
**14** = Panneau contenant toutes les variables/Fonctions liées au script<br>

================
## 2 - Admin Menu ##
![AdminToolButton](https://i.imgur.com/u6dFEtq.png)
À la différence des outils d’admin, le Menu est disponible dès votre connexion au serveur.

### 2.1 - MHELP ###
![MentorChat](https://i.imgur.com/Kgewtjp.png)
Mentor Help chat.  <br>
permet aux joueurs de discuter avec un mentor nommé (temporairement ou non)  <br>
sur le coté gauche se trouve la liste des joueurs  <br>
sur le coté droit se trouve l’historique et zone d’écriture.<br>

================
### 2.2 - [Admin Tool Panel] ###
![Pannel](https://i.imgur.com/zWCeQzz.png)
Ce panneau se divise en 7 fenêtres.

####  2.2a - Game Mode ####
![GameModeManager](https://i.imgur.com/wMViLXt.png)
####  2.2b - Player Manager ####
![PlayerManager](https://i.imgur.com/Go0hAUI.png)
cette fenêtre rassemble plusieurs outils visuels.<br>
ainsi que la liste des joueurs sur le coté gauche.<br>
si la liste est trop longue vous pouvez utiliser la fonction recherche au dessus.<br>

================
#####  2.2b.1 - Kick #####

================
#####  2.2b.2 - Ban #####
![enter image description here](https://i.imgur.com/sdtcGgo.png)

================
#####  2.2b.3 - JobBan #####
![JobBan](https://i.imgur.com/iEcdIhM.png)
Permet de bloquer ou bannir un ensemble de joueurs en fonction de leur job. fonctionne aussi pour les antagonistes

================
#####  2.2b.4 - Smite #####
![Smite](https://i.imgur.com/vAMpcrl.png)

================
#####  2.2b.5 - Respawn #####
![Respawn](https://i.imgur.com/AC5pPcj.png) Permet de faire revenir un jouer a la vie (même s'il est toujours vivant)<br>
le panneau de droite permet de choisir différentes options, et celles ci sont cumulatives.<br>
ex, vous pouvez faire revivre un personnage en "janitor" +"blob"

================
#####  2.2b.6 - Teleport Admin TO Player - Aghost#####<br>
**VOUS** téléporte sur un joueur sélectionné en mode fantôme (invisible)


================
#####  2.2b.7 - Teleport Player TO Admin #####
**VOUS** téléporte sur un joueur sélectionné


================
#####  2.2b.8 - Teleport Player TO Admin #####<br>
Téléporte **LE JOUEUR** sélectionné, sur vous 


================
#####  2.2b.9 - Teleport Player TO Admin - ALL #####

Tous le monde est téléporté a l'admin<br>
ne fonctionne pas si vous etes un fantôme.<br>

================
#####  2.2b.10 - heal #####
Une fois un joueur sélectionné, vous pourrez complètement soigner celui ci.<br>
attention cela ne fait pas repousser les membres perdus.<br>
et ne soigne pas la mort.  <br>

================
#####  2.2b.11 - mentor #####
permet de donner au joueurs selectionnés le role mentor.<br>
-pour le moment- celui-ci ne peux qu'ouvrir l'interface mentor en plus.<br>


================
####  2.2c - CentCom ####
![CentComm](https://i.imgur.com/h1IA8gc.png)
`/!\` **Ceci est un outils Roleplay** `/!\`<br>
Le CentComm est l'entité supérieure au capitaine, <br>
pour plus d'informations. <br>
consultez les pages<br>
| **Centcom**     | [Centcom Officer](Central-Command-Officer.md), [Death Squad](Death-Squad.md), [Emergency Response Team,](Emergency-Response-Team.md) [Redshield Officer](Redshield-Officer.md) |<br>
####  2.2d - Events Managers ####
![EventManager](https://i.imgur.com/1PYvGB4.png)**Events Type :**<br>
* random<br>
* Fun<br>
* Spetial<br>
* Antagonist<br>
* Debug<br>

**Event To trigger: ** (sous catégorie de type)


pour validé, appuyé sur **[trigger event]**
####  2.2e - Round Managers ####
####  2.2f - Dev Tools ####
![DevTool](https://i.imgur.com/plGL6aB.png)
####  2.2g - Server Settings ####
![ServerSettings](https://i.imgur.com/7LMIvPP.png)
Ici sont rassemblés divers “autres” paramètres de gestion à chaud du serveur, il y en aura prochainement d’autres d’ajouter. 

### 2.3 - ACHAT ###
![Achat](https://i.imgur.com/uVoHfiK.png)
La fenêtre de conversation ingame des admin, juste entre eux.
### 2.4 - ALOGS ###
![AdminLogs](https://i.imgur.com/uvhI6EE.png)
Admin logs
logs des opération admin, tel que le spawn d'objets.

### 2.5 - AHELP ###
![Achat](https://i.imgur.com/9dd4Vxh.png)
La fenêtre de conversation des joueurs vers l'admin
un joueurs peux ouvrir une fenêtre en appuyant sur entrer, puis en bas à gauche, appuyé sur le bouton [help] le message s'affichera dans cette fenêtre pour l'admin, le coté gauche est la liste des conversation.

### 2.6 - [INFO] ###
![Info](https://i.imgur.com/S3bbx59.png)
Ce petit bouton (1er bouton, 2e ligne) 
permet d'afficher des information directement en jeu, contenant, le nom du personnage, le nom de compte, son statut ainsi que sa vie.

### 2.7 - Global Sound ###
Lecteur de Son, entendu par tous le serveur.
### 2.8 - Global Music ###
![MusicPlayer](https://i.imgur.com/NrEMea1.png)
Lecteur de musique, entendu par tout le serveur.
### 2.9 - AGHOST ###
![Aghost](https://i.imgur.com/qPV89TN.png)permet de sortir de votre corps, 
utile pour faire apparaître des objet , ou surveiller un joueur sans être vue.

### 2.10 - ALERTS ###
![ALERTS](https://i.imgur.com/RdMFluj.png)
Cette fenêtre permets d'avoir des retour d'événements, tel qu'un joueurs ayant tué un autre

## 3 - CREDIT ##
Thanks to Bod (admin/dev) for creating this tool
[Fr_Dae](http://twitch.tv/Fr_Dae) (for write this wikipage) 
@Peulleieo#1996  for correction (fr)
