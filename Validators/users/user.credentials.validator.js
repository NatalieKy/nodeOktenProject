const Joi = require('joi');

const {  EMAIL, PASSWORD } = require('../../configs/RegExs');

module.exports = Joi.object({
    email: Joi.string()
        .regex(EMAIL)
        .required(),
    password: Joi.string()
        .regex(PASSWORD),
});
