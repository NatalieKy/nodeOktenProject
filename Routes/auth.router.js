const { Router } = require('express');

const { authMiddleware } = require('../Middleware/auth');
const { authController } = require('../Controllers/auth');
const { authValidationMiddleware } = require('../Middleware/auth');

const authRouter = Router();

authRouter.post('/:student_id/refresh',
    authMiddleware.isRefreshTokenTrue,
    authController.useRefreshToken);
authRouter.post('/',
    authValidationMiddleware.areCredentialsCorrect,
    authMiddleware.areCredentialsTrue,
    authMiddleware.isStudentAlreadyLogged,
    authController.logination);

module.exports = authRouter;
