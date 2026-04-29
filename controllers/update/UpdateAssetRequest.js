
const AssetRequest = require('../../models/AssetRequest.model.js');
const Asset = require('../../models/Asset.model.js');

const updateAssetRequest = async (req, res) => {
    try {
        const { requestID } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        // 1. Find the request to get the IDs
        const request = await AssetRequest.findById(requestID);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (status === 'approved') {
            // 2. Update the Asset in the database
            // Match your Asset.model.js (status: "Assigned" and assignedTo: ObjectId)
            await Asset.findByIdAndUpdate(request.asset._id || request.asset, {
        status: "Assigned",
        assignedTo: request.requester._id || request.requester
            });
        }

        // 3. Delete the request document after action
        await AssetRequest.findByIdAndDelete(requestID);

        res.status(200).json({
            success: true,
            message: `Request ${status === 'approved' ? 'Accepted' : 'Declined'} successfully!`
        });
    } catch (error) {
        console.error("Action Error:", error);
        res.status(500).json({ success: false, message: "Server error during action" });
    }
};

module.exports = updateAssetRequest;