const Joi = require('joi')
const userValidate = Joi.object({
    Name: Joi.string().min(3).max(30).required(),
    EmployeeCode: Joi.string().min(3).max(30).required(),
    Email: Joi.string().min(3).max(30).required(),
    Department: Joi.string().min(3).max(30).required(),
    Role: Joi.string().min(3).max(30).required(),
    Assets: Joi.string().min(3).max(30).required(),
})

module.exports={userValidate};