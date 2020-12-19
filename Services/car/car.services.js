const database = require('../../dataBase').getInstance();

module.exports = {
    createCar: (student_id, car) => {
        const Car = database.getModel('Car');

        return Car.create({
            name: car.name,
            student_id
        });
    },

    getAllCars: () => {
        const Car = database.getModel('Car');

        return Car.findAll({
        });
    },

    getSingleCar: (carID) => {
        const Car = database.getModel('Car');

        return Car.findByPk(carID);
    },

    deleteCar: (id) => {
        const Car = database.getModel('Car');

        return Car.destroy({
            where: { id }
        });
    },

    updateSingleCar: (dataToUpdate, carId) => {
        const Car = database.getModel('Car');

        return Car.update(
            dataToUpdate,
            { where: { id: carId } }
        );
    },

    getStudentsCar: (stID) => {
        const Car = database.getModel('Car');

        return Car.findAll({
            where: { student_id: stID }
        });
    }
};
