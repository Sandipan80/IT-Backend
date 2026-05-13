// controllers/fetch/GetEmpAssetReq.js

const getEmployeeRequests = async (req, res) => {
  try {
    const { id } = req.params;

    // Based on your DB screenshot:
    // Field name is 'requester' and status is 'pending'
    const activeRequests = await AssetRequest.find({ 
        requester: id, 
        status: "pending" 
    })
    .populate("asset", "name category") // This pulls 'name' from the assets collection
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activeRequests.length,
      data: activeRequests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEmployeeRequests };