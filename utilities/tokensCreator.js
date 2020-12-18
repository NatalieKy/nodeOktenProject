const jwt = require('jsonwebtoken');

module.exports = () => {
    const accessToken = jwt.sign({}, 'firstKey', { expiresIn: '600' });
    const refreshToken = jwt.sign({}, 'secondKey', { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken
    };
};
