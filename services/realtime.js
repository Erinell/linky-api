const { query } = require('./database');
const utils = require('../utils');

async function getRealtime() {
  const rows = await query(`SELECT * FROM realtime`);
  const data = utils.emptyOrRows(rows);
  const length = data.length;

  const meta = { length };

  return {
    data,
    meta
  }
}


async function init() {
  const infos = utils.getTeleInfos();
  for (var info in infos) {
    await query(`INSERT INTO realtime(Date, Nom, Description, Unite) VALUES (CURRENT_TIMESTAMP, '${infos[info].id}', '${infos[info].description}', '${infos[info].unite}') ON DUPLICATE KEY UPDATE, Date=CURRENT_TIMESTAMP`);
  }
}

async function create() {
  const result = await query(`CREATE TABLE IF NOT EXISTS realtime(Date DATETIME, Nom VARCHAR(11), Description TEXT, Valeur VARCHAR(15), Unite VARCHAR(11), PRIMARY KEY(Nom));`);

  await init();
  let message = "Impossible d'ajouter la table";

  if (result.affectedRows) {
    message = 'Table créée !';
  }

  return { message };
}

async function update(content) {

  const result = await query(`UPDATE realtime SET Date=CURRENT_TIMESTAMP, Valeur="${content.valeur}" WHERE Nom="${content.nom}"`);

  let message = `Impossible de mettre à jour ${content.nom}.`;
  if (result.affectedRows) {
    message = `${content.nom} mis à jour.`;
  }
  
  return { message };
}

module.exports = {
  getRealtime,
  create,
  update
}