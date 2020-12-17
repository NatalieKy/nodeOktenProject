const { ErrorHandler } = require('../../../Errors');
const { BAD_REQUEST } = require('../../../configs/httpStatusCodes');
const {
    studentBodyForCreateValidator, studentBodyForUpdateValidator, studentCredentialsValidator, studentIdValidator
} = require('../../../joiValidators/student');

module.exports = {
    isStudentForCreateBodyCorrect: (req, res, next) => {
        try {
            const { error } = studentBodyForCreateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyForUpdateCorrect: (req, res, next) => {
        try {
            const { error } = studentBodyForUpdateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isIdCorrect: (req, res, next) => {
        try {
            const { error } = studentIdValidator.validate(req.params.id);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            req.studentId = req.params;
            next();
        } catch (e) {
            next(e);
        }
    },
    areCredentialsCorrect: (req, res, next) => {
        try {
            const { error } = studentCredentialsValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
