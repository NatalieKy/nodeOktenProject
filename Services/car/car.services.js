const database = require('../../dataBase').getInstance();

module.exports = {
    createNewStudentsCar: (id, car) => {
        const Car = database.getModel('Car');

        return Car.create({
            name: car.name,
            student_id: id
        });
    },

    getOnlyCars: () => {
        const Car = database.getModel('Car');

        return Car.findAll({
        });
    },

    getStudentsCar: (stID) => {
        const Car = database.getModel('Car');

        return Car.findAll({
            where: { student_id: stID }
        });
    }
};
