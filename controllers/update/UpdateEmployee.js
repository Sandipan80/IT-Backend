const EmployeeSchema = require("../../models/Employee.model");
const Asset = require("../../models/Asset.model");

const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { Assets, ...otherData } = req.body;

    // 1. Get the current state of the employee before updating
    const oldEmployee = await EmployeeSchema.findById(id);
    if (!oldEmployee) return res.status(404).json({ message: "User not found" });

    // 2. Identify removed assets (Assets previously owned but not in the new list)
    const removedAssets = oldEmployee.Assets.filter(assetId => !Assets.includes(assetId.toString()));

    // 3. Identify newly added assets
    const newAssets = Assets.filter(assetId => !oldEmployee.Assets.includes(assetId));

    // 4. Update the Employee record
    const updatedEmployee = await EmployeeSchema.findByIdAndUpdate(
      id,
      { ...otherData, Assets },
      { new: true }
    );

    // 5. Sync the Assets collection
    // Mark removed assets as Unassigned
    if (removedAssets.length > 0) {
      await Asset.updateMany(
        { _id: { $in: removedAssets } },
        { $set: { status: "Unassigned", assignedTo: null } }
      );
    }

    // Mark new assets as Assigned
    if (newAssets.length > 0) {
      await Asset.updateMany(
        { _id: { $in: newAssets } },
        { $set: { status: "Assigned", assignedTo: id } }
      );
    }

    res.json({ success: true, message: "Employee and Assets updated!", data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = UpdateEmployee;