
{# {{tag>Game BROUILLON Admin tool interface UI}} #}
# Unitystation ![unityico](https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png?raw=true)## 
Index ##

`├── 1 - Admin Tool`

`│        ├── 1.1 - Spawn item`

`│        ├── 1.2 -  Clone & delete Item`

`│        └── 1.3 -  Variable Viewer`

`├── 2 - Admin Menu`

`│        ├── 2.1 - MHELP`

`│        ├── 2.2 - [Admin Tool Panel]`

`│        │        ├──  2.2a - Game Mode`

`│        │        ├──  2.2b - Player Manager`

`│        │        │        ├──  2.2b.1 - Kick`

`│        │        │        ├──  2.2b.2 - Ban`

`│        │        │        ├──  2.2b.3 - JobBan`

`│        │        │        ├──  2.2b.4 - Smite`

`│        │        │        ├──  2.2b.5 - Respawn`

`│        │        │        ├──  2.2b.6 - Teleport Admin TO Player - Aghost`

`│        │        │        ├──  2.2b.7 - Teleport Player TO Admin`

`│        │        │        ├──  2.2b.8 - Teleport Player TO Admin`

`│        │        │        ├──  2.2b.9 - Teleport Player TO Admin - ALL`

`│        │        │        ├──  2.2b.10 - heal`

`│        │        │        └──  2.2b.11 - mentor`

`│        │        ├──  2.2c - CentCom`

`│        │        ├──  2.2d - Events Managers`

`│        │        ├──  2.2e - Round Managers`

`│        │        ├──  2.2f - Dev Tools`

`│        │        └──  2.2g - Server Settings`

`│        ├── 2.3 - ACHAT`

`│        ├── 2.4 - ALOGS`

`│        ├── 2.5 - AHELP`

`│        ├── 2.6 - [INFO]`

`│        ├── 2.7 - Global Sound`

`│        ├── 2.8 - Global Music`

`│        ├── 2.9 - AGHOST`

`│        └── 2.10 - ALERTS`

`└── 3 - CREDIT`

`=========================================================`

## 1 - Admin Tool ##
Le panneau d’outils d’admin est situé en haut à droite de votre écran, une fois la partie démarrée, vous pourrez utiliser le dernier bouton tout à droite.

### 1.1 - Spawn item ###
Disposant d’une barre de recherche, vous trouverez en dessous les résultats.
un clic gauche sur un élément pour le sélectionner, et un clic gauche sur le terrain pour l’ajouter au jeu.

================

### 1.2 -  Clone & delete Item ###
Une fenêtre s’ouvre, tout ce que vous sélectionnerez avec votre curseur sera soit prêt pour une copy (le nom de l’objet sélectionné est noté dans la fenêtre) soit sera supprimé.
Attention, il n’existe pour le moment pas de Ctrl W

================

### 1.3 -  Variable Viewer ###
La fenêtre de variable est composée ainsi
![VariableViewerPannel](https://i.imgur.com/eGwefyk.png) Les couleurs de variable peuvent ainsi être différenciées.
![VariableColor](https://i.imgur.com/jsMibs1.png)
**1** = Rafraîchissement, hiérarchie
**2** = Bouton de recherche, hiérarchie 
**3** = Recherche dans la hiérarchie, champ
**4** = Page contenant tous les objets du jeu, dans la hiérarchie.
**4a** = Nom de l'objet du jeu
**4b** = Bouton pour afficher ou cacher les enfants de l'objet de jeu
**4c** = Boîte pour sélectionner l'objet de jeu
**5** = Nom de l'objet de jeu actuellement sélectionné
**6** = Défilement à gauche dans la liste des composants attachés à l'objet de jeu sélectionné.
**7** = Défilement à droite dans la liste des composants attachés à l'objet de jeu sélectionné.
**8** = Afficher les options de débogage, telles que les fonctions et les variables définies par scripts /variables qui nécessitent plus qu'une simple mise à la valeur.
**9** = Rafraîchir les variables sélectionnées sur l'objet.
**10** = Mettre en réseau les changements sur le client pour que les changements soient visibles sur les clients
**11** = Fermer la fenêtre
**12** = Faire défiler l'historique des scripts sélectionnés
**13** = Nom du script actuel
**14** = Panneau contenant toutes les variables/fonctions liées au script

================

## 2 - Admin Menu ##
![AdminToolButton](https://i.imgur.com/u6dFEtq.png)
À la différence des outils d’admin, le Menu est disponible dès votre connexion au serveur.

### 2.1 - MHELP ###
![MentorChat](https://i.imgur.com/Kgewtjp.png)
Mentor Help chat permet aux joueurs de discuter avec un mentor nommé (temporairement ou non).  
Sur le coté gauche se trouve la liste des joueurs.  
Sur le coté droit se trouve l’historique et la zone d’écriture.

================

### 2.2 - [Admin Tool Panel] ###
![Pannel](https://i.imgur.com/zWCeQzz.png)
Ce panneau se divise en 7 fenêtres.

####  2.2a - Game Mode ####
![GameModeManager](https://i.imgur.com/wMViLXt.png)

####  2.2b - Player Manager ####
![PlayerManager](https://i.imgur.com/Go0hAUI.png)
Cette fenêtre rassemble plusieurs outils visuels ainsi que la liste des joueurs sur le coté gauche.
Si la liste est trop longue vous pouvez utiliser la fonction "recherche" au dessus.

================
#####  2.2b.1 - Kick #####

================
#####  2.2b.2 - Ban #####
![enter image description here](https://i.imgur.com/sdtcGgo.png)

================
#####  2.2b.3 - JobBan #####
![JobBan](https://i.imgur.com/iEcdIhM.png)
Permet de bloquer ou bannir un ensemble de joueurs en fonction de leurs jobs. 
Fonctionne aussi pour les antagonistes

================
#####  2.2b.4 - Smite #####
![Smite](https://i.imgur.com/vAMpcrl.png)

================
#####  2.2b.5 - Respawn #####
![Respawn](https://i.imgur.com/AC5pPcj.png) 
Permet de faire revenir un joueur à la vie (même s'il est toujours vivant).
Le panneau de droite permet de choisir différentes options, et celles-ci sont cumulatives.
Ex : vous pouvez faire revivre un personnage en "janitor" + "blob"

================
#####  2.2b.6 - Teleport Admin TO Player - Aghost#####
**VOUS** téléporte sur un joueur sélectionné en mode fantôme (invisible)


================
#####  2.2b.7 - Teleport Player TO Admin #####
**VOUS** téléporte sur un joueur sélectionné


================#####  2.2b.8 - Teleport Player TO Admin #####
Téléporte **LE JOUEUR** sélectionné, sur vous 


================#####  2.2b.9 - Teleport Player TO Admin - ALL #####
Tous le monde est téléporté vers l'admin.
Ne fonctionne pas si vous êtes un fantôme.

================#####  2.2b.10 - heal #####
Une fois un joueur sélectionné, vous pourrez complètement soigner celui-ci.
Attention cela ne fait pas repousser les membres perdus et ne soigne pas la mort.  

================#####  2.2b.11 - mentor #####
Permet de donner aux joueurs sélectionnés le rôle "mentor".
-pour le moment- celui-ci ne peux qu'ouvrir l'interface mentor en plus.-


================
####  2.2c - CentCom ####
![CentComm](https://i.imgur.com/h1IA8gc.png)`/!\` 
**Ceci est un outils Roleplay** `/!\`
Le CentComm est l'entité supérieure au capitaine. 
Pour plus d'informations, consultez les pages
| **Centcom**     | [Centcom Officer](Central-Command-Officer.md), [Death Squad](Death-Squad.md), [Emergency Response Team,](Emergency-Response-Team.md) [Redshield Officer](Redshield-Officer.md) |
####  2.2d - Events Managers ####
![EventManager](https://i.imgur.com/1PYvGB4.png)**Events Types :**
* random
* Fun
* Special
* Antagonist
* Debug

**Event To trigger: ** (sous catégorie de type)

Pour valider, appuyer sur **[trigger event]**

####  2.2e - Round Managers 
########  2.2f - Dev Tools ####
![DevTool](https://i.imgur.com/plGL6aB.png)####  
2.2g - Server Settings ####
![ServerSettings](https://i.imgur.com/7LMIvPP.png)
Ici sont rassemblés divers “autres” paramètres de gestion à chaud du serveur, il y en aura prochainement d’autres d’ajoutés. 

### 2.3 - ACHAT ###
![Achat](https://i.imgur.com/uVoHfiK.png)
La fenêtre de conversation ingame des admins, juste entre eux.
### 2.4 - ALOGS ###
![AdminLogs](https://i.imgur.com/uvhI6EE.png)
Admin logs
Logs des opérations admin, telle que le spawn d'objets.

### 2.5 - AHELP ###
![Achat](https://i.imgur.com/9dd4Vxh.png)
La fenêtre de conversation des joueurs vers l'admin.
Un joueurs peut ouvrir une fenêtre en appuyant sur "Entrée", puis en bas à gauche, appuyer sur le bouton [help] le message s'affichera dans cette fenêtre pour l'admin, le coté gauche est la liste des conversations.

### 2.6 - [INFO] ###
![Info](https://i.imgur.com/S3bbx59.png)
Ce petit bouton (1er bouton, 2ème ligne) permet d'afficher des informations directement en jeu, contenant :
- le nom du personnage, 
- le nom de compte, 
- son statut 
- ainsi que sa vie.

### 2.7 - Global Sound ###
Lecteur de Son, entendu par tout le serveur.
### 2.8 - Global Music ###
![MusicPlayer](https://i.imgur.com/NrEMea1.png)
Lecteur de musique, entendu par tout le serveur.
### 2.9 - AGHOST ###
![Aghost](https://i.imgur.com/qPV89TN.png)
Permet de sortir de votre corps.
Utile pour faire apparaître des objets  ou surveiller un joueur sans être vu.

### 2.10 - ALERTS ###
![ALERTS](https://i.imgur.com/RdMFluj.png)
Cette fenêtre permet d'avoir des retours d'événements, tel qu'un joueur en ayant tué un autre.
## 3 - CREDIT ##
Thanks to Bod (admin/dev) for creating this tool
[Fr_Dae](http://twitch.tv/Fr_Dae) (for write this wikipage) 
@Peulleieo#1996  for correction (fr)
Fr_Maevis
