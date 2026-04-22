const Joi = require('joi');

const userValidate = Joi.object({
    Name: Joi.string().min(3).required().messages({
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have at least 3 characters"
    }),
    EmployeeCode: Joi.string().required(),
    Email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email address"
    }),
    Department: Joi.string().allow('').optional(),
    Role: Joi.string().allow('').optional(),
    role: Joi.string().valid('admin', 'employee').default('employee'),
    
    // UPDATED: Accepts an array of asset IDs instead of a single string
    Assets: Joi.array().items(Joi.string()).allow(null).optional().messages({
        "array.base": "Assets must be an array of IDs"
    })
});

module.exports = { userValidate };
