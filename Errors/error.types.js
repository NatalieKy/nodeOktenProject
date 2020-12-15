const {
    BAD_REQUEST, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR, UNAUTHORIZED
} = require('../configs/httpStatusCodes');

module.exports = {
    EMAIL_ALREADY_USED: {
        message: 'Such email is already used!',
        code: FORBIDDEN
    },
    NO_USER_FOUND: {
        message: 'No records of this ID database',
        code: NOT_FOUND
    },
    NOT_VALID_ID: {
        message: 'Not valid Id',
        code: BAD_REQUEST
    },
    NOT_VALID_EMAIL: {
        message: 'Not valid email!',
        code: BAD_REQUEST
    },
    NOT_VALID_STUDENTS_NAME: {
        message: 'Not valid name!',
        code: BAD_REQUEST
    },
    NOT_VALID_GENDER: {
        message: 'Not valid gender!',
        code: BAD_REQUEST
    },
    NOT_VALID_AGE: {
        message: 'Not valid age',
        code: BAD_REQUEST
    },
    NOT_VALID_STUDENTS_BODY: {
        message: 'Incorrect student`s body!',
        code: BAD_REQUEST
    },
    NOT_VALID_CARS_NAME: {
        message: 'Not valid car`s name!',
        code: BAD_REQUEST
    },
    NOT_VALID_STUDENTS_ID: {
        message: 'Not valid student id!',
        code: BAD_REQUEST
    },
    NOT_VALID_CARS_BODY: {
        message: 'Incorrect car`s body!',
        code: BAD_REQUEST
    },
    NOT_VALID_CREDENTIALS: {
        message: 'Wrong credentials',
        code: BAD_REQUEST
    },
    NO_CONNECTION_WITH_DATABASE: {
        message: 'No response from database',
        code: INTERNAL_SERVER_ERROR
    },
    UNAUTHORIZED: {
        message: 'Authorization failed',
        code: UNAUTHORIZED
    }
};
