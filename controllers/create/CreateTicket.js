
const TicketSchema = require("../../models/Ticket.model");

const NewTicket = async (req, res, next) => {
    try {
        const TicketQueue = req.body;
        console.log("TicketQueue", TicketQueue);

        const { subject, description, category, priority, raisedBy, employeeName } = TicketQueue;

        // --- START SEQUENTIAL ID LOGIC ---
        // 2. Count existing documents to determine the next number
        const count = await TicketSchema.countDocuments();
        
        // 3. Format the ID (e.g., TIC-001, TIC-002)
        // padStart(3, '0') ensures "1" becomes "001"
        const nextNumber = (count + 1).toString().padStart(3, '0');
        const generatedTicketId = `TIC-${nextNumber}`;
        // --- END SEQUENTIAL ID LOGIC ---

        const saveticket = new TicketSchema({
            ticketId: generatedTicketId, // Manually adding the required field
            subject,
            description,
            category,
            priority,
            raisedBy,      // Pass these from the frontend payload
            employeeName,  // Pass these from the frontend payload
        });

        await saveticket.save();
        res.status(201).json({ status: "Ticket saved successfully", ticket: saveticket });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = NewTicket;