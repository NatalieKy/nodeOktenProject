const { Router } = require('express');
const { studentMiddleware } = require('../Middleware/student');
const { carMiddleware } = require('../Middleware/car');
const { carController } = require('../Controllers/car');
const { studentValidationMiddleware } = require('../Middleware/student');
const { carValidationMiddleware } = require('../Middleware/car');
// const { authMiddleware } = require('../Middleware/auth');

const carRouter = Router();

carRouter.get('/',
    carController.getCars);
carRouter.post('/:student_id',
    // authMiddleware.isAccessTokenAndIdTrue,
    studentValidationMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent,
    carValidationMiddleware.isCarBodyForCreateCorrect,
    carController.createNewCar);

carRouter.use('/:car_id',
    // authMiddleware.isAccessTokenAndIdTrue,
    carValidationMiddleware.carIdValidator,
    carMiddleware.isCarIdPresent);

carRouter.get('/:car_id',
    carController.getSingleCar);
carRouter.put('/:car_id',
    carValidationMiddleware.isCarBodyForUpdateCorrect,
    carController.updateSingleCar);
carRouter.delete('/:car_id',
    carController.deleteSingleCar);

module.exports = carRouter;
