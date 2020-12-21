const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_WORD, REFRESH_TOKEN_WORD } = require('../../configs/config');
const { AUTHORIZATION } = require('../../configs/constants/names.enums');
const { checkStudentByEmail } = require('../../Services/student/student.services');
const { passwordEqualityChecker } = require('../../utilities/password.hasher');
const { tokenService } = require('../../Services/tokens');
const { ErrorHandler, errorTypes: { UNAUTHORIZED, INVALID_TOKEN, FORBIDDEN, METHOD_NOT_ALLOWED } } = require('../../Errors');

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

    isStudentAlreadyLogged: async (req, res, next) => {
        try {
            const { email } = req.body;
            const student = await tokenService.getStudentWithTokens(email);

            if (student.OAuth !== null) {
                throw new ErrorHandler(METHOD_NOT_ALLOWED.message, METHOD_NOT_ALLOWED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshJWT: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const student = await tokenService.getRefreshTokenAndStudent(refreshToken);

            if (!student) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }

            const { id } = student.dataValues;
            req.student_id = id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessJWT: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);
            const student = await tokenService.getAccessTokenAndStudent(accessToken);

            if (!student) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }

            req.accessToken = accessToken;
            next();
        } catch (e) {
            next(e);
        }
    },

    isAccessTokenAndIdTrue: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);
            const parameterID = req.params.student_id;

            if (!accessToken) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }

            jwt.verify(accessToken, ACCESS_TOKEN_WORD, (err) => {
                if (err) {
                    throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
                }
            });

            const studentWithAccessToken = (await tokenService.getAccessTokenAndStudent(accessToken));

            if (!studentWithAccessToken) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }

            const { id } = studentWithAccessToken.dataValues;

            if (id !== +parameterID) {
                throw new ErrorHandler(FORBIDDEN.message, FORBIDDEN.code);
            }

            req.studentWithToken = studentWithAccessToken;

            next();
        } catch (e) {
            next(e);
        }
    },

    isRefreshTokenTrue: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const { student_id } = req.params;

            if (!refreshToken) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }

            jwt.verify(refreshToken, REFRESH_TOKEN_WORD, (err) => {
                if (err) {
                    throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
                }
            });

            const studentWithRefreshToken = (await tokenService.getRefreshTokenAndStudent(refreshToken));

            if (!studentWithRefreshToken) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
            }

            const { id } = studentWithRefreshToken.dataValues;

            if (id !== +student_id) {
                throw new ErrorHandler(FORBIDDEN.message, FORBIDDEN.code);
            }

            req.refreshInfo = { student_id };

            next();
        } catch (e) {
            next(e);
        }
    }
};
