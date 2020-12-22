const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');
const { NEW_USER } = require('../../configs/constants/email-events');
const { passwordHasher } = require('../../utilities/password.hasher');
const { studentService } = require('../../Services/student');
const { emailService } = require('../../Services');

module.exports = {
    createStudent: async (req, res, next) => {
        try {
            const avatar = req.studentsPhoto;

            const studentPassword = await passwordHasher(req.body.password);
            const newStudent = await studentService.createSingleStudent({ ...req.body }, studentPassword);

            if (avatar) {
                const photoExtension = avatar.name.split('.').pop();
                const newPhotoName = `${uuid}.${photoExtension}`;
                const avatarPathWithoutPublic = path.join('users', `${newStudent.dataValues.id}`, 'avatar');
                const avatarFullPath = path.join(process.cwd(), 'public', avatarPathWithoutPublic);
                const photoPath = path.join(avatarPathWithoutPublic, newPhotoName);

                await fs.mkdir(path.join(avatarFullPath), { recursive: true });
                await avatar.mv(path.join(avatarFullPath, newPhotoName));

                await studentService.updateSingleStudentAvatar(photoPath, newStudent.dataValues.id);
            }

            delete newStudent.dataValues.password;

            await emailService.EmailSender(req.body.email, NEW_USER, { userName: req.body.name });

            res.status(CREATED).json(newStudent);
        } catch (e) {
            next(e);
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const studentId = req.params.student_id;
            const { password, ...user } = req.body;
            const avatar = req.studentsPhoto;

            if (avatar) {
                const photoExtension = avatar.name.split('.').pop();
                const newPhotoName = `${uuid}.${photoExtension}`;
                const avatarPathWithoutPublic = path.join('users', `${studentId}`, 'avatar');
                const avatarFullPath = path.join(process.cwd(), 'public', avatarPathWithoutPublic);
                const photoPath = path.join(avatarPathWithoutPublic, newPhotoName);

                await fs.mkdir(path.join(avatarFullPath), { recursive: true });
                await avatar.mv(path.join(avatarFullPath, newPhotoName));

                await studentService.updateSingleStudentAvatar(photoPath, studentId);
            }

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

            const student = await studentService.getSingleStudentWithCar(student_id);

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
