const { studentService } = require('../../Services/student');
const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');
const { passwordHasher } = require('../../utilities/password.hasher');

module.exports = {
    createStudent: async (req, res, next) => {
        try {
            const studentPassword = await passwordHasher(req.body.password);

            await studentService.createSingleStudent({ ...req.body }, studentPassword);

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const studentId = req.params.student_id;
            const { password, ...user } = req.body;

            if (!password) {
                await studentService.updateSingleStudent(user, studentId);
                return res.sendStatus(OK);
            }

            const newPassword = await passwordHasher(password);

            await studentService.updateSingleStudent(user, studentId, newPassword);

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    getStudents: async (req, res, next) => {
        try {
            const students = await studentService.getStudents();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    getStudentById: async (req, res, next) => {
        try {
            const { student_id } = req.params;

            const student = await studentService.getSingleStudent(student_id);

            res.status(OK).json(student);
        } catch (e) {
            next(e);
        }
    },

    deleteStudent: async (req, res, next) => {
        try {
            const userId = req.params.student_id;

            await studentService.deleteStudent(userId);

            res.status(NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    },

};
