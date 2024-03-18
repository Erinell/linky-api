const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const realtime = require('../services/realtime');
const trame = require('../services/trame');
const { formatLine, getTeleInfos } = require("../utils")

let minute = [null, null];
let check_save = 0;
const infos = getTeleInfos();

let main = function (device, options) {
  let self = this;
  let serial = new SerialPort({ path: device, ...options });
  let parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }))
  self.start = function () {
    realtime.create();
    config.compteur.save.forEach(table => {
      trame.create(table);
    })

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
        if (minute[0] % config.compteur.save_frequency == 0 && minute[1] != minute[0]) {
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
