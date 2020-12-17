const { Router } = require('express');
const { studentMiddleware } = require('../Middleware/student');
const { carController } = require('../Controllers/car');
const { validationCarMiddleware } = require('../Middleware/car/Validation');
const { validationStudentMiddleware } = require('../Middleware/student/Validation');

const carRouter = Router();

carRouter.post('/:id',
    validationCarMiddleware.isCarBodyCorrect,
    validationStudentMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent,
    carController.createNewStudentsCar);
carRouter.get('/', carController.getCars);

module.exports = carRouter;
