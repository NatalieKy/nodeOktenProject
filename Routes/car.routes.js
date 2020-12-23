const { Router } = require('express');

const { authMiddleware } = require('../Middleware/auth');
const { carMiddleware } = require('../Middleware/car');
const { carController } = require('../Controllers/car');
const { carValidationMiddleware } = require('../Middleware/car');
const { filesValidationMiddleware } = require('../Middleware/files');
const { studentValidationMiddleware } = require('../Middleware/student');
const { studentMiddleware } = require('../Middleware/student');

const carRouter = Router();

// list of all cars is non-private endpoint.
// single car or any operation with car is private information, so its private endpoint

carRouter.get('/',
    carController.getCars);
carRouter.post('/:student_id',
    authMiddleware.isAccessTokenAndIdTrue,
    studentValidationMiddleware.isStudentIdCorrect,
    studentMiddleware.isStudentIdPresent,
    carValidationMiddleware.isCarBodyForCreateCorrect,
    filesValidationMiddleware.filesTypesCheckAndDivision,
    filesValidationMiddleware.checkMaximumQuantityCarPhotos,
    filesValidationMiddleware.checkMaximumQuantityCarFiles,
    carController.createNewCar);

carRouter.use('/:student_id/:car_id',
    authMiddleware.isAccessTokenAndIdTrue,
    studentMiddleware.isStudentIdPresent,
    studentValidationMiddleware.isStudentIdCorrect,
    carValidationMiddleware.carIdValidator,
    carMiddleware.isCarIdPresent);

carRouter.get('/:student_id/:car_id',
    carController.getSingleCar);
carRouter.put('/:student_id/:car_id',
    filesValidationMiddleware.filesTypesCheckAndDivision,
    filesValidationMiddleware.checkMaximumQuantityCarPhotos,
    filesValidationMiddleware.checkMaximumQuantityCarFiles,
    carValidationMiddleware.isCarBodyForUpdateCorrect,
    carController.updateSingleCar);
carRouter.delete('/:student_id/:car_id',
    carController.deleteSingleCar);

module.exports = carRouter;
