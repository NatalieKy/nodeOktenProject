const { studentService } = require('../../Services/student');
const { ErrorHandler, errorTypes: { EMAIL_ALREADY_USED, NO_USER_FOUND } } = require('../../Errors');

module.exports = {
    isStudentPresent: async (req, res, next) => {
        try {
            const { email } = req.body;
            const isStudentInDB = await studentService.checkStudent(email);

            if (isStudentInDB) {
                throw new ErrorHandler(EMAIL_ALREADY_USED.message, EMAIL_ALREADY_USED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdPresent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const student = await studentService.idChecker(id);

            if (!student) {
                throw new ErrorHandler(NO_USER_FOUND.message, NO_USER_FOUND.code);
            }

            req.student = student;
            next();
        } catch (e) {
            next(e);
        }
    },
};
