const { ErrorHandler } = require('../../Errors');
const { BAD_REQUEST } = require('../../configs/httpStatusCodes');
const { authCredentialsValidator } = require('../../joiValidators/auth');

module.exports = {
    areCredentialsCorrect: (req, res, next) => {
        try {
            const { error } = authCredentialsValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
