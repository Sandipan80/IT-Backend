const Asset = require("../../models/Asset.model");
const Employee = require("../../models/Employee.model") // MUST import this to update user records

function generateAssetId(category) {
  const prefix = {
    Hardware: "HW",
    Software: "SW",
    Furniture: "FN",
    Vehicle: "VH",
    Other: "OT",
  }[category] || "AS";

  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

const AddAsset = async (req, res) => {
  try {
    const {
      name, category, condition, brand, model,
      serialNumber, purchaseDate, value, status, assignedTo, notes,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Asset name and category are required",
      });
    }

    const assetId = generateAssetId(category);

    // 1. Create the new Asset document
    const asset = new Asset({
      assetId,
      name,
      category,
      condition,
      brand,
      model,
      serialNumber,
      purchaseDate,
      value,
      // If assignedTo is provided, force status to "Assigned"
      status: assignedTo ? "Assigned" : (status || "Unassigned"),
      assignedTo: assignedTo || null,
      notes,
    });

    const savedAsset = await asset.save();

    // 2. LOGIC UPDATE: If an employee was selected during creation, update their record
    if (assignedTo) {
      await Employee.findByIdAndUpdate(
        assignedTo, 
        { $push: { Assets: savedAsset._id } }, // Push the Mongoose _id into the Employee's Assets array
        { new: true }
      );
    }

    return res.status(201).json({
      success: true,
      message: `Asset created and ${assignedTo ? 'assigned' : 'saved'} successfully. ID: ${savedAsset.assetId}`,
      data: savedAsset,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Duplicate asset ID, please try again" });
    }
    console.error("AddAsset error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = AddAsset;




