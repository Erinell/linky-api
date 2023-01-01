const AutoGitUpdate = require('auto-git-update');
const CronJob = require('cron').CronJob;

let main = function () {
    let self = this;
    const config = {
        repository: 'https://github.com/Erinell/linky-api',
        fromReleases: false,
        tempLocation: '../tmp/',
        ignoreFiles: ['config.js'],
        executeOnComplete: 'npm start',
        exitOnComplete: true,
        logConfig: {
            logGeneral: false,
        }
    };
    let updater = new AutoGitUpdate(config);
    let coroutine = new CronJob(
        '0 */1 * * * *', // toutes les heures h-0
        () => self.checkUpdate()
    );
    self.start = function () {

    }
    self.isUpToDate = async function () {
        const current = await updater.compareVersions();
        return current.upToDate;
    }
    // @param {Boolean} log - Afficher dans la console
    self.checkUpdate = async function (log = true) {
        const current = await updater.compareVersions();
        if (current.upToDate && log) return console.log(`API à jour (${current.currentVersion})`);
        if (current.upToDate && !log) return false;

        console.log(`La mise à jour ${current.remoteVersion} est disponible (version actuelle : ${current.currentVersion})`);
        console.log(`Installation de la mise à jour...`);
        updater.autoUpdate();
    }
    self.startCoroutine = function () {
        coroutine.start();
    }
    self.stopCoroutine = function () {
        coroutine.stop();
    }
}

module.exports = main;