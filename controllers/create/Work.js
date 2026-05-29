// controllers/Work.js
const Work = require('../../models/Work.model');
// Explicitly import your Ticket model so Mongoose registers the collection pattern
const Ticket = require('../../models/Ticket.model'); 

const getEmployeeWork = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    // Query items matching the target ID and explicitly declare the relational model
    const myWork = await Work.find({ employeeId })
      .populate({
        path: 'referenceId',
        model: 'TicketSchema' // Tells Mongoose exactly to read from your ticket collection
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      workQueue: myWork || []
    });
  } catch (error) {
    console.error("Fetch Work Queue Error:", error.message);
    res.status(500).json({ message: "Error fetching work queue", error: error.message });
  }
};

const createGeneralWork = async (req, res) => {
  try {
    const { employeeId, workType, referenceId, workModel, title, instructions } = req.body;

    // Validate required fields based on work.model.js
    if (!employeeId || !workType || !referenceId || !workModel || !title) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields matching the database schema constraints."
      });
    }

    // Create the new Work document
    const newWork = new Work({
      employeeId,
      workType,
      referenceId,
      workModel,
      title,
      instructions
    });

    const savedWork = await newWork.save();

    res.status(201).json({
      success: true,
      message: "General task successfully created and deployed!",
      work: savedWork
    });

  } catch (error) {
    console.error("Error creating general work:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error while creating task", 
      error: error.message 
    });
  }
};

// module.exports = { createGeneralWork };

module.exports = { getEmployeeWork, createGeneralWork};