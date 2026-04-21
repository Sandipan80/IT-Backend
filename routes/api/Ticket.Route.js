const Waiter = require("express").Router()
const NewTicket = require("../../controllers/create/CreateTicket")
const {getAllTickets, getTicketsByUser } = require("../../controllers/fetch/GetTicket")

Waiter.post("/CreateTicket",NewTicket);
Waiter.get("/getAllTickets",getAllTickets);
Waiter.get("/getTicketsByUser/:userId", getTicketsByUser);




module.exports=Waiter