const AutoGitUpdate = require('auto-git-update');

module.exports = {
    initAutoUpdate: function () {
        const config = {
            repository: 'https://github.com/chegele/BackupPurger',
            fromReleases: true,
            tempLocation: 'C:/Users/scheg/Desktop/tmp/',
            ignoreFiles: ['util/config.js'],
            executeOnComplete: 'C:/Users/scheg/Desktop/worksapce/AutoGitUpdate/startTest.bat',
            exitOnComplete: true
        }

        const updater = new AutoGitUpdate(config);
        updater.autoUpdate();
    }
}
