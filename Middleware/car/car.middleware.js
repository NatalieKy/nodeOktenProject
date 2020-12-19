const { ErrorHandler, errorTypes: { NO_CAR_FOUND } } = require('../../Errors');
const { carService } = require('../../Services/car');

module.exports = {
    isCarIdPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            console.log(car_id);
            const car = await carService.getSingleCar(car_id);

            if (!car) {
                throw new ErrorHandler(NO_CAR_FOUND.message, NO_CAR_FOUND.code);
            }
            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },
};
