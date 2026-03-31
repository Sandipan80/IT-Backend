const Waiter = require("express").Router()
const ContactUs = require("../../controllers/Contact");


Waiter.post("/ContactUs",ContactUs)


module.exports =Waiter;