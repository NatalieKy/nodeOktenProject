const { Router } = require('express');

const { authMiddleware } = require('../Middleware');
const { authController } = require('../Controllers/auth');

const authRouter = Router();

authRouter.post('/', authMiddleware.areCredsTrue.isStudentInDatabase, authController.logination);

module.exports = authRouter;
