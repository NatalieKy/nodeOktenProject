const database = require('../dataBase').getInstance();

module.exports = {
    getStudents: () => {
        const Student = database.getModel('Student');

        const Car = database.getModel('Car');
        return Student.findAll({
            include: { model: Car }
        });
    },

    getSingleStudent: (studentId) => {
        const Student = database.getModel('Student');

        const Car = database.getModel('Car');
        return Student.findByPk({
            include: {
                model: Car,
                where: { id: studentId }
            }
        });
    },

    checkStudent: (userEmail) => {
        const Student = database.getModel('Student');

        return Student.findOne({
            where: {
                email: userEmail
            }
        });
    },

    idChecker: (studentId) => {
        const Student = database.getModel('Student');

        return Student.findOne({
            where: {
                id: studentId
            }
        });
    },

    createSingleStudent: (student, hashedPassword) => {
        const Student = database.getModel('Student');
        return Student.create({
            name: student.name,
            email: student.email,
            age: student.age,
            gender: student.gender,
            password: hashedPassword,
        });
    },

    updateSingleStudent: (studentId, updatedStudent, updatedPassword) => {
        const Student = database.getModel('Student');

        return Student.update({
            name: updatedStudent.name,
            email: updatedStudent.email,
            age: updatedStudent.age,
            gender: updatedStudent.gender,
            password: updatedPassword,
        }, { where: { id: studentId } });
    },

    deleteStudent: (studentId) => {
        const Student = database.getModel('Student');

        return Student.destroy({
            where: {
                id: studentId
            }
        });
    }
};
