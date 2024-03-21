const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const realtime = require('../services/realtime');
const trame = require('../services/trame');
const boot = require('../services/boot');
const { formatLine, getTeleInfos } = require("../utils")

let minute = [null, null];
let check_save = 0;
let is_boot = false;
let boot_count = 0;
const infos = getTeleInfos();

let main = function (device, options) {
  let self = this;
  let serial = new SerialPort({ path: device, ...options });
  let parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }))
  self.start = function () {
    realtime.create();
    boot.create();
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

        if (config.compteur.save_boot.find(id => id == ligne["ID"]) && !is_boot) {
          boot.update({ nom: ligne["ID"], valeur: ligne["valeur"] });
          boot_count++;
          if(boot_count > config.compteur.save_boot.length) {
            is_boot = true;
          }
        }

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
