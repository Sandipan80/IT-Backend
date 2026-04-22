const Asset = require("../../models/Asset.model");
const Employee = require("../../models/Employee.model");

const AssignAsset = async (req, res) => {
  const { assetId, employeeId } = req.body;

  try {
    // 1. Find the asset to see if it was already assigned to someone else
    const asset = await Asset.findById(assetId);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    const oldEmployeeId = asset.assignedTo;

    // 2. Remove asset from the previous employee's list (if any)
    if (oldEmployeeId) {
      await Employee.findByIdAndUpdate(oldEmployeeId, {
        $pull: { Assets: assetId } 
      });
    }

    // 3. Update Asset to new owner
    asset.assignedTo = employeeId;
    asset.status = "Assigned";
    await asset.save();

    // 4. Add asset to the new employee's list
    await Employee.findByIdAndUpdate(employeeId, {
      $addToSet: { Assets: assetId }
    });

    res.status(200).json({ success: true, message: "Ownership transferred successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = AssignAsset;