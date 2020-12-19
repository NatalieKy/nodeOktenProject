const { Router } = require('express');
const { studentMiddleware } = require('../Middleware/student');
const { carController } = require('../Controllers/car');
const { carValidationMiddleware } = require('../Middleware/car');
const { studentValidationMiddleware } = require('../Middleware/student');

const carRouter = Router();

carRouter.get('/', carController.getCars);
carRouter.get('/:car_id', carController.getSingleCar);
carRouter.post('/:id',
    carValidationMiddleware.isCarBodyCorrect,
    studentValidationMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent,
    carController.createNewCar);
carRouter.put('/:car_id', carController.updateSingleCar);
carRouter.delete('/:car_id', carController.deleteSingleCar);

module.exports = carRouter;
