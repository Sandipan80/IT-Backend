const EmployeeSchema = require("../../models/Employee.model");

const GetUser = async (req, res, next) => {
  try {
    // .populate("Assets") fetches the full details of all assets in the Assets array
    const registerData = await EmployeeSchema.find().populate("Assets");

    if (!registerData || registerData.length === 0) {
      return res.status(400).json({ message: "No Registered Users Found!!" });
    }

    res.status(200).json({
      message: "Employee details fetched successfully",
      employeeList: registerData,
    });
  } catch (error) {
    console.error("Error in fetching users:", error);
    next(error);
  }
};

module.exports = GetUser;
