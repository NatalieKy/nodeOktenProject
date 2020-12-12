const { Router } = require('express');
const { userMiddleware } = require('../Middleware');
const { carController } = require('../Controllers');
const { validationCarMiddleware, validationUserMiddleware } = require('../Middleware/Validation');

const carRouter = Router();

carRouter.post('/:id',
    validationCarMiddleware.isCarBodyCorrect,
    validationUserMiddleware.isIdCorrect,
    userMiddleware.isIdPresent,
    carController.createNewStudentsCar);
carRouter.get('/', carController.getCars);

module.exports = carRouter;
