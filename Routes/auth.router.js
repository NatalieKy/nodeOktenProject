const { Router } = require('express');

const { authMiddleware } = require('../Middleware/auth');
const { authController } = require('../Controllers/auth');
const { authValidationMiddleware } = require('../Middleware/auth');

const authRouter = Router();

authRouter.post('/',
    authValidationMiddleware.areCredentialsCorrect,
    authMiddleware.areCredentialsTrue,
    authController.logination);

module.exports = authRouter;
