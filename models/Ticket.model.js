const { required } = require('joi');
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true }, // e.g., "TIC-1001"
  subject: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Hardware', 'Software', 'Network'] },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, default: 'Open' }, // Open, Resolved, etc.
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employeeName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model('TicketSchema',TicketSchema);