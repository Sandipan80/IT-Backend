//Employee Model
const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  EmployeeCode: { type: String, required: true, unique: true },
  Email:{type:String,required: true},
  Department: { type: String,required: false  },
  Role: { type: String, required: false },
  role: { 
    type: String, 
    enum: ['admin', 'employee'], // Restricts to your Radio Group values
    default: 'employee' 
  },
Assets: [{ 
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'Asset' // Must match the name in your Asset model export
}],
});

module.exports = mongoose.model('EmployeeSchema', EmployeeSchema);