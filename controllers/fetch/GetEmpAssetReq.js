// controllers/AssetRequest.js

// Fetch requests raised by a specific employee
const getEmployeeRequests = async (req, res) => {
  try {
    const { id } = req.params; // Grabs the ID from the URL

    const requests = await AssetRequest.find({ requester: id })
      .populate("asset", "requester","status",) // Populate asset details (adjust fields as per your schema)
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// At the end of GetEmpAssetReq.js
module.exports = { getEmployeeRequests };