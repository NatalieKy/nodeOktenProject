const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_WORD, REFRESH_TOKEN_WORD } = require('../configs/config');

module.exports = () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_WORD, { expiresIn: '30' });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_WORD, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken
    };
};
