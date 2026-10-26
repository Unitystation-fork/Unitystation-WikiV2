# Audit des pages métiers : le wiki comparé au code du jeu

**Le jeu est la source de vérité.** Chaque page métier du wiki (anglais, `docs/3_HowToPlay/Jobs/`, sur `main` au 26/10/2026) a été comparée au code du jeu ([unitystation/unitystation](https://github.com/unitystation/unitystation), branche `develop`, commit `31ad5f54`) : nom affiché, département, accès, difficulté, équipement de départ, chiffres donnés par la page.

Méthode, en deux passes :
1. un premier relecteur compare chaque page au fichier du métier dans le jeu (`ScriptableObjects/Occupations/…`) ;
2. un second relecteur, plus sceptique, revérifie **chaque** verdict FAUX, PÉRIMÉ ou ABSENT et un échantillon des JUSTE. Il a lu aussi les **cartes** des stations : un objet absent de l'équipement de départ peut être posé dans un casier (ex. le taser du Security Officer est dans son casier, le fusil du Bartender est sur 4 cartes sur 5). Ces cas sont corrigés.

Chaque verdict cite le fichier du jeu qui le prouve. ✔ = confirmé par la 2e relecture.

| Rapport | Pages | FAUX | PÉRIMÉ | ABSENT | À vérifier en jeu |
|---|---|---|---|---|---|
| [Commandement, Sécurité, Ingénierie, Synthétiques](commandement-securite-ingenierie-synthetiques.md) | 12 | 13 | 17 | 3 | 17 |
| [Médical, Science](medical-science.md) | 11 | 12 | 9 | 14 | 22 |
| [Cargo, Service, Divertissement](cargo-service-divertissement.md) | 13 | 45 | 11 | 19 | 16 |
| [Antagonistes, Protagonistes](antagonistes-protagonistes.md) | 16 | 21 | 12 | 14 | 20 |
| **Total** | **52** | **91** | **49** | **50** | **75** |

Les comptes sont faits ligne par ligne dans chaque rapport (une ligne de tableau peut regrouper plusieurs points, par exemple la table des prix du Quartermaster).

**Exemples d'erreurs confirmées** : air de la station à 101 kPa (pas 300) ; clonage en 3 min (pas 10-15 s) ; 7 métiers du Service sans accès maintenance ; prix des caisses cargo périmés ; Traitor avec 2 objectifs tirés au hasard + 1 de fuite ; Rebellion en rotation dès 15 joueurs avec un département rebelle tiré au hasard ; plusieurs difficultés fausses.

**« À vérifier en jeu »** : ce que le code ne permet pas de trancher (comportement en partie, objets qui dépendent de la carte). C'est pour quelqu'un qui joue.

**Ce qui n'est pas dans cet audit** : les pages Univers (objets, cartes), Guides et Dev ; les traductions (on corrigera l'anglais d'abord, puis fr/ru/de).

Suite proposée : une petite PR de corrections par rapport (département), avec la preuve du jeu pour chaque changement.
