const jwt = require('jsonwebtoken');
const { ErrorHandler, errorTypes: { INVALID_TOKEN, FORBIDDEN } } = require('../../Errors');
const { tokenService } = require('../../Services/tokens');

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.get('Authorization');
        const parametrID = req.params.id;

        if (!accessToken) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
        }

        jwt.verify(accessToken, 'firstKey', (err) => {
            if (err) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }
        });

        const studentWithAccessToken = (await tokenService.getAccessToken(accessToken));
        const { id } = studentWithAccessToken.dataValues;

        if (!studentWithAccessToken) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
        }

        if (id !== +parametrID) {
            throw new ErrorHandler(FORBIDDEN.message, FORBIDDEN.code);
        }

        req.body = studentWithAccessToken;

        next();
    } catch (e) {
        next(e);
    }
};
