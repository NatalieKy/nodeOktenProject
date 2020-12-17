const { carService } = require('../../Services');
const { CREATED, OK } = require('../../configs/httpStatusCodes');

module.exports = {
    createNewStudentsCar: async (req, res, next) => {
        try {
            const car = req.body;
            const { id } = req.params;
            const newCar = await carService.createNewStudentsCar(id, car);
            res.status(CREATED).json(newCar);
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getOnlyCars();
            res.status(OK).json(cars);
        } catch (e) {
            next(e);
        }
    },
};
