![github](https://badgen.net/badge/Side/Projet/blue?icon=github)
 ===

 [![forthebadge cc-by](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0) [![img](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/tyJX8dx)

## Unitystation-wiki

### Description du projet

Unitystation-wikiV2 est une mise au propre de la documentation du jeu, un manuel d'utilisation.
Présentant le projet, l'installation, l'interface et l'univers.

-------------

### Language utilisé

Ce projet est développer en:

- HTML/CSS
- Javasript (Node.js, Docusaurus)
- Markdown

-------------

### But du projet / public cible

Guider l'utlisateur lambda sur les modalités technique du projet tel que l'installation
Présentation de l'interface, comment jouer et présentation de l'univers.

-------------

### Installation

Pour construire le wiki en local avant de modifier la version actuelle du wiki :

- Installer
  - On Windows [node.js](https://nodejs.org/)
  - or using package manager on [linux](https://nodejs.org/en/download/package-manager)
- Cloner/Télécharcher le [projet](https://github.com/Unitystation-fork/Unitystation-WikiV2.git)
  - Using command line ```git clone https://github.com/libgit2/libgit2 mylibgit```
  - or using your Git Client
- Lancement en local ```npm i```
  - pour la version dev ```npm run start```
  - pour build ```npm run build```
  - puis ```npm run serve```
- Vérifier les liens et images (sans build, Python 3.9+) ```npm run test:links```
  - détail fichier:ligne ```npm run test:links -- -v```, une seule langue ```npm run test:links -- --lang fr```

-------------

### Déploiement

L'image Docker du wiki est construite par GitHub Actions (workflow « Image Docker ») à chaque fusion dans `main`, puis publiée sur `ghcr.io/unitystation-fork/unitystation-wikiv2`. **Rien n'est déployé automatiquement** : la mise en ligne reste une commande lancée à la main sur le serveur.

Tags disponibles : `latest` (dernier `main`), `main`, `sha-xxxxxxx` (un commit précis) et `vX.Y` (un tag git).

Sur le serveur :

- mettre en ligne : ```git pull && docker compose pull && docker compose up -d```
- revenir en arrière : ```WIKI_TAG=sha-xxxxxxx docker compose up -d``` (ou `WIKI_TAG=...` dans un fichier `.env`)
- construire sur place comme avant : ```docker compose up -d --build``` (le `--build` force la construction ; sans lui, Compose essaie d'abord de tirer l'image du registre)

Le paquet doit être **public** pour être tiré sans identifiant (page du paquet sur GitHub, Package settings, Change visibility, à faire une fois après la 1re publication). Sinon : `docker login ghcr.io` avec un jeton `read:packages`.

-------------

### Credit & contributeur

- Fr_Dae (Dae#5125)
- GemInee#5127
- Slycent#3597
- Warwiren#2517
- Peulleieo#1996

-------------

### ToDo

[Todo](https://github.com/Unitystation-fork/Unitystation-WikiV2/blob/main/todo.txt)

### Branch organization

- ```main``` is for current modifications
- ```dev``` is a copy of main but has an etas +1 (under test)
- ```release``` is a copy of /main with an etas -1 (later) but WHICH WORKS.

Example:

- release-2.1
- main-2.2
- dev-2.2.0.1
