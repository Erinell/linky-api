const AutoGitUpdate = require('auto-git-update');

module.exports = {
    initAutoUpdate: function () {
        const config = {
            repository: 'https://github.com/Erinell/linky-api',
            fromReleases: true,
            tempLocation: '../tmp/',
            ignoreFiles: ['config.js'],
            executeOnComplete: 'npm start',
            exitOnComplete: true
        }

        const updater = new AutoGitUpdate(config);
        updater.autoUpdate();
    }
}
