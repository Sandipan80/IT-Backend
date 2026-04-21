const EmployeeSchema = require("../../models/Employee.model")
const {userValidate}= require("../../validation/User_Validation");

const  GetUser =async(req,res,next)=>{
//
try{
    const registerData = await EmployeeSchema.find();
  console.log("registerData:", registerData);
  if (!registerData) {
    return res.status(400).json({ message: "No Register User !!" });
  }
res.status(200).json(
    {
        message:"Employee details fetch successfully",
        employeeList: registerData
    }
);
}
catch(error){
  next(error);
  console.log("Error in registration:", error);
}
};
module.exports = GetUser;