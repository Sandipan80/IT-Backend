const AssetRequest = require('../../models/AssetRequest.model');

const createRequest = async (req, res) => {
    try {
        const { assetId, reason } = req.body;
        const userId = req.user.id; // From your auth middleware

        // Duplicate check: ensure no pending request exists for this specific asset/user combo
        const existingRequest = await AssetRequest.findOne({
            asset: assetId,
            requester: userId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ 
                success: false, 
                message: "A request for this asset is already pending." 
            });
        }

        const newRequest = await AssetRequest.create({
            asset: assetId,
            requester: userId,
            requestReason: reason
        });

        res.status(201).json({
            success: true,
            message: "Request submitted to admin.",
            data: newRequest
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = createRequest;