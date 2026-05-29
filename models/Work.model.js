// models/Work.model.js
const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workType: {
      type: String,
      enum: ["IT_Ticket", "General_Task"],
      required: true,
    },
    // The 'referenceId' points to the actual Ticket or Task document
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "workModel", // Tells Mongoose which collection to populate from
    },
    // This stores the name of the model ('Ticket' or 'Task') for refPath
    workModel: {
      type: String,
      required: true,
      enum: ["TicketSchema", "Task"],
    },
    instructions: {
      type: String,
      default: "No specific instructions provided.",
    },
    title: {
      type: String,
      required: true,
    }, // A quick summary so you don't always have to populate
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Work", WorkSchema);
