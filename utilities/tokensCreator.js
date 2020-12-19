const jwt = require('jsonwebtoken');

module.exports = () => {
    const accessToken = jwt.sign({}, 'firstKey', { expiresIn: '30' });
    const refreshToken = jwt.sign({}, 'secondKey', { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken
    };
};
