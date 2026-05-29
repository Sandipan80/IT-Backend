// controllers/update/CompleteWork.js
const Work = require("../../models/Work.model");
const Ticket = require("../../models/Ticket.model");

const completeWorkItem = async (req, res) => {
  try {
    const { workId } = req.params;
    const existingWork = await Work.findById(workId);
    if (!existingWork) {
      return res.status(404).json({ message: "Work item not found" });
    }
    if (existingWork.status === "Completed") {
      return res
        .status(400)
        .json({ message: "This work item is already completed" });
    }

    // 1. Find the Work document and mark it completed
    const completedWork = await Work.findByIdAndUpdate(
      workId,
      { status: "Completed" },
      { new: true },
    );

    if (!completedWork) {
      return res.status(404).json({ message: "Work item not found" });
    }

    // 2. Dynamic Update: Check what type of work it was and update the source
    if (completedWork.workType === "IT_Ticket") {
      await Ticket.findByIdAndUpdate(
        completedWork.referenceId, // This links back to the original Ticket
        { status: "Resolved" },
      );
    }
    // You can easily add an 'else if' here later when you add General_Task

    res.status(200).json({
      success: true,
      message: "Work marked as complete and Ticket resolved!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { completeWorkItem };
