const fs = require('fs');
const YAML = require('yaml');
const config = YAML.parse(fs.readFileSync("config.yml", 'utf-8'));

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
module.exports = {
  getOffset,
  emptyOrRows,
  formatLine: function (line) {
    return line ? line.replace(/\r?\n|\r/, '') : '';
  },
  getTeleInfos: function () {
    return config.compteur.mode == 0 ? {
      "ADSC": {
        id: "ADSC",
        description: "Adresse secondaire du compteur",
        unite: ""
      },
      "VTIC": {
        id: "VTIC",
        description: "Version de la TIC",
        unite: ""
      },
      "DATE": {
        id: "DATE",
        description: "Date et heure courante",
        unite: ""
      },
      "NGTF": {
        id: "NGTF",
        description: "Nom du calendrier tarifaire fournisseur",
        unite: ""
      },
      "LTARF": {
        id: "LTARF",
        description: "Libellé tarif fournisseur en cours",
        unite: ""
      },
      "EAST": {
        id: "EAST",
        description: "Energie active soutirée totale",
        unite: "Wh"
      },
      "IRMS1": {
        id: "IRMS1",
        description: "Courant efficace phase 1",
        unite: "A"
      },
      "IRMS2": {
        id: "IRMS2",
        description: "Courant efficace phase 2",
        unite: "A"
      },
      "IRMS3": {
        id: "IRMS3",
        description: "Courant efficace phase 3",
        unite: "A"
      },
      "URMS1": {
        id: "URMS1",
        description: "Courant efficace phase 1",
        unite: "V"
      },
      "URMS2": {
        id: "URMS2",
        description: "Courant efficace phase 2",
        unite: "V"
      },
      "URMS3": {
        id: "URMS3",
        description: "Courant efficace phase 3",
        unite: "V"
      },
      "PREF": {
        id: "PREF",
        description: "Puissance apparente de référence",
        unite: "kVA"
      },
      "PCOUP": {
        id: "PCOUP",
        description: "Puissance apparente de coupure",
        unite: "kVA"
      },
      "SINSTS": {
        id: "SINSTS",
        description: "Puissance apparente instantanée soutirée",
        unite: "VA"
      },
      "SINSTS1": {
        id: "SINSTS1",
        description: "Puissance apparente instantanée soutirée phase 1",
        unite: "VA"
      },
      "SINSTS2": {
        id: "SINSTS2",
        description: "Puissance apparente instantanée soutirée phase 2",
        unite: "VA"
      },
      "SINSTS3": {
        id: "SINSTS3",
        description: "Puissance apparente instantanée soutirée phase 3",
        unite: "VA"
      },
      "SMAXSN": {
        id: "SMAXSN",
        description: "Puissance apparente max soutirée",
        unite: "VA"
      },
      "SMAXSN1": {
        id: "SMAXSN1",
        description: "Puissance apparente max soutirée phase 1",
        unite: "VA"
      },
      "SMAXSN2": {
        id: "SMAXSN2",
        description: "Puissance apparente max soutirée phase 2",
        unite: "VA"
      },
      "SMAXSN3": {
        id: "SMAXSN3",
        description: "Puissance apparente max soutirée phase 3",
        unite: "VA"
      },
      "SMAXSN-1": {
        id: "SMAXSN-1",
        description: "Puissance apparente max soutirée n-1",
        unite: "VA"
      },
      "SMAXSN1-1": {
        id: "SMAXSN1-1",
        description: "Puissance apparente max soutirée phase 1 n-1",
        unite: "VA"
      },
      "SMAXSN2-1": {
        id: "SMAXSN2-1",
        description: "Puissance apparente max soutirée phase 2 n-1",
        unite: "VA"
      },
      "SMAXSN3-1": {
        id: "SMAXSN3-1",
        description: "Puissance apparente max soutirée phase 3 n-1",
        unite: "VA"
      },
      "CCASN": {
        id: "CCASN",
        description: "Point n de la courbe de charge active soutirée",
        unite: "W"
      },
      "CCASN-1": {
        id: "CCASN-1",
        description: "Point n-1 de la courbe de charge active soutirée",
        unite: "W"
      },
      "UMOY1": {
        id: "UMOY1",
        description: "Tension moyenne phase 1",
        unite: "V"
      },
      "UMOY2": {
        id: "UMOY2",
        description: "Tension moyenne phase 2",
        unite: "V"
      },
      "UMOY3": {
        id: "UMOY3",
        description: "Tension moyenne phase 3",
        unite: "V"
      },
      "STGE": {
        id: "STGE",
        description: "Registre de statuts",
        unite: ""
      },
      "DPM1": {
        id: "DPM1",
        description: "Début pointe mobile 1",
        unite: ""
      },
      "FPM1": {
        id: "FPM1",
        description: "Fin pointe mobile 1",
        unite: ""
      },
    } :
      {
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
      }
  },
  config
}
