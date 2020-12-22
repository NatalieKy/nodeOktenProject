const database = require('../../dataBase').getInstance();
const { CAR } = require('../../configs/constants/names.enums');

module.exports = {
    createCar: (car) => {
        const Car = database.getModel(CAR);

        return Car.create(car);
    },

    getAllCars: () => {
        const Car = database.getModel(CAR);

        return Car.findAll({
        });
    },

    getSingleCar: (id) => {
        const Car = database.getModel(CAR);

        return Car.findByPk(id);
    },

    deleteCar: (id) => {
        const Car = database.getModel(CAR);

        return Car.destroy({
            where: { id }
        });
    },

    updateSingleCar: (dataToUpdate, carId) => {
        const Car = database.getModel(CAR);

        return Car.update(
            dataToUpdate,
            { where: { id: carId } }
        );
    },

    updateSingleCarPhotos: (data, carId) => {
        const Car = database.getModel(CAR);

        return Car.update(
            data,
            { where: { id: carId } }
        );
    },

    getStudentsCar: (stID) => {
        const Car = database.getModel(CAR);

        return Car.findAll({
            where: { student_id: stID }
        });
    }
};
