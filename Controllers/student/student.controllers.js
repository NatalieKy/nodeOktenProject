const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');
const { logService } = require('../../Services/log');
const { NEW_USER, DELETED_USER } = require('../../configs/constants/email-events');
const { ACTION_USER_CREATED, ACTION_USER_DELETED, ACTION_USER_UPDATED } = require('../../configs/constants/Constants');
const { passwordHasher } = require('../../utilities/password.hasher');
const { studentService } = require('../../Services/student');
const { emailService } = require('../../Services');
const { transactionInstance } = require('../../dataBase').getInstance();

module.exports = {
    createStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const avatar = req.studentsPhoto;

            const studentPassword = await passwordHasher(req.body.password);
            const newStudent = await studentService.createSingleStudent({ ...req.body }, studentPassword, transaction);

            const logInfo = {};
            Object.assign(logInfo, {
                action: ACTION_USER_CREATED,
                student_id: newStudent.dataValues.id,
                action_time: new Date().getTime()
            });

            await logService.createLogs(logInfo);

            if (avatar) {
                const photoExtension = avatar.name.split('.').pop();
                const newPhotoName = `${uuid}.${photoExtension}`;
                const avatarPathWithoutPublic = path.join('users', `${newStudent.dataValues.id}`, 'avatar');
                const avatarFullPath = path.join(process.cwd(), 'public', avatarPathWithoutPublic);
                const photoPath = path.join(avatarPathWithoutPublic, newPhotoName);

                await fs.mkdir(path.join(avatarFullPath), { recursive: true });
                await avatar.mv(path.join(avatarFullPath, newPhotoName));

                await studentService.updateSingleStudentAvatar(photoPath, newStudent.dataValues.id, transaction);
            }

            delete newStudent.dataValues.password;

            await emailService.EmailSender(req.body.email, NEW_USER, { userName: req.body.name });
            await transaction.commit();

            res.status(CREATED).json(newStudent);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    updateStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
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

                await fs.rmdir(path.join(avatarPathWithoutPublic), { recursive: true });
                await fs.mkdir(path.join(avatarFullPath), { recursive: true });
                await avatar.mv(path.join(avatarFullPath, newPhotoName));

                await studentService.updateSingleStudentAvatar(photoPath, studentId, transaction);
                await transaction.commit();
            }

            if (!password) {
                await studentService.updateSingleStudent(user, studentId);

                return res.sendStatus(OK);
            }

            const newPassword = await passwordHasher(password);

            await studentService.updateSingleStudent(user, studentId, newPassword, transaction);

            const logInfo = {};
            Object.assign(logInfo, {
                action: ACTION_USER_UPDATED,
                student_id: studentId,
                action_time: new Date().getTime()
            });

            await logService.createLogs(logInfo);
            await transaction.commit();

            res.sendStatus(OK);
        } catch (e) {
            await transaction.rollback();
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
        const transaction = await transactionInstance();

        try {
            const userId = req.params.student_id;
            const pathToCarData = path.join(process.cwd(), 'public', 'users', `${userId}`);

            await studentService.deleteStudent(userId, transaction);
            await fs.rmdir(pathToCarData, { recursive: true });

            await emailService.EmailSender(req.body.email, DELETED_USER, { userName: req.body.name });

            const logInfo = {};
            Object.assign(logInfo, {
                action: ACTION_USER_DELETED,
                student_id: userId,
                action_time: new Date().getTime()
            });

            await logService.createLogs(logInfo);
            await transaction.commit();

            res.status(NO_CONTENT).end();
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

};
