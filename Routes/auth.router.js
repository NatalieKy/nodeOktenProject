const { Router } = require('express');

const { authMiddleware } = require('../Middleware/auth');
const { authController } = require('../Controllers/auth');
const { authValidationMiddleware } = require('../Middleware/auth');

const authRouter = Router();

authRouter.post('/',
    authValidationMiddleware.areCredentialsCorrect,
    authMiddleware.areCredentialsTrue,
    authMiddleware.isStudentAlreadyLogged,
    authController.logination);
authRouter.post('/refresh',
    authMiddleware.checkRefreshJWT,
    authController.useRefreshToken);
authRouter.get('/logout',
    authMiddleware.checkAccessJWT,
    authController.logout);

module.exports = authRouter;
