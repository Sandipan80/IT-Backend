const Employee = require("../../models/Employee.model");

const Employee_profile = async (req, res) => {
  try {
    const userId = req.params.id;

    const employeeData = await Employee.findById(userId).populate("Assets", "name");

    if (!employeeData) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employeeObj = employeeData.toObject();

    if (employeeData.Assets && employeeData.Assets.length > 0) {
      employeeObj.Assets = employeeData.Assets.map(asset => asset.name);
    } else {
      employeeObj.Assets = [];
    }

    res.status(200).json(employeeObj);
  } catch (error) {
    res.status(500).json({ message: "Database Error", error: error.message });
  }
};

module.exports = Employee_profile;