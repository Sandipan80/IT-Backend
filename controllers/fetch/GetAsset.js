// controllers/GetAsset.js  (handles GET — fetch all or single)

const Asset = require("../../models/Asset.model");

// GET /api/assets  — return all assets, newest first
const GetAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count:   assets.length,
      data:    assets,
    });
  } catch (error) {
    console.error("GetAllAssets error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /api/assets/:id  — return single asset by MongoDB _id or assetId
const GetAssetById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try MongoDB ObjectId first, fall back to custom assetId field
    let asset = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      asset = await Asset.findById(id);
    }
    if (!asset) {
      asset = await Asset.findOne({ assetId: id });
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
