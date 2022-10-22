const { init, query } = require('./database');
const utils = require('../utils');
const config = require('../config');

async function getMultiple(trame = "BASE", page) {
  const offset = page ? utils.getOffset(page, config.listPerPage) : null;
  const rows = await query(`SELECT Date, Valeur FROM ${trame} ${offset != null && offset >= 0 ? `LIMIT ${offset},${config.listPerPage}` : ''}`);
  const data = utils.emptyOrRows(rows);
  const length = data.length;
  const meta = { page, length };

  return {
    data,
    meta
  }
}

async function create(table) {
  const result = await query(`CREATE TABLE IF NOT EXISTS ${table}(Date DATETIME, Valeur INT(12));`);
  let message = "Impossible d'ajouter la trame " + table;

  if (result.affectedRows) {
    message = 'Table créée !';
  }

  return { message };
}

async function get(content) {
  let meta = {};
  let length = 0;

  let message = "impossible de récupérer les données.";
  if (!content.trame || content.trame == '') {
    message = 'Veuillez indiquer une trame valide. (/trame?trame=...)';

    return { message };
  }

  if (content.dateFrom) {
    const dateTo = content.dateTo != null ? `'${new Date(content.dateTo).toISOString()}'` : 'CURRENT_TIMESTAMP';
    const data = await query(`SELECT * FROM ${content.trame} WHERE Date BETWEEN '${new Date(content.dateFrom).toISOString()}' AND ${dateTo}`);

    if (data.length >= 0) message = `${data.length} données de ${content.trame} entre ${content.dateFrom} et ${content.dateTo}.`;

    length = data.length;
    meta = { length, message, trame: content.trame};
    return { data, meta };
  }

  if (!content.dateFrom && content.dateTo) {
    message = "Veuillez indiquer une date initiale.";
  }

  if (!content.dateFrom && !content.dateTo) {
    const data = await query(`SELECT * FROM ${content.trame}`);

    if (data.length >= 0) message = `${data.length} données.`;

    length = data.length;
    meta = { length, message };
    return { data, meta };
  }

  return { message };
}


async function add(content) {
  let message = "Impossible d'ajouter la ligne.";
  if (!content.valeur || !Number.isInteger(parseInt(content.valeur))) {
    message = "Veuillez indiquer une valeur valide.";
    return { message };
  }
  const result = await query(`INSERT INTO ${content.trame}(Date, Valeur) VALUES (CURRENT_TIMESTAMP() - (EXTRACT(SECOND FROM CURRENT_TIMESTAMP())), ${parseInt(content.valeur)})`);

  if (result.affectedRows) {
    message = 'Ligne ajoutée !';
  }

  return { message };
}

async function remove(content) {
  let message = 'Erreur lors de la requête.';
  if (!content.table || content.table == '') {
    message = 'Veuillez indiquer une trame valide. (/trame?trame=...)';
  }

  if (content.dateFrom) {
    const dateTo = content.dateTo != null ? `'${content.dateTo}'` : 'CURRENT_TIMESTAMP';
    const result = await query(
      `DELETE FROM ${content.table} WHERE Date BETWEEN '${content.dateFrom}' AND ${dateTo}`
    );

    if (result.affectedRows) {
      message = `Données de ${content.trame} entre ${content.dateFrom} et ${dateTo} supprimées.`;
    }

    return { message };
  }

  if (!content.dateFrom && content.dateTo) {
    message = `Veuillez indiquer une date de début valide.`;
    return { message };
  }

  if (content.valeurMin && !content.valeurMax) {
    const result = await query(
      `DELETE FROM ${content.trame} WHERE Valeur >= ${content.valeurMin}`
    );

    if (result.affectedRows) {
      message = `Données de ${content.trame} supérieur ou égal à ${content.valeurMin} supprimées.`;
    }

    return { message };
  }

  if (!parseInt(content.valeurMin) && !parseInt(content.valeurMax)) {
    message = `Veuillez indiquer une valeur valide.`
    return { message };
  }

  if (content.valeurMin && content.valeurMax) {
    const result = await query(
      `DELETE FROM ${content.trame} WHERE Valeur BETWEEN ${content.valeurMin} AND ${content.valeurMax}`
    );

    if (result.affectedRows) {
      message = `Données de ${content.trame} entre ${content.valeurMin} et ${content.valeurMax} supprimées.`;
    }

    return { message };
  }

  if (!content.valeurMin && content.valeurMax) {
    const result = await query(
      `DELETE FROM ${content.trame} WHERE Valeur <= ${content.valeurMax}`
    );

    if (result.affectedRows) {
      message = `Données de ${content.trame} inférieur ou égal à ${content.valeurMax} supprimées.`;
    }

    return { message };
  }

  return { message };
}

module.exports = {
  getMultiple,
  get,
  create,
  add,
  remove
}