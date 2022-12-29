const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const realtime = require('../services/realtime');
const trame = require('../services/trame');
const config = require('../config');
const { formatLine } = require("../utils")

const to_save = ["PAPP", "BASE", "IINST1", "IINST2", "IINST3"];
let minute = [null, null];
let check_save = 0;
const infos = {
  "ADCO": {
    id: "ADCO",
    description: "Identifiant du compteur",
    unite: ""
  },
  "OPTARIF": {
    id: "OPTARIF",
    description: "Option tarifaire (type d’abonnement)",
    unite: ""
  },
  "ISOUSC": {
    id: "ISOUSC",
    description: "Intensité souscrite",
    unite: "A"
  },
  "BASE": {
    id: "BASE",
    description: "Index si option = base",
    unite: "Wh"
  },
  "HCHC": {
    id: "HCHC",
    description: "Index heures creuses si option = heures creuses",
    unite: "Wh"
  },
  "HCHP": {
    id: "HCHP",
    description: "Index heures pleines si option = heures creuses",
    unite: "Wh"
  },
  "EJP HN": {
    id: "EJP HN",
    description: "Index heures normales si option = EJP",
    unite: "Wh"
  },
  "EJP HPM": {
    id: "EJP HPM",
    description: "Index heures de pointe mobile si option = EJP",
    unite: "Wh"
  },
  "BBR HC JB": {
    id: "BBR HC JB",
    description: "Index heures creuses jours bleus si option = tempo",
    unite: "Wh"
  },
  "BBR HP JB": {
    id: "BBR HP JB",
    description: "Index heures pleines jours bleus si option = tempo",
    unite: "Wh"
  },
  "BBR HC JW": {
    id: "BBR HC JW",
    description: "Index heures creuses jours blancs si option = tempo",
    unite: "Wh"
  },
  "BBR HC JW": {
    id: "BBR HC JW",
    description: "Index heures pleines jours blancs si option = tempo",
    unite: "Wh"
  },
  "BBR HC JR": {
    id: "BBR HC JR",
    description: "Index heures creuses jours rouges si option = tempo",
    unite: "Wh"
  },
  "BBR HP JR": {
    id: "BBR HP JR",
    description: "Index heures pleines jours rouges si option = tempo",
    unite: "Wh"
  },
  "PEJP": {
    id: "PEJP",
    description: "Préavis EJP si option = EJP 30mn avant période EJP",
    unite: ""
  },
  "PTEC": {
    id: "PTEC",
    description: "Période tarifaire en cours",
    unite: ""
  },
  "DEMAIN": {
    id: "DEMAIN",
    description: "Couleur du lendemain si option = tempo",
    unite: ""
  },
  "IINST": {
    id: "IINST",
    description: "Intensité instantanée",
    unite: "A"
  },
  "IINST1": {
    id: "IINST1",
    description: "Intensité instantanée phase 1",
    unite: "A"
  },
  "IINST2": {
    id: "IINST2",
    description: "Intensité instantanée phase 2",
    unite: "A"
  },
  "IINST3": {
    id: "IINST3",
    description: "Intensité instantanée phase 3",
    unite: "A"
  },
  "ADPS": {
    id: "ADPS",
    description: "Avertissement de dépassement de puissance souscrite",
    unite: "A"
  },
  "IMAX": {
    id: "IMAX",
    description: "Intensité maximale",
    unite: "A"
  },
  "IMAX1": {
    id: "IMAX1",
    description: "Intensité maximale phase 1",
    unite: "A"
  },
  "IMAX2": {
    id: "IMAX2",
    description: "Intensité maximale phase 2",
    unite: "A"
  },
  "IMAX3": {
    id: "IMAX3",
    description: "Intensité maximale phase 3",
    unite: "A"
  },
  "PMAX": {
    id: "PMAX",
    description: "Puissance maximale",
    unite: "W"
  },
  "PAPP": {
    id: "PAPP",
    description: "Puissance apparente",
    unite: "V.A"
  },
  "HHPHC": {
    id: "HHPHC",
    description: "Groupe horaire si option = heures creuses ou tempo",
    unite: ""
  },
  "MOTDETAT": {
    id: "MOTDETAT",
    description: "Mot d’état (autocontrôle)",
    unite: ""
  },
  "PPOT": {
    id: "PPOT",
    description: "Présence des potentiels",
    unite: ""
  }
};

realtime.create();
to_save.forEach(table => {
  trame.create(table);
})

let main = function (device, options) {
  let self = this;
  let serial = new SerialPort({ path: device, ...options });
  let parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }))
  self.start = function () {
    serial.on('open', () => {
      console.log("Connecté au compteur !");
    });
    parser.on('data', line => {
      let ligne = new Array();
      if (line.split(" ").length === 3 && infos[line.split(" ")[0]]) {
        ligne["ID"] = formatLine(line.split(" ")[0]);
        ligne["valeur"] = formatLine(line.split(" ")[1]);
        ligne["checksum"] = formatLine(line.split(" ")[2]);

        realtime.update({ nom: ligne["ID"], valeur: ligne["valeur"] });

        minute[0] = new Date().getMinutes();
        if (minute[0] % config.saveFrequency == 0 && minute[1] != minute[0]) {
          if (to_save.find(id => id == ligne["ID"])) {
            trame.add({ trame: ligne["ID"], valeur: ligne["valeur"] });
            check_save += 1;
          }
          if (check_save == to_save.length) {
            check_save = 0;
            minute[1] = minute[0];
          }
        }
      }
    });
    parser.on('close', function () {

    });
    serial.on('error', function (err) {
      console.log("Impossible de se connecter au compteur :");
      console.log(err);
    });
  };
  self.restart = function () {
    if (device, options) {
      setTimeout(function () {
        self.start(device, options);
      });
    }
  }
}

module.exports = main;
