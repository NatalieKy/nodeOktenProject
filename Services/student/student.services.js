const database = require('../../dataBase').getInstance();

module.exports = {
    // getStudentsWithCars: () => {
    //     const Student = database.getModel('Student');
    //     const Car = database.getModel('Car');
    //     return Student.findAll({
    //         include: { model: Car }
    //     });
    // },

    getStudents: () => {
        const Student = database.getModel('Student');
        return Student.findAll();
    },

    getSingleStudent: (studentId) => {
        const Student = database.getModel('Student');
        const Car = database.getModel('Car');

        return Student.findOne({
            where: { id: studentId },
            include: [{ model: Car }]
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

    idChecker: (studentID) => {
        const Student = database.getModel('Student');

        return Student.findOne({
            where: {
                id: studentID
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

    updateSingleStudent: (updatedStudent, studentId, newPassword) => {
        const Student = database.getModel('Student');

        return Student.update({
            name: updatedStudent.name,
            email: updatedStudent.email,
            age: updatedStudent.age,
            gender: updatedStudent.gender,
            password: newPassword
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
