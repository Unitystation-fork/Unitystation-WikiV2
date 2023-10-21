---
titre : Interface d'administration
sidebar_position : 2
---

![unityico](https://github.com/unitystation/stationhub/blob/develop/UnitystationLauncher/Assets/unityico.png?raw=true)
# Interface d'administration

## 1 - Barre d'outils de l'administrateur
La barre d'outils de l'administrateur est située en haut à droite de l'écran, après avoir démarré le jeu, vous pouvez utiliser le dernier bouton à l'extrême droite.

### 1.1 - Élément de spawn
Une requête dans la barre de recherche affichera les résultats ci-dessous.
Faites un clic gauche sur l'objet pour le sélectionner et un clic gauche sur le champ pour l'ajouter au jeu.

------------


### 1.2 - Cloner et supprimer des objets
Une fenêtre s'ouvre. Tout ce que vous sélectionnez avec votre curseur sera soit prêt à être copié (le nom de l'élément sélectionné est indiqué dans la fenêtre), soit supprimé.
Notez qu'il n'y a pas actuellement de Ctrl+W.

------------


### 1.3 - Fenêtre de visualisation des variables
La fenêtre des variables est composée comme suit
![VariableViewerPannel](https://i.imgur.com/eGwefyk.png)
Les couleurs variables peuvent donc être différenciées.
![VariableColor](https://i.imgur.com/jsMibs1.png)

1. rafraîchir la hiérarchie
2. Hiérarchie du bouton de recherche
3. champ de la hiérarchie de recherche
4. page contenant tous les objets du jeu, dans la hiérarchie
	4a.  Nom de l'objet du jeu
	4b.  Bouton permettant d'afficher ou de masquer les enfants de l'objet du jeu
	4c.  Boîte pour sélectionner l'objet du jeu
5. nom de l'objet de jeu actuellement sélectionné
6. défilement vers la gauche dans la liste des composants attachés à l'objet de jeu sélectionné
7. défilement vers la droite dans la liste des composants attachés à l'objet de jeu sélectionné
8. Afficher les options de débogage telles que les fonctions et les variables script set/Variables qui requièrent plus qu'une simple mise à la valeur
9. rafraîchir les variables sélectionnées sur l'objet
10. Mettre en réseau les modifications sur le client afin que les modifications soient visibles sur les clients.
11. fermer la fenêtre
12. Faire défiler l'historique des scripts sélectionnés
13. Nom du script actuel
14. Panneau contenant toutes les variables/fonctions liées au script

------------

## 2 - Menu Admin
![AdminToolButton](https://i.imgur.com/u6dFEtq.png)

Contrairement aux outils d'administration, le menu est disponible dès que vous vous connectez au serveur.

### 2.1 - MHELP
![MentorChat](https://i.imgur.com/Kgewtjp.png)

MentorChat.

Permet aux joueurs de discuter avec le mentor spécifié (temporairement ou non).

à gauche - liste des joueurs

à droite - historique et zone de correspondance.

------------

### 2.2 - Barre d'outils d'administration
![Pannel](https://i.imgur.com/zWCeQzz.png)

Ce panneau est divisé en 7 fenêtres.

#### 2.2a - GameModeManager
![GameModeManager](https://i.imgur.com/wMViLXt.png)

#### 2.2b - PlayerManager
![PlayerManager](https://i.imgur.com/Go0hAUI.png)

Cette fenêtre rassemble plusieurs outils visuels.

Et il y a une liste de joueurs sur le côté gauche.

Si la liste est trop longue, vous pouvez utiliser la fonction de recherche ci-dessus.

------------

##### 2.2b.1 - Donner un coup de pied à un joueur

------------

##### 2.2b.2 - Bannir un joueur
![Ban](https://i.imgur.com/sdtcGgo.png)

------------

##### 2.2b.3 - Bannir une profession
![JobBan](https://i.imgur.com/iEcdIhM.png)

Permet de bloquer ou de bannir des joueurs en fonction de leur profession. Fonctionne également pour les antagonistes.

------------

##### 2.2b.4 - Dégâts
![Smite](https://i.imgur.com/vAMpcrl.png)

------------

##### 2.2b.5 - Rétablissement
![Respawn](https://i.imgur.com/AC5pPcj.png)
Permet de ramener un joueur à la vie (même s'il est encore en vie).

Le panneau de droite permet de sélectionner différentes options, qui sont cumulatives.

Par exemple, vous pouvez faire revivre un personnage avec "cleaner" + "blob".

------------

##### 2.2b.6 - Téléportation de l'admin vers le joueur - AGHOST
**Vous** êtes téléporté vers le joueur sélectionné en mode fantôme (invisible)

------------

##### 2.2b.7 - Téléporter un administrateur vers un joueur
**Vous** vous téléportez vers le joueur sélectionné
------------

##### 2.2b.8 - Téléporter un joueur vers un administrateur
Téléporte **le joueur sélectionné** vers vous
------------

##### 2.2b.9 - Téléportation vers l'administrateur - TOUS les joueurs

Tous les joueurs sont téléportés vers l'administrateur

Ne fonctionne pas si vous êtes un fantôme.

------------

##### 2.2b.10 - Guérir
Une fois qu'un joueur est sélectionné, vous pouvez le soigner complètement.

Sachez que cette guérison ne rétablit pas les membres perdus.

Elle ne guérit pas non plus la mort.

------------

##### 2.2b.11 - Assigner un mentor
Permet de donner à des joueurs sélectionnés le rôle de mentor.

* Pour l'instant
* cela ne peut qu'ouvrir l'interface du mentor en plus.
------------

#### 2.2c - CC (Central Command, CentComm)
![CentComm](https://i.imgur.com/h1IA8gc.png)

`/!\` **Il s'agit d'un outil de jeu de rôle** `/!\`.

CentComm est une unité au-dessus du capitaine.

Pour plus d'informations, voir

| Le CentComm est une unité située au-dessus du capitaine, qui a été créée par un groupe d'officiers de l'armée.

#### 2.2d - Gestionnaire d'événements
![EventManager](https://i.imgur.com/1PYvGB4.png)** Type d'événement:**.

* Aléatoire
* Fun
* spécial
* Antagoniste
* débogueur

**Événement à déclencher:** (catégorie de sous-type)

appuyez sur **[run event]** pour confirmer.

#### 2.2e - Gestionnaire de la manche en cours

#### 2.2f - Outils du développeur
![DevTool](https://i.imgur.com/plGL6aB.png)

#### 2.2g - Paramètres du serveur
![ServerSettings](https://i.imgur.com/7LMIvPP.png)

Divers "autres" paramètres de contrôle du serveur sont rassemblés ici, de nouveaux seront ajoutés prochainement.

### 2.3 - ACHAT
![Achat](https://i.imgur.com/uVoHfiK.png)
Fenêtre de chat en jeu pour les administrateurs, uniquement entre eux.
### 2.4 - ALOGS
![AdminLogs](https://i.imgur.com/uvhI6EE.png)
Journaux des administrateurs

Journaux des opérations d'administration, telles que la création d'objets.

### 2.5 - AHELP
![AHELP](https://i.imgur.com/9dd4Vxh.png)
Fenêtre de discussion entre le joueur et l'administrateur

Le joueur peut ouvrir la fenêtre en appuyant sur Entrée, puis sur le bouton [help] en bas à gauche, cette fenêtre affichera le message pour l'administrateur, la liste des conversations à gauche.

### 2.6 - INFO
![Info](https://i.imgur.com/S3bbx59.png)
Ce petit bouton (1er bouton, 2ème ligne)

permet d'afficher des informations directement dans le jeu, contenant le nom du personnage, le nom du compte, le statut et la santé.

### 2.7 - Son global

Lecteur de son, audible par l'ensemble du serveur.

### 2.8 - Musique globale
![MusicPlayer](https://i.imgur.com/NrEMea1.png)

Lecteur de musique audible par l'ensemble du serveur.

### 2.9 - AGhost
![APPRISER](https://i.imgur.com/qPV89TN.png) vous permet de sortir de votre corps,

utile pour faire apparaître des objets ou observer le joueur sans être vu.

### 2.10 - WARNINGS
![ALERTS](https://i.imgur.com/RdMFluj.png)

Cette fenêtre vous permet d'obtenir des informations sur des événements, tels qu'un joueur tuant un autre joueur.

## 3 - REMERCIEMENTS
Merci à Bod (admin/dev) pour la création de cet outil.

[Fr_Dae](http://twitch.tv/Fr_Dae) (pour avoir écrit cette page wiki)

@Peulleieo#1996 pour la correction (en)

@CV514#7004 pour les corrections (ru)

@GemInee#5127 pour le code

