const Waiter = require("express").Router()
const GetUser = require("../../controllers/fetch/GetEmployee")
const NewUser = require("../../controllers/create/NewEmployee")
const Employee_profile = require("../../controllers/fetch/Employee_profile")


Waiter.post("/NewUser",NewUser)
Waiter.get("/GetUser",GetUser)
Waiter.get("/Employee_profile/:id",Employee_profile)

module.exports = Waiter;
