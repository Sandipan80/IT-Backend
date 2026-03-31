const Waiter = require("express").Router()
const Assets = require("./AssetRegister.route")
const LoginRoute  = require("./Login.route")
const ContactRoute  = require("./Contact.route")


Waiter.use("/Assets",Assets)
Waiter.use("/LoginRoute",LoginRoute)
Waiter.use("/ContactRoute",ContactRoute)



module.exports = Waiter;