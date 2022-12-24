const Updater = require("./Updater");
const express = require("express");
const app = express();
const cors = require('cors');
const trameRouter = require("./routes/trame");
const defaultRouter = require("./routes/default");
const serialPort = require("./handlers/SerialCom.js");
const Tester = require("./handlers/Tester.js");
const config = require('./config');
const args = process.argv.slice(2);

const update = new Updater();
update.checkUpdate();

// tester
if (args[0] == "test") {
  console.log("Démarrage en mode test.");
  const tester = new Tester();
  tester.start();
} else {
  const serialport = new serialPort(config.serial.port, config.serial.options);
  serialport.start();
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: '*'
}));

app.use("/trame/", trameRouter);

app.use("*", defaultRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(config.serverPort, () => {
  console.log(`API serveur sur http://localhost:${config.serverPort}`);
});
