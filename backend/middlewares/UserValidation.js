const Joi = require("joi");

const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        age: Joi.number().min(0).max(120).required(),
        dateOfBirth: Joi.date().required(),
        gender: Joi.string().valid("Male", "Female", "Other").required(),
        about: Joi.string().max(5000).optional().allow(''),
        password: Joi.string()
            .min(10)
            .max(100)
            .pattern(/^(?=.*[a-zA-Z])(?=.*\d)/)
            .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error: error.details });
    }
    next();
};

module.exports = { registerValidation };

