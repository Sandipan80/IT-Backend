const Waiter = require("express").Router()
const GetUser = require("../../controllers/GetEmployee")
const NewUser = require("../../controllers/NewEmployee")
const Employee_profile = require("../../controllers/Employee_profile")


Waiter.post("/NewUser",NewUser)
Waiter.get("/GetUser",GetUser)
Waiter.get("/Employee_profile/:id",Employee_profile)

module.exports = Waiter;
