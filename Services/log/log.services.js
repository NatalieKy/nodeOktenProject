const LogModel = require('../../dataBase/mongoDB/Log');

module.exports = {
    createLogs: (logInfo) => new LogModel(logInfo).save(),
};
