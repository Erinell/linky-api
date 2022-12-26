const AutoGitUpdate = require('auto-git-update');

let main = function() {
    let self = this;
    const config = {
        repository: 'https://github.com/Erinell/linky-api',
        fromReleases: false,
        tempLocation: '../tmp/',
        ignoreFiles: ['config.js'],
        executeOnComplete: 'npm start',
        exitOnComplete: true,
        logConfig: {
            logGeneral:  false,
        }
    };
    let updater = new AutoGitUpdate(config);
    self.start = function() {

    }
    self.checkUpdate = async function (){
        const current = await updater.compareVersions();
        if(current.upToDate) return console.log(`API à jour (${current.currentVersion})`);
    
        console.log(`La mise à jour ${current.remoteVersion} est disponible (version actuelle : ${current.currentVersion})`);
        console.log(`Installation de la mise à jour...`);
        updater.autoUpdate();
    }
}

module.exports = main;