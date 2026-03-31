const Waiter = require("express").Router()
const Login  = require("../../controllers/Login")
const Employee_profile = require("../../controllers/Employee_profile")


Waiter.post("/Login",Login)
Waiter.get("/Employee_profile/:id",Employee_profile)


module.exports = Waiter;