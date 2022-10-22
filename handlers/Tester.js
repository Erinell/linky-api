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

let main = function () {
  let self = this;
  let delay = 2000 / 15; // toutes les 2 sec, on divise par nombre de ligne
  let coroutine;
  let currentIndex = 0;
  self.start = function () {
    coroutine = setInterval(this.fetch, delay);
  };

  self.getData = function () {
    const ADCO = Math.floor(100000000000 + Math.random() * 999999999999);
    const OPTARIF = "BASE";
    const ISOUSC = "15";
    const BASE = Math.floor(Date.now() / 10000);
    const PTEC = "TH...";
    const IINST1 = "00" + Math.floor(Math.random() * 10).toString();
    const IINST2 = "00" + Math.floor(Math.random() * 10).toString();
    const IINST3 = "00" + Math.floor(Math.random() * 10).toString();
    const IMAX1 = "0" + Math.floor(Math.random() * 10).toString() + "0";
    const IMAX2 = "0" + Math.floor(Math.random() * 10).toString() + "0";
    const IMAX3 = "0" + Math.floor(Math.random() * 10).toString() + "0";
    const PMAX = "0" + Math.floor(1000 + Math.random() * 1000).toString();
    const PAPP = "00" + Math.floor(99 + Math.random() * 100).toString();
    const HHPHC = "A";
    const MOTDETAT = "000000";
    const PPOT = "00";

    const trames = [
      `ADCO ${ADCO} L`,
      `ISOUSC ${ISOUSC} <`,
      `BASE ${BASE} 6`,
      `PTEC ${PTEC} $`,
      `IINST1 ${IINST1} I`,
      `IINST2 ${IINST2} J`,
      `IINST3 ${IINST3} J`,
      `IMAX1 ${IMAX1} 6`,
      `IMAX2 ${IMAX2} 7`,
      `IMAX3 ${IMAX3} 8`,
      `PMAX ${PMAX} 7`,
      `PAPP ${PAPP} &`,
      `HHPHC ${HHPHC} ,`,
      `MOTDETAT ${MOTDETAT} B`,
      `PPOT ${PPOT} #`,
    ];

    return trames;
  };

  self.fetch = function () {
    const lines = self.getData();
    
    let currentLine = lines[currentIndex];
    self.compute(currentLine);
    currentIndex ++;
    if(currentIndex >= lines.length) {
      currentIndex = 0;
    }
  }

  self.compute = function(line) {
    let ligne = new Array();
    if (line.split(" ").length === 3 && infos[line.split(" ")[0]]) {
      ligne["ID"] = formatLine(line.split(" ")[0]);
      ligne["valeur"] = formatLine(line.split(" ")[1]);
      ligne["checksum"] = formatLine(line.split(" ")[2]);
      
      realtime.update({ nom: ligne["ID"], valeur: ligne["valeur"] });
      minute[0] = new Date().getMinutes();
      if (minute[0] % config.saveFrequency == 0 && minute[1] != minute[0]) {
        if (to_save.find(id => id == ligne["ID"])) {
          //SQL.send("FREQUENCE", ligne["ID"], info[ligne["ID"]].description, ligne["valeur"], info[ligne["ID"]].unite);
          // console.log({ trame: ligne["ID"], valeur: ligne["valeur"] });
          trame.add({ trame: ligne["ID"], valeur: ligne["valeur"] });
          check_save += 1;
        }
        if (check_save == to_save.length) {
          check_save = 0;
          minute[1] = minute[0];
        }
      }
    }
  };
  self.stop = function () {
    if(!coroutine) return console.log("Rien ne tourne.");
    clearInterval(coroutine);
  }

}

// PPOT 00 #
// ADCO 042076056698 L
// OPTARIF BASE 0
// ISOUSC 15 <
// BASE 013888366 6
// PTEC TH.. $
// IINST1 001 I
// IINST2 001 J
// IINST3 000 J
// IMAX1 060 6
// IMAX2 060 7
// IMAX3 060 8
// PMAX 02726 7
// PAPP 00410 &
// HHPHC A ,
// MOTDETAT 000000 B

module.exports = main;
