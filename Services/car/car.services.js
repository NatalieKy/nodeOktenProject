const database = require('../../dataBase').getInstance();
const { CAR, FILE } = require('../../configs/constants/names.enums');

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

    updateSingleCarPhotos: (data, carID) => {
        const File = database.getModel(FILE);
        return File.create(
            { file_path: data.file_path, file_type: data.file_type, carID },
            { where: { carID },
                returning: true },
        );
    },

    updateSingleCarDocuments: (data, carID) => {
        const File = database.getModel(FILE);
        return File.create(
            { file_path: data.file_path, file_type: data.file_type, carID },
            { where: { carID },
                returning: true },
        );
    },

    getStudentsCar: (stID) => {
        const Car = database.getModel(CAR);

        return Car.findAll({
            where: { student_id: stID }
        });
    }
};
