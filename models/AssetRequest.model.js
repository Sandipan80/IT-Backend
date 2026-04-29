const mongoose = require('mongoose');

const AssetRequestSchema = new mongoose.Schema(
  {
    // The asset being requested
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset', 
      required: [true, 'Asset ID is required']
    },
    // The employee making the request
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeSchema',
      required: [true, 'Requester ID is required']
    },
    // Current state of the request
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    // Optional: Employee can explain why they need it
    requestReason: {
      type: String,
      trim: true,
      maxlength: [200, 'Reason cannot exceed 200 characters']
    },
    // Optional: Admin can provide feedback (especially if rejected)
    adminFeedback: {
      type: String,
      trim: true,
      default: ''
    },
    // Date tracking
    actionTakenAt: {
      type: Date
    }
  },
  { 
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

// Indexing for faster queries in the Admin Panel
AssetRequestSchema.index({ status: 1, requester: 1 });

module.exports = mongoose.model('AssetRequest', AssetRequestSchema);