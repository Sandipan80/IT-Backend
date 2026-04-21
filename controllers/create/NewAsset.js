// controllers/NewAsset.js  (handles PUT — update, DELETE — remove)

const Asset = require("../../models/Asset.model");

// PUT /api/assets/:id  — update an existing asset by MongoDB _id
const UpdateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If status is being changed away from Assigned, clear assignedTo
    if (updateData.status && updateData.status !== "Assigned") {
      updateData.assignedTo = null;
    }

    const updated = await Asset.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }  // return updated doc + run schema validators
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      data:    updated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("UpdateAsset error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE /api/assets/:id  — remove asset by MongoDB _id
const DeleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Asset.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Asset ${deleted.assetId} deleted successfully`,
    });
  } catch (error) {
    console.error("DeleteAsset error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { UpdateAsset, DeleteAsset };
