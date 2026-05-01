const AssetRequest = require('../../models/AssetRequest.model.js');
const Asset = require('../../models/Asset.model.js');

const updateAssetRequest = async (req, res) => {
    try {
        const { requestID } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        const request = await AssetRequest.findById(requestID);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (status === 'approved') {
            await Asset.findByIdAndUpdate(request.asset._id || request.asset, {
                status: "Assigned",
                assignedTo: request.requester._id || request.requester
            });
        }

        // --- SOCKET.IO NOTIFICATION LOGIC ---
        const io = req.app.get("io");
        const targetEmployeeId = (request.requester._id || request.requester).toString();

        io.to(targetEmployeeId).emit("notification", {
            title: "Request Update",
            message: `Your request for the asset has been ${status === 'approved' ? 'Approved' : 'Rejected'}.`,
            type: "status_update",
            status: status // 'approved' or 'rejected'
        });
        // ------------------------------------

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
