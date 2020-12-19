const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .optional(),
    price: Joi.number()
        .positive()
        .min(1)
        .optional(),
});
