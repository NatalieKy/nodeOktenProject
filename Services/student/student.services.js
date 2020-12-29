const database = require('../../dataBase').getInstance();
const { SCOPE_EXCLUDE_PASSWORD } = require('../../configs/constants/Constants');
const { STUDENT, CAR } = require('../../configs/constants/names.enums');

module.exports = {
    getStudents: () => {
        const Student = database.getModel(STUDENT);
        return Student.scope(SCOPE_EXCLUDE_PASSWORD).findAll();
    },

    getSingleStudentWithCar: (studentId) => {
        const Student = database.getModel(STUDENT);
        const Car = database.getModel(CAR);

        return Student.scope(SCOPE_EXCLUDE_PASSWORD).findOne({
            where: { id: studentId },
            include: [{ model: Car }]
        });
    },

    createSingleStudent: (student, hashedPassword, transaction) => {
        const Student = database.getModel(STUDENT);
        return Student.create({
            name: student.name,
            email: student.email,
            age: student.age,
            gender: student.gender,
            password: hashedPassword,
        }, {
            transaction
        });
    },

    updateSingleStudent: (updatedStudent, studentId, newPassword, transaction) => {
        const Student = database.getModel(STUDENT);

        return Student.update({
            name: updatedStudent.name,
            email: updatedStudent.email,
            age: updatedStudent.age,
            gender: updatedStudent.gender,
            password: newPassword
        }, { where: { id: studentId }, transaction });
    },

    updateSingleStudentAvatar: (avatar, id, transaction) => {
        const Student = database.getModel(STUDENT);

        return Student.update({
            avatar
        }, { where: { id },
            returning: true,
            transaction
        });
    },

    deleteStudent: (studentId, transaction) => {
        const Student = database.getModel(STUDENT);

        return Student.destroy({
            where: {
                id: studentId
            },
            transaction
        });
    },

    checkStudentByEmail: (userEmail) => {
        const Student = database.getModel(STUDENT);

        return Student.findOne({
            where: {
                email: userEmail
            }
        });
    },

    idChecker: (studentID) => {
        const Student = database.getModel(STUDENT);

        return Student.findOne({
            where: {
                id: studentID
            }
        });
    },
};
