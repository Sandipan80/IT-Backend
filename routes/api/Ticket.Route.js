const Waiter = require("express").Router()
const NewTicket = require("../../controllers/create/CreateTicket")


Waiter.post("/CreateTicket",NewTicket);



module.exports=Waiter