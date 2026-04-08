const Waiter = require("express").Router()
const Assets = require("./AssetRegister.route")
const LoginRoute  = require("./Login.route")
const ContactRoute  = require("./Contact.route")
const EmployeeRoute = require("./Employee.route")
const TicketRoute = require("./Ticket.Route")

Waiter.use("/Assets",Assets)
Waiter.use("/LoginRoute",LoginRoute)
Waiter.use("/ContactRoute",ContactRoute)
Waiter.use("/EmployeeRoute",EmployeeRoute)
Waiter.use("/TicketRoute",TicketRoute)



module.exports = Waiter; 