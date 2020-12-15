const Joi = require('joi');

const { NAME, EMAIL, GENDER, PASSWORD } = require('../../configs/RegExs');

module.exports = Joi.object({
    name: Joi.string()
        .regex(NAME)
        .required(),
    age: Joi.number()
        .min(1)
        .max(100)
        .required(),
    gender: Joi.string()
        .regex(GENDER)
        .required(),
    email: Joi.string()
        .regex(EMAIL)
        .required(),
    password: Joi.string()
        .regex(PASSWORD),
});
