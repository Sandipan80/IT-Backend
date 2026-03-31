const Joi =  require('joi')
const userValidate = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required(),
    subject: Joi.string().min(3).max(30).required(),
    message: Joi.string().min(3).max(30).required(),

})

module.exports={userValidate};