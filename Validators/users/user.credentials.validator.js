const Joi = require('joi');

const { EMAIL, PASSWORD } = require('../../configs/RegExs');

module.exports = Joi.object({
    email: Joi.string()
        .regex(EMAIL)
        .required(),
    password: Joi.string()
        .regex(PASSWORD)
        .required(),
    name: Joi.string()
        .optional(),
    age: Joi.number()
        .optional(),
    gender: Joi.string()
        .optional(),
});
