const mongoose =require('mongoose');

const assetschema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please provide the asset name'],
    trim: true
  },
  
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['Laptop', 'Mouse', 'Keyboard', 'Table', 'Chair', 'Monitor', 'Other']
  },
  
  serialNumber: {
    type: String,
    unique: true,
    sparse: true // Allows multiple nulls if SN isn't available yet
  },
  // The core logic for your Inventory
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'Maintenance', 'Retired'],
    default: 'Available'
  },
  // Link to the Employee (Reference to Employee Model)
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // This must match your Employee model name
    default: null
  },
  // Date tracking
//   purchaseDate: {
//     type: Date
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
});

module.exports = mongoose.model('assetschema',assetschema);
