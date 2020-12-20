const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, METHOD_NOT_ALLOWED } = require('../configs/httpStatusCodes');

module.exports = {
    FORBIDDEN: {
        message: 'Access denied',
        code: FORBIDDEN
    },
    EMAIL_ALREADY_USED: {
        message: 'Such email is already used!',
        code: FORBIDDEN
    },
    INVALID_TOKEN: {
        message: 'Token is invalid',
        code: UNAUTHORIZED
    },
    METHOD_NOT_ALLOWED: {
        message: 'Not allowed, user is already logged in',
        code: METHOD_NOT_ALLOWED
    },
    NO_CAR_FOUND: {
        message: 'No records of this ID in car database',
        code: NOT_FOUND
    },
    NO_USER_FOUND: {
        message: 'No records of this ID in user database',
        code: NOT_FOUND
    },
    NOT_VALID_CREDENTIALS: {
        message: 'Wrong credentials',
        code: BAD_REQUEST
    },
    UNAUTHORIZED: {
        message: 'Authorization failed',
        code: UNAUTHORIZED
    },
};
