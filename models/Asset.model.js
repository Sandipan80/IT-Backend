// models/Asset.model.js

const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
  {
    assetId: {
      type:   String,
      unique: true,
      index:  true,
    },
    name: {
      type:     String,
      required: [true, "Asset name is required"],
      trim:     true,
    },
    category: {
      type:     String,
      required: [true, "Category is required"],
      enum:     ["Hardware", "Software", "Furniture", "Vehicle", "Other"],
    },
    condition: {
      type:    String,
      enum:    ["Excellent", "Good", "Fair", "Poor"],
      default: "Good",
    },
    brand:        { type: String, default: "" },
    model:        { type: String, default: "" },
    serialNumber: { type: String, default: "" },
    purchaseDate: { type: String, default: "" },
    value:        { type: Number, default: 0 },
    status: {
      type:    String,
      enum:    ["Unassigned", "Assigned", "In Maintenance", "Retired"],
      default: "Unassigned",
    },
    assignedTo: { type: String, default: null },
    notes:      { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// NO pre-save hook — assetId is generated in the controller

module.exports = mongoose.model("Asset", AssetSchema);
