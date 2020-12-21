const { BAD_REQUEST } = require('../../configs/httpStatusCodes');
const { ErrorHandler } = require('../../Errors');
const {
    studentBodyForCreateValidator, studentBodyForUpdateValidator, studentIdValidator
} = require('../../joiValidators/student');

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

    isStudentIdCorrect: (req, res, next) => {
        try {
            const { student_id } = req.params;
            const { error } = studentIdValidator.validate(req.params.student_id);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            req.studentId = student_id;
            next();
        } catch (e) {
            next(e);
        }
    },
};
