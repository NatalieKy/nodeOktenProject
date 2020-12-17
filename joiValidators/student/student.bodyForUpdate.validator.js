const Joi = require('joi');

const {
    NAME, EMAIL, GENDER, PASSWORD
} = require('../../configs/RegExs');

module.exports = Joi.object({
    name: Joi.string()
        .regex(NAME)
        .min(2)
        .optional(),
    age: Joi.number()
        .min(1)
        .max(100)
        .optional(),
    gender: Joi.string()
        .regex(GENDER)
        .optional(),
    email: Joi.string()
        .regex(EMAIL)
        .optional(),
    password: Joi.string()
        .regex(PASSWORD)
        .optional(),
});
