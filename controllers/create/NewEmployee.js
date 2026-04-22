const EmployeeSchema = require("../../models/Employee.model");
const Asset = require("../../models/Asset.model");
const { userValidate } = require("../../validation/User_Validation");

const NewUser = async (req, res, next) => {
  try {
    // 1. Validate the incoming data (Important!)
    const MyForm = await userValidate.validateAsync(req.body);
    
    // 2. Extract data from the validated result
    const { Name, EmployeeCode, Email, Department, Role, role, Assets } = MyForm;

    // 3. Check for existing employee (using EmployeeCode is safer than Name)
    const registerDataCheck = await EmployeeSchema.findOne({ EmployeeCode });
    if (registerDataCheck) {
      return res.status(400).json({ status: "Employee with this code already exists" });
    }

    // 4. Create and Save the new Employee
    const newEmployee = new EmployeeSchema({
      Name,
      EmployeeCode,
      Email,
      Department,
      Role,
      role,
      Assets: Assets || [], // This is now an array of ObjectIds from your dropdown
    });

    const savedUser = await newEmployee.save();

    // 5. THE FLEXIBLE LOGIC: Update the status of all assigned assets
    // We only do this if the user actually selected assets in the form
    if (Assets && Assets.length > 0) {
      await Asset.updateMany(
        { _id: { $in: Assets } }, // Find all assets that were picked
        { 
          $set: { 
            status: "Assigned", 
            assignedTo: savedUser._id 
          } 
        }
      );
    }

    // 6. Final Response
    res.status(201).json({ 
      status: "Registration Successful", 
      userId: savedUser._id 
    });

  } catch (error) {
    // Handling Joi validation errors or MongoDB errors
    if (error.isJoi) {
      return res.status(422).json({ status: "Validation Error", message: error.details[0].message });
    }
    console.error("Error in registration:", error);
    next(error); 
  }
};

module.exports = NewUser;
