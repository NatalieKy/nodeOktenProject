const database = require('../../dataBase').getInstance();
const { CAR, FILE } = require('../../configs/constants/names.enums');

module.exports = {
    createCar: (car, transaction) => {
        const Car = database.getModel(CAR);

        return Car.create(car, { transaction });
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

    deleteCar: (id, transaction) => {
        const Car = database.getModel(CAR);

        return Car.destroy({
            where: { id },
            transaction
        });
    },

    updateSingleCar: (dataToUpdate, carId, transaction) => {
        const Car = database.getModel(CAR);

        return Car.update(
            dataToUpdate,
            { where: { id: carId },
                transaction
            }
        );
    },

    updateSingleCarPhotos: (data, carID, transaction) => {
        const File = database.getModel(FILE);
        return File.create(
            { file_path: data.file_path, file_type: data.file_type, carID },
            {
                where: { carID },
                transaction,
                returning: true },
        );
    },

    updateSingleCarDocuments: (data, carID, transaction) => {
        const File = database.getModel(FILE);
        return File.create(
            { file_path: data.file_path, file_type: data.file_type, carID },
            { where: { carID },
                returning: true,
                transaction,
            },
        );
    },

    getStudentsCar: (stID) => {
        const Car = database.getModel(CAR);

        return Car.findAll({
            where: { student_id: stID }
        });
    }
};
