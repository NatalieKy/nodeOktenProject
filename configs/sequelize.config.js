require('dotenv').config();
const { DB_USERNAME, DB_PASSWORD } = require('./config');
const { DATABASE_NAME, DIALECT } = require('./constants/Constants');

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DATABASE_NAME,
        dialect: DIALECT
    },
};
