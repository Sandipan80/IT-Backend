const Waiter = require("express").Router()
const Login  = require("../../controllers/Login")



Waiter.post("/Login",Login)



module.exports = Waiter;