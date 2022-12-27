# Linky-API

Serveur API pour collecter les données du compteur Linky et stocker dans une base de donnée.
La communication s'effectue via la sortie TIC (Télé-Information Client) du compteur Linky.

![T|200x100,20%](https://github.com/Erinell/linky-api/blob/master/docs/img/LinkyToRpi.jpg?raw=true)

---
## Requirements
#### Software
Pour le développement, vous n'aurez besoin que de Node.js et d'un gestionnaire de packages tel que yarn ou npm.

#### Hardware
- Raspberry Pi (Zero W / 3B+ / 4B)
- Compteur Linky
- Circuit de comunication TIC (voir schéma)

![test](https://github.com/Erinell/linky-api/blob/master/docs/img/Schema.png?raw=true)

## Installation

    $ git clone https://github.com/Erinell/linky-api
    $ cd linky-api
    $ npm install ou yarn install

## Configurer le projet

Ouvrir `config.js` pour modifier certains paramètres.

paramètre     | description
--------------|-------------------------------------------------------
saveFrequency | Fréquence d'enregistrement des données (défaut : 5min)
serverPort    | Port pour l'accès à l'API (défaut : 3000)
db            | Paramètres de connexion à la base de donnée
serial        | Paramètres serial de connexion au compteur

## Démarrer le projet

    $ yarn start
    ou
    $ npm start

Il est possible de lancer en mode test pour simuler la connexion au Linky mais qui envoi des données aléatoires dans une autre base de données (voir `.env` et `config.js`).

    $ yarn start test
    ou
    $ npm start test