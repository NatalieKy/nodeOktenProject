const { Router } = require('express');

const { studentController } = require('../Controllers/student');
const { studentMiddleware } = require('../Middleware/student');
const { studentValidationMiddleware } = require('../Middleware/student');
const { authMiddleware } = require('../Middleware/auth');

const studentRouter = Router();

studentRouter.get('/', studentController.getStudents);
studentRouter.post('/',
    studentValidationMiddleware.isStudentForCreateBodyCorrect,
    studentMiddleware.isStudentPresent,
    studentController.createStudent);

// getStudents presents all students without their cars, its non-private endpoint.
// getStudentById presents single student WITH his car, which is private info. So it`s private endpoint.

studentRouter.use('/:student_id',
    authMiddleware.isAccessTokenAndIdTrue,
    studentValidationMiddleware.isIdCorrect,
    studentMiddleware.isIdPresent);

studentRouter.get('/:student_id',
    studentController.getStudentById);
studentRouter.put('/:student_id',
    studentValidationMiddleware.isBodyForUpdateCorrect,
    studentController.updateStudent);
studentRouter.delete('/:student_id',
    studentController.deleteStudent);

module.exports = studentRouter;
