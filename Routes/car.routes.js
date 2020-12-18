const { Router } = require('express');
const { studentMiddleware } = require('../Middleware/student');
const { carController } = require('../Controllers/car');
const { carValidationMiddleware } = require('../Middleware/car');
const { studentValidationMiddleware } = require('../Middleware/student');

const carRouter = Router();

carRouter.post('/:id',
    carValidationMiddleware.isCarBodyCorrect,
    studentValidationMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent,
    carController.createNewStudentsCar);
carRouter.get('/', carController.getCars);

module.exports = carRouter;
