const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const { DATABASE_USERNAME, DATABASE_PASSWORD, HOST_NAME } = require('../configs/config');
const { DATABASE_NAME } = require('../configs/constants/Constants');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
            host: HOST_NAME,
            dialect: 'mysql'
        });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

        function getModels() {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    const modelFile = require(path.join(`${modelsPath}`, model));
                    models[model] = modelFile(client, DataTypes);
                });
            });
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
