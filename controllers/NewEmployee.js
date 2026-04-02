const EmployeeSchema = require("../models/Employee.model")
const {userValidate}= require("../validation/User_Validation");

const  NewUser =async(req,res,next)=>{
    const MyForm =await userValidate.validateAsync(req.body);
    console.log("MyForm:",MyForm);

    //data extract
    const{Name, EmployeeCode, Email,Department,Role,role,Assets}=MyForm;
//
    const registerDataCheck = await EmployeeSchema.findOne({
    Name: Name,
  });
  console.log("registerDataCheck:", registerDataCheck);
  if (registerDataCheck) {
    return res.json({ status: "Username already exists" });
  }
  //save in db 
  const new2 = new EmployeeSchema({
    Name:Name,
    EmployeeCode:EmployeeCode,
    Email:Email,
    Department:Department,
    Role:Role,
    role:role,
    Assets:Assets,

  });
  await new2.save();
  //
  res.json({status:"Registration Successful"});
    
};
module.exports = NewUser;