// // controllers/GetAsset.js  (handles GET — fetch all or single)
const Asset = require("../../models/Asset.model");

// GET /api/assets — Now with Employee details
const GetAllAssets = async (req, res) => {
  try {
    // .populate('assignedTo') looks at the ID in assignedTo and fetches the Employee document
    const assets = await Asset.find()
      .populate("assignedTo", "Name Email EmployeeCode") // Only grab specific fields we need
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error) {
    console.error("GetAllAssets error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const GetAssetById = async (req, res) => {
  try {
    const { id } = req.params;
    let asset = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      asset = await Asset.findById(id).populate("assignedTo");
    }
    if (!asset) {
      asset = await Asset.findOne({ assetId: id }).populate("assignedTo");
    }

    if (!asset) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }

    return res.status(200).json({ success: true, data: asset });
  } catch (error) {
    console.error("GetAssetById error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { GetAllAssets, GetAssetById };


