const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')
require('dotenv').config();
const Employee = require('./models/Employee.model');
const routes = require("./routes/index")
const chief = express();
const server = http.createServer(chief);


chief.use(express.json());
chief.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE","PATCH"],
}));

chief.use("/",routes)
chief.use("/getStatus",(req,res,next)=>{
    const registerData = req.body;
    console.log("registerData:",registerData)

    res.json({status:"Server is running fine"})
    console.log("Sever Connected")
})


const io = new Server(server,{
    cors:{
        origin :["http://localhost:5173"],
        methods : ["GET","POST"],
        credentials: true // Add this for handshake stability
    },
    allowEIO3: true // Helps with version compatibility
});

io.on("connection", (socket) => {
    console.log("Connected to Socket.IO:", socket.id);
    
    socket.on("join_admin_room", () => {
        socket.join("admin_room");
        console.log("Admin joined room");
    });

    socket.on("join_user_room", (userId) => {
        socket.join(userId);
        console.log(`User joined room: ${userId}`);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

chief.set("io", io);


mongoose.connect(process.env.Database_url)
.then(()=>{
    const PORT = process.env.PORT;
    console.log(PORT)
    server.listen(PORT)
    console.log("Server and Socket.io are running");
    
})
.catch((error)=>{
    console.log("Not Connected",error);
    
})