const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// new schema specifically for replies
const replySchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    // This links the reply to a specific user
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", // This creates a reference to our User model
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    // This new field links the ticket to a user
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // This is the new field for the user-friendly ID
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      // Updated the list of allowed statuses
      enum: ["Awaiting Agent", "Awaiting User", "Pending", "Resolved"],
      // Changed the default for new tickets
      default: "Awaiting Agent",
    },
    tags: {
      type: [String],
      default: [],
    },
    // array to store all the replies for this ticket
    replies: [replySchema],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
