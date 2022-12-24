const AutoGitUpdate = require('auto-git-update');

let main = function() {
    let self = this;
    const config = {
        repository: 'https://github.com/Erinell/linky-api',
        fromReleases: false,
        tempLocation: '../tmp/',
        ignoreFiles: ['config.js'],
        executeOnComplete: 'npm start',
        exitOnComplete: true
    };
    let updater = new AutoGitUpdate(config);
    self.start = function() {

    }
    self.checkUpdate = function (){
        const current = updater.compareVersions();
        if(current.upToDate) return console.log(`API à jour (${currentVersion})`);
    
        console.log(`La mise à jour ${remoteVersion} est disponible (version actuelle : ${currentVersion})`);
        updater.autoUpdate();
    }
}

module.exports = {
    initAutoUpdate: function () {
        const config = {
            repository: 'https://github.com/Erinell/linky-api',
            fromReleases: false,
            tempLocation: '../tmp/',
            ignoreFiles: ['config.js'],
            executeOnComplete: 'npm start',
            exitOnComplete: true
        }

        const updater = new AutoGitUpdate(config);
        updater.autoUpdate();
    }
}
