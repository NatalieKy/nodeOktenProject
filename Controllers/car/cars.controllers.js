const { carService } = require('../../Services/car');
const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');

module.exports = {
    createNewCar: async (req, res, next) => {
        try {
            const car = req.body;
            const { student_id } = req.params;

            Object.assign(car, { student_id });
            const newCar = await carService.createCar(car);

            res.status(CREATED).json(newCar);
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars();

            res.status(OK).json(cars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
           const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    updateSingleCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const dataToUpdate = req.body;

            await carService.updateSingleCar(dataToUpdate, car_id);

            res.json(OK);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carService.deleteCar(car_id);

            res.json(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
