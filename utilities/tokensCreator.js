const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE } = require('../configs/constants/Constants');
const { ACCESS_TOKEN_WORD, REFRESH_TOKEN_WORD } = require('../configs/config');

module.exports = () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_WORD, { expiresIn: ACCESS_TOKEN_LIFE });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_WORD, { expiresIn: REFRESH_TOKEN_LIFE });

    return {
        accessToken,
        refreshToken
    };
};
