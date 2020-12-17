const { ErrorHandler } = require('../../../Errors');
const { BAD_REQUEST } = require('../../../configs/httpStatusCodes');
const { carBodyValidator } = require('../../../joiValidators/cars');

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
