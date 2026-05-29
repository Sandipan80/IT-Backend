const Ticket = require('../../models/Ticket.model');
const Work = require('../../models/Work.model'); 

const assignTicketToEmployee = async (req, res) => {
  try {
    // Fallback: capture both 'id' and '_id' from params so it never comes up undefined
    const id = req.params.id || req.params._id; 
    const { employeeId, employeeName, instructions } = req.body; 


    // Run the update using the fallback variable
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id, 
      { 
        assignedTo: employeeId, 
        assignedToName: employeeName, 
        status: "In Progress" 
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found inside collection" });
    }

    const newWorkItem = new Work({
      employeeId: employeeId,
      workType: 'IT_Ticket',
      referenceId: updatedTicket._id,
      workModel: 'TicketSchema', 
      title: `Ticket: ${updatedTicket.subject}`,
      instructions: instructions || "No specific instructions provided."
    });

    await newWorkItem.save();

    res.status(200).json({ 
      success: true, 
      message: "Ticket assigned and Work generated!",
      ticket: updatedTicket
    });

  } catch (error) {
    console.error("Assignment Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { assignTicketToEmployee };