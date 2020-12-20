const { DATABASE_USERNAME, DATABASE_PASSWORD, HOST_NAME } = require('./config');
const { DATABASE_NAME } = require('./constants/Constants');

module.exports = {
    development: {
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: HOST_NAME,
        dialect: 'mysql'
    },
};
