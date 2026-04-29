const AssetRequest = require('../../models/AssetRequest.model');
const Employee = require('../../models/Employee.model');
const Assets = require('../../models/Asset.model.js'); 
const Employees = require('../../models/Employee.model.js');

const getAllRequests = async (req, res) => {
    try {
        // Fetching all pending requests and bringing in details from other collections
       const requests = await AssetRequest.find()
            .populate('asset')      // This turns asset ID into the Asset Object
            .populate('requester')  // This turns requester ID into the Employee Object
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = getAllRequests;