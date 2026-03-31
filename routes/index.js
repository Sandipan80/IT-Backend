const Waiter = require("express").Router()
const apiRoutes =require("./api/index")

Waiter.use("/api",apiRoutes)


Waiter.use("/api",(req,res,next)=>{
    res.json({status:"API route no found"})
})

module.exports = Waiter;