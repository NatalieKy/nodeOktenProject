const { ErrorHandler } = require('../../../Errors');
const { BAD_REQUEST } = require('../../../configs/httpStatusCodes');
const { carsValidator: { carBodyValidator } } = require('../../../joiValidators');

module.exports = {

    isCarBodyCorrect: (req, res, next) => {
        try {
            const { error } = carBodyValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
