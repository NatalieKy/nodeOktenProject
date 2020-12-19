const database = require('../../dataBase').getInstance();

module.exports = {
    createCar: (car) => {
        const Car = database.getModel('Car');

        return Car.create(car);
    },

    getAllCars: () => {
        const Car = database.getModel('Car');

        return Car.findAll({
        });
    },

    getSingleCar: (id) => {
        const Car = database.getModel('Car');

        return Car.findByPk(id);
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
