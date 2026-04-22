const Waiter = require("express").Router()
const GetUser = require("../../controllers/fetch/GetEmployee")
const NewUser = require("../../controllers/create/NewEmployee")
const Employee_profile = require("../../controllers/fetch/Employee_profile")
const UpdateEmployee = require("../../controllers/update/UpdateEmployee");
const DeleteEmployee = require("../../controllers/delete/DeleteEmployee");


Waiter.post("/NewUser",NewUser)
Waiter.get("/GetUser",GetUser)
Waiter.get("/Employee_profile/:id",Employee_profile)
Waiter.put("/UpdateUser/:id", UpdateEmployee);
Waiter.delete("/DeleteUser/:id", DeleteEmployee);

module.exports = Waiter;
