const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('.dotenv').config();
const Employee = require('./models/Employee.model');
const routes = require("./routes/index")
const chief = express();
chief.use(express.json());

chief.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
}));
chief.use("/",routes)
chief.use("/getStatus",(req,res,next)=>{
    const registerData = req.body;
    console.log("registerData:",registerData)

    res.json({status:"Server is running fine"})
    console.log("Sever Connected")
})


mongoose.connect("mongodb+srv://bhullarsandipan_db_user:DE4BE8PAB8Dcj1iH@backend-cluster.ckp0bzp.mongodb.net/")
.then(()=>{
    const PORT = 5000;
    chief.listen(PORT)
    console.log("Connected");
    
})
.catch(()=>{
    console.log("Not Connected");
    
})