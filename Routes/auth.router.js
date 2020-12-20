const { Router } = require('express');

const { authMiddleware } = require('../Middleware/auth');
const { authController } = require('../Controllers/auth');
const { authValidationMiddleware } = require('../Middleware/auth');
const { studentValidationMiddleware, studentMiddleware } = require('../Middleware/student');

const authRouter = Router();

authRouter.post('/',
    authValidationMiddleware.areCredentialsCorrect,
    authMiddleware.areCredentialsTrue,
    authMiddleware.isStudentAlreadyLogged,
    authController.logination);
authRouter.post('/:student_id/refresh',
    studentValidationMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent,
    authMiddleware.isRefreshTokenTrue,
    authController.useRefreshToken);
authRouter.post('/:student_id/logout',
    studentValidationMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent,
    authController.logout);

module.exports = authRouter;
