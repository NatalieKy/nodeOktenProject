const { ErrorHandler } = require('../../Errors');
const { BAD_REQUEST } = require('../../configs/httpStatusCodes');
const { carBodyForCreateValidator, carBodyForUpdateValidator, carIdValidator } = require('../../joiValidators/cars');

module.exports = {

    isCarBodyForCreateCorrect: (req, res, next) => {
        try {
            const { error } = carBodyForCreateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarBodyForUpdateCorrect: (req, res, next) => {
        try {
            const { error } = carBodyForUpdateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    carIdValidator: (req, res, next) => {
        try {
            const { error } = carIdValidator.validate(req.params.car_id);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
