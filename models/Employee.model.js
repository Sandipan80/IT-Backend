const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  EmployeeCode: { type: String, required: true, unique: true },
  Email:{type:String,required: true},
  Department: { type: String,required: false  },
  Role: { type: String, required: false },
  Assets: { type: String, required: false },// Array of strings like ["Laptop", "Monitor"]
//   assetsCount: { type: Number, default: 0 },
//   activeTickets: { type: Number, default: 0 }
});

module.exports = mongoose.model('EmployeeSchema', EmployeeSchema);