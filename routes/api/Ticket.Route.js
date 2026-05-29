const Waiter = require("express").Router()
const NewTicket = require("../../controllers/create/CreateTicket")
const {getAllTickets, getTicketsByUser } = require("../../controllers/fetch/GetTicket")
const { assignTicketToEmployee } = require("../../controllers/update/AssignTicket")

Waiter.post("/CreateTicket",NewTicket);
Waiter.get("/getAllTickets",getAllTickets);
Waiter.get("/getTicketsByUser/:userId", getTicketsByUser);
Waiter.put("/assignTicket/:id", assignTicketToEmployee)




module.exports=Waiter