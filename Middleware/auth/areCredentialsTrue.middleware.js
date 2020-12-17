const { ErrorHandler, errorTypes: { UNAUTHORIZED } } = require('../../Errors');
const { passwordEqualityChecker } = require('../../utilities/password.hasher');
const { checkStudent } = require('../../Services/student/student.services');

module.exports = {
    isStudentInDatabase: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const student = await checkStudent(email);

            if (!email || !password) {
                throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
            }

            if (!student) {
                throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
            }

            if (student.email !== email || !(await passwordEqualityChecker(password, student.password))) {
                throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
            }

            req.student = student;

            next();
        } catch (e) {
            next(e);
        }
    },
};
