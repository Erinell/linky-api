const { query } = require('./database');
const { getTeleInfos, config } = require('../utils');

async function init() {
    const infos = getTeleInfos();
    for (var info in infos) {
        if (config.compteur.save_boot.find(id => id == info)) {
            await query(`INSERT INTO info(Date, Nom, Description, Unite) VALUES (CURRENT_TIMESTAMP, '${infos[info].id}', '${infos[info].description}', '${infos[info].unite}') ON DUPLICATE KEY UPDATE Date=CURRENT_TIMESTAMP`);
        }
    }
}

async function create() {
    const result = await query(`CREATE TABLE IF NOT EXISTS info(Date DATETIME, Nom VARCHAR(11), Description TEXT, Valeur VARCHAR(15), Unite VARCHAR(11), PRIMARY KEY(Nom));`);

    await init();
    let message = "Impossible d'ajouter la table";

    if (result.affectedRows) {
        message = 'Table créée !';
    }

    return { message };
}

async function update(content) {
    const result = await query(`UPDATE info SET Date=CURRENT_TIMESTAMP, Valeur="${content.valeur}" WHERE Nom="${content.nom}"`);

    let message = `Impossible de mettre à jour ${content.nom}.`;
    if (result.affectedRows) {
        message = `${content.nom} mis à jour.`;
    }

    return { message };
}

module.exports = {
    create,
    update
}