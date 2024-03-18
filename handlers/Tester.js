const realtime = require('../services/realtime');
const trame = require('../services/trame');
const { formatLine, getTeleInfos, config } = require("../utils");

let minute = [null, null];
let check_save = 0;
const infos = getTeleInfos();


let main = function () {
  let self = this;
  let delay = 2000 / 15; // toutes les 2 sec, on divise par nombre de ligne
  let coroutine;
  let currentIndex = 0;
  self.start = function () {
    coroutine = setInterval(this.fetch, delay);
    realtime.create();
    config.compteur.save.forEach(table => {
      trame.create(table);
    })
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
    currentIndex++;
    if (currentIndex >= lines.length) {
      currentIndex = 0;
    }
  }

  self.compute = function (line) {
    let ligne = new Array();
    if (line.split(" ").length === 3 && infos[line.split(" ")[0]]) {
      ligne["ID"] = formatLine(line.split(" ")[0]);
      ligne["valeur"] = formatLine(line.split(" ")[1]);
      ligne["checksum"] = formatLine(line.split(" ")[2]);

      if (config.compteur.save_realtime.find(id => id == ligne["ID"])) {
        realtime.update({ nom: ligne["ID"], valeur: ligne["valeur"] });
      }

      minute[0] = new Date().getMinutes();
      if (minute[0] % config.compteur.save_frequency == 0 && minute[1] != minute[0]) {
        if (config.compteur.save.find(id => id == ligne["ID"])) {
          trame.add({ trame: ligne["ID"], valeur: ligne["valeur"] });
          check_save += 1;
        }
        if (check_save == config.compteur.save.length) {
          check_save = 0;
          minute[1] = minute[0];
        }
      }
    }
  };
  self.stop = function () {
    if (!coroutine) return console.log("Rien ne tourne.");
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
