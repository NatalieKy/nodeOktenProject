const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, METHOD_NOT_ALLOWED } = require('../configs/httpStatusCodes');

module.exports = {
    NOT_VALID_CREDENTIALS: {
        message: 'Wrong credentials',
        code: BAD_REQUEST
    },
    TOO_BIG_FILE: {
        message: 'Uploaded file is too big. Maximum size is 10mb',
        code: BAD_REQUEST
    },
    TOO_BIG_PHOTO: {
        message: 'Uploaded photo is too big. Maximum size is 5mb',
        code: BAD_REQUEST
    },
    TOO_MANY_STUDENT_PHOTOS: {
        message: 'Uploaded student`s photo must be one',
        code: BAD_REQUEST
    },
    TOO_MANY_CARS_PHOTOS: {
        message: 'Uploaded car`s photos must be not more than 10',
        code: BAD_REQUEST
    },
    WRONG_FILE_FORMAT: {
        message: 'Incorrect file`s type',
        code: BAD_REQUEST
    },
    FORBIDDEN: {
        message: 'Access denied',
        code: FORBIDDEN
    },
    EMAIL_ALREADY_USED: {
        message: 'Such email is already used!',
        code: FORBIDDEN
    },
    UNAUTHORIZED: {
        message: 'Authorization failed',
        code: UNAUTHORIZED
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
};
