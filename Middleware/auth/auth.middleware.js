const jwt = require('jsonwebtoken');

const { ErrorHandler, errorTypes: { UNAUTHORIZED, INVALID_TOKEN, FORBIDDEN } } = require('../../Errors');
const { passwordEqualityChecker } = require('../../utilities/password.hasher');
const { checkStudentByEmail } = require('../../Services/student/student.services');
const { tokenService } = require('../../Services/tokens');

module.exports = {
    areCredentialsTrue: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const student = await checkStudentByEmail(email);

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

    isAccessTokenAndIdTrue: async (req, res, next) => {
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

            req.studentWithToken = studentWithAccessToken;

            next();
        } catch (e) {
            next(e);
        }
    }
};
