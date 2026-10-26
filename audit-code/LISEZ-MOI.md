# Audit des pages métiers : le wiki comparé au code du jeu

**Le jeu est la source de vérité.** Chaque page métier du wiki (anglais, `docs/3_HowToPlay/Jobs/`, sur `main` au 26/10/2026) a été comparée au code du jeu ([unitystation/unitystation](https://github.com/unitystation/unitystation), branche `develop`, commit `31ad5f54`) : nom affiché, département, accès, difficulté, équipement de départ, chiffres donnés par la page.

Méthode, en trois passes :
1. un premier relecteur compare chaque page au fichier du métier dans le jeu (`ScriptableObjects/Occupations/…`) ;
2. un second relecteur, plus sceptique, revérifie **chaque** verdict FAUX, PÉRIMÉ ou ABSENT et un échantillon des JUSTE. Il a lu aussi les **cartes** des stations : un objet absent de l'équipement de départ peut être posé dans un casier (ex. le taser du Security Officer est dans son casier, le fusil du Bartender est sur 4 cartes sur 5). Ces cas sont corrigés.
3. une 3e passe a lu aussi les **prefabs** (fichiers qui décrivent chaque objet) pour trancher les points restés « à vérifier en jeu », puis une nouvelle relecture sceptique a vérifié chacun de ces verdicts.

Chaque verdict cite le fichier du jeu qui le prouve. ✔ = confirmé par la 2e relecture.

| Rapport | Pages | FAUX | PÉRIMÉ | ABSENT | À vérifier en jeu |
|---|---|---|---|---|---|
| [Commandement, Sécurité, Ingénierie, Synthétiques](commandement-securite-ingenierie-synthetiques.md) | 12 | 12 | 10 | 3 | 8 |
| [Médical, Science](medical-science.md) | 11 | 15 | 10 | 14 | 8 |
| [Cargo, Service, Divertissement](cargo-service-divertissement.md) | 13 | 58 | 12 | 31 | 4 |
| [Antagonistes, Protagonistes](antagonistes-protagonistes.md) | 16 | 26 | 12 | 17 | 9 |
| **Total** | **52** | **111** | **44** | **65** | **29** |

Les comptes sont faits ligne par ligne dans chaque rapport (Antagonistes : sans le nom « Cargonia », déjà traité par la PR #382) (une ligne de tableau peut regrouper plusieurs points, par exemple la table des prix du Quartermaster).

**Exemples d'erreurs confirmées** : air de la station à 101 kPa (pas 300) ; clonage en 3 min (pas 10-15 s) ; 7 métiers du Service sans accès maintenance ; prix des caisses cargo périmés ; Traitor avec 2 objectifs tirés au hasard + 1 de fuite ; Rebellion en rotation dès 15 joueurs avec un département rebelle tiré au hasard ; plusieurs difficultés fausses.

**« À vérifier en jeu »** : il en reste 29, que le code ne permet pas de trancher (règles de serveur, comportement en partie). Ils sont réunis en questions simples dans [QUESTIONS-JOUEUR.md](QUESTIONS-JOUEUR.md), pour quelqu'un qui joue.

**Ce qui n'est pas dans cet audit** : les pages Univers (objets, cartes), Guides et Dev ; les traductions (on corrigera l'anglais d'abord, puis fr/ru/de).

Suite proposée : une petite PR de corrections par rapport (département), avec la preuve du jeu pour chaque changement.
