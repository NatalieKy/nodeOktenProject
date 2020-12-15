const { Router } = require('express');
const { userMiddleware } = require('../Middleware');
const { carController } = require('../Controllers');
const { validationCarMiddleware } = require('../Middleware/car/Validation');
const { validationUserMiddleware } = require('../Middleware/user/Validation');

const carRouter = Router();

carRouter.post('/:id',
    validationCarMiddleware.isCarBodyCorrect,
    validationUserMiddleware.isIdCorrect,
    userMiddleware.isIdPresent,
    carController.createNewStudentsCar);
carRouter.get('/', carController.getCars);

module.exports = carRouter;
