const { ErrorHandler, errorTypes: { UNAUTHORIZED } } = require('../../Errors');
const { passwordChanger: { passwordEqualityChecker } } = require('../../utilities')

module.exports = {
    isStudentLogged: async (req, res, next) => {
        try {
            const student = req.student.dataValues;
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
            }

            if( student.email !== email || !(await passwordEqualityChecker(password, student.password))) {
                throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
