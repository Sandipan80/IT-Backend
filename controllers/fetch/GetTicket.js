const Ticket = require('../../models/Ticket.model'); // Path to your model
const mongoose = require("mongoose");
// 1. Get ALL tickets (Admin View)
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: 1 });
    res.status(200).json({ 
      success: true, 
      tickets // Wrapping in 'tickets' as expected by your frontend
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error: error.message });
  }
};

// 2. Get tickets by specific User ID (Employee View)
const getTicketsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
     const objectId = new mongoose.Types.ObjectId(userId);

    const tickets = await Ticket.find({ raisedBy: userId }).sort({ createdAt: 1 });
    res.status(200).json({ 
      success: true, 
      tickets 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user tickets", error: error.message });
  }
};

module.exports = { getAllTickets, getTicketsByUser };