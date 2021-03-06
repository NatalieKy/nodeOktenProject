const { Router } = require('express');

const { authMiddleware } = require('../Middleware/auth');
const { filesValidationMiddleware } = require('../Middleware/files');
const { studentController } = require('../Controllers/student');
const { studentMiddleware } = require('../Middleware/student');
const { studentValidationMiddleware } = require('../Middleware/student');

const studentRouter = Router();

studentRouter.get('/', studentController.getStudents);
studentRouter.post('/',
    studentValidationMiddleware.isStudentForCreateBodyCorrect,
    filesValidationMiddleware.filesTypesCheckAndDivision,
    filesValidationMiddleware.isStudentPhotoSingle,
    studentMiddleware.isStudentPresent,
    studentController.createStudent);

// getStudents presents all students without their cars, its non-private endpoint.
// getStudentById presents single student WITH his car, which is private info. So it`s private endpoint.

studentRouter.use('/:student_id',
    authMiddleware.isAccessTokenAndIdTrue,
    studentValidationMiddleware.isStudentIdCorrect,
    studentMiddleware.isStudentIdPresent);

studentRouter.get('/:student_id',
    studentController.getStudentById);
studentRouter.put('/:student_id',
    studentValidationMiddleware.isBodyForUpdateCorrect,
    filesValidationMiddleware.filesTypesCheckAndDivision,
    filesValidationMiddleware.isStudentPhotoSingle,
    studentController.updateStudent);
studentRouter.delete('/:student_id',
    studentController.deleteStudent);

module.exports = studentRouter;
