// controllers/fetch/GetUnassignedAssets.js
const Asset = require('../../models/Asset.model');

const getUnassignedAssets = async (req, res) => {
    try {
        // Only find assets where status is "Unassigned"
        const assets = await Asset.find({ status: "Unassigned" });
        res.status(200).json({ success: true, assets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = getUnassignedAssets;