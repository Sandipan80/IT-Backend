const EmployeeSchema = require("../../models/Employee.model");
const Asset = require("../../models/Asset.model");

/**
 * DELETE EMPLOYEE
 * Removes the user and marks all their held assets as 'Unassigned'
 */
const DeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the employee to get their list of assets before deleting
    const employee = await EmployeeSchema.findById(id);
    
    if (!employee) {
      return res.status(404).json({ 
        success: false, 
        message: "Employee not found" 
      });
    }

    // 2. THE SYNC LOGIC: 
    // If the employee had assets, we must release them back to the inventory
    if (employee.Assets && employee.Assets.length > 0) {
      await Asset.updateMany(
        { _id: { $in: employee.Assets } }, // Find all assets owned by this user
        { 
          $set: { 
            status: "Unassigned", 
            assignedTo: null 
          } 
        }
      );
    }

    // 3. Delete the actual employee record
    await EmployeeSchema.findByIdAndDelete(id);

    res.status(200).json({ 
      success: true, 
      message: "Employee deleted and assets returned to inventory successfully" 
    });

  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error during deletion" 
    });
  }
};

module.exports = DeleteEmployee;