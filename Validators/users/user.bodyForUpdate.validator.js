const Joi = require('joi');

const {
    NAME, EMAIL, GENDER, PASSWORD
} = require('../../configs/RegExs');

module.exports = Joi.object({
    name: Joi.string()
        .regex(NAME),
    age: Joi.number()
        .min(1)
        .max(100),
    gender: Joi.string()
        .regex(GENDER),
    email: Joi.string()
        .regex(EMAIL),
    password: Joi.string()
        .regex(PASSWORD)
});
