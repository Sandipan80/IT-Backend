// controllers/AddAsset.js

const Asset = require("../models/Asset.model");

// ─── Generate Asset ID here instead of in the model ──────────────────────────
function generateAssetId(category) {
  const prefix = {
    Hardware:  "HW",
    Software:  "SW",
    Furniture: "FN",
    Vehicle:   "VH",
    Other:     "OT",
  }[category] || "AS";

  const timestamp = Date.now().toString(36).toUpperCase();
  const random    = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ─── Controller — only (req, res), never add `next` ──────────────────────────
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

    // Generate the ID here — no pre-save hook needed
    const assetId = generateAssetId(category);

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
      status,
      assignedTo: status === "Assigned" ? assignedTo : null,
      notes,
    });

    const saved = await asset.save();

    return res.status(201).json({
      success: true,
      message: `Asset created successfully with ID: ${saved.assetId}`,
      data:    saved,
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
