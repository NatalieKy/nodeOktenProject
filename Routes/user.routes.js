const { Router } = require('express');

const { userController } = require('../Controllers');
const { userMiddleware } = require('../Middleware');
const { userAuthMiddleware } = require('../Middleware/');
const { validationUserMiddleware } = require('../Middleware/user/Validation')

const userRouter = Router();

userRouter.get('/', userController.getStudents);
userRouter.post('/',
    validationUserMiddleware.isStudentBodyCorrect,
    userMiddleware.isStudentPresent,
    userController.createStudent);

userRouter.use('/:id',
    validationUserMiddleware.isIdCorrect,
    userMiddleware.isIdPresent,
    validationUserMiddleware.areCredentialsCorrect,
    userAuthMiddleware.isStudentLogged);

userRouter.get('/:id',
    userController.getStudentById);
userRouter.put('/:id',
    validationUserMiddleware.isStudentBodyCorrect,
    userController.updateStudent);
userRouter.delete('/:id',
    userController.deleteStudent);

module.exports = userRouter;
