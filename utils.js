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
  getTeleInfos: function(){
    return {
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
  }
}
