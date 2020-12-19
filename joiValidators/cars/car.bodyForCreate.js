const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .required(),
    price: Joi.number()
        .positive()
        .min(1)
        .required(),
});
