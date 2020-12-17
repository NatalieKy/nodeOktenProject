const { Router } = require('express');

const { studentController } = require('../Controllers/student');
const { studentMiddleware } = require('../Middleware/student');
const { validationStudentMiddleware } = require('../Middleware/student/Validation');
const { authMiddleware } = require('../Middleware');

const studentRouter = Router();

studentRouter.get('/', studentController.getStudents);
studentRouter.post('/',
    validationStudentMiddleware.isStudentForCreateBodyCorrect,
    studentMiddleware.isStudentPresent,
    studentController.createStudent);

// getStudents presents all students without their cars, its non-private endpoint.
// getStudentById presents single student WITH his car, which is private info. So it`s private endpoint.

studentRouter.use('/:id',
    authMiddleware.isAccessTokenAndIdTrue,
    validationStudentMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent);

studentRouter.get('/:id',
    studentController.getStudentById);
studentRouter.put('/:id',
    validationStudentMiddleware.isBodyForUpdateCorrect,
    studentController.updateStudent);
studentRouter.delete('/:id',
    studentController.deleteStudent);

module.exports = studentRouter;
