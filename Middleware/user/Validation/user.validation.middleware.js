const { ErrorHandler } = require('../../../Errors');
const { BAD_REQUEST } = require('../../../configs/httpStatusCodes');
const {  userIdValidator, userBodyValidator, userCredentialsValidator } = require('../../../Validators/users');

module.exports = {
    isIdCorrect: (req, res, next) => {
        try {
            const { error } = userIdValidator.validate(req.params.id);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            req.studentId = req.params;
            next();
        } catch (e) {
            next(e);
        }
    },

    isStudentBodyCorrect: (req, res, next) => {
        try {
            const { error } = userBodyValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    areCredentialsCorrect: (req, res, next) => {
        try {
            const { error } = userCredentialsValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
