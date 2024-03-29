# Linky-API

Serveur API pour collecter les données du compteur Linky et stocker dans une base de donnée.
La communication s'effectue via la sortie TIC (Télé-Information Client) du compteur Linky.

<img src="https://github.com/Erinell/linky-api/blob/master/docs/img/LinkyToRpi.jpg?raw=true"  width="80%">

---
## Requirements
### Software
Pour le développement, vous n'aurez besoin que de Node.js et d'un gestionnaire de packages tel que yarn ou npm.

![Grafana](https://github.com/Erinell/linky-api/blob/master/docs/img/Grafana.png?raw=true)
![Grafana1](https://github.com/Erinell/linky-api/blob/master/docs/img/Grafana1.png?raw=true)
### Hardware
- Raspberry Pi (Zero W / 3B+ / 4B)
- Compteur Linky
- Circuit de communication TIC (voir schéma)

![schema](https://github.com/Erinell/linky-api/blob/master/docs/img/Schema.png?raw=true)

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

## API
* [GET /](#a)
* [GET /trame](#b)
* [GET /trame?trame=](#c)
* [GET /trame?trame=&dateFrom=](#d)
* [GET /trame?trame=&dateFrom=&dateTo=](#e)
##### Requête
<a name="a"/>

`GET /` & `GET /realtime`

    curl -i -H 'Accept: application/json' http://localhost:3000/
    curl -i -H 'Accept: application/json' http://localhost:3000/realtime

##### Réponse

    {
        "data": [{
            "Date": "YYYY-MM-ddThh:mm:ss.000Z",
            "Nom": "INDEX",
            "Description": "Description",
            "Valeur": "0",
            "Unite": ""
        }],
        "meta": {
            "length": 0
        }
    }

##### Requête
<a name="b"/>

`GET /trame`

    curl -i -H 'Accept: application/json' http://localhost:3000/trame

##### Réponse

    {
        "message": "Veuillez indiquer une trame valide. (/trame?trame=...)"
    }

##### Requête
<a name="c"/>

`GET /trame?trame=IINST1`

    curl -i -H 'Accept: application/json' http://localhost:3000/trame?trame=IINST1

##### Réponse

    {
        "data": [{
            "Date": "YYYY-MM-ddThh:mm:ss.000Z",
            "Valeur": 0
        }],
        "meta": {
            "length": 0,
            "message": "0 données."
        }
    }

##### Requête
<a name="d"/>

`GET /trame?trame=IINST1&dateFrom=jj/MM/YYYY%20HH:mm:ss`

    curl -i -H 'Accept: application/json' http://localhost:3000/trame?trame=IINST1&dateFrom=jj/MM/YYYY%20HH:mm:ss

##### Réponse
    {
        "data": [{
            "Date": "YYYY-MM-ddThh:mm:ss.000Z",
            "Valeur": 0
        }],
        "meta": {
            "length": 0,
            "message": "20 données de IINST1 entre jj/MM/YYYY HH:mm:ss et maintenant.",
            "trame": "IINST1"
        }
    }

##### Requête
<a name="e"/>

`GET /trame?trame=IINST1&dateFrom=jj/MM/YYYY%20HH:mm:ss&dateTo=jj/MM/YYYY%20HH:mm:ss`

    curl -i -H 'Accept: application/json' http://localhost:3000/trame?trame=IINST1&dateFrom=jj/MM/YYYY%20HH:mm:ss&dateTo=jj/MM/YYYY%20HH:mm:ss

##### Réponse
    {
        "data": [{
            "Date": "YYYY-MM-ddThh:mm:ss.000Z",
            "Valeur": 0
        }],
        "meta": {
            "length": 0,
            "message": "20 données de IINST1 entre jj/MM/YYYY HH:mm:ss et jj/MM/YYYY HH:mm:ss.",
            "trame": "IINST1"
        }
    }