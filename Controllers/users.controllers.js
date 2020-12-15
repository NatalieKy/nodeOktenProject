const { userService } = require('../Services');
const { carService } = require('../Services');
const { CREATED, OK, NO_CONTENT } = require('../configs/httpStatusCodes');
const { passwordHasher } = require('../utilities/password.hasher');

module.exports = {
    createStudent: async (req, res, next) => {
        try {
            const studentPassword = await passwordHasher(req.body.password);

            await userService.createSingleStudent({ ...req.body }, studentPassword);

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const { password, ...user } = req.body;
            const newPassword = await passwordHasher(password);

            await userService.updateSingleStudent(req.params.id, user, newPassword);

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    getStudents: async (req, res, next) => {
        try {
            const studentsWithCars = await userService.getStudents();

            res.json(studentsWithCars);
        } catch (e) {
            next(e);
        }
    },

    getStudentById: async (req, res, next) => {
        try {
            const { student } = req;
            const { id } = req.student.dataValues;

            const car = await carService.getStudentsCar(id);

            res.status(OK).json({ student, car });
        } catch (e) {
            next(e);
        }
    },

    deleteStudent: async (req, res, next) => {
        try {
            const userId = req.params.id;

            await userService.deleteStudent(userId);

            res.status(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

};
