const Ticket = require("../models/ticketModel");
const User = require("../models/userModel"); // We need the User model to get user details
const mongoose = require("mongoose");

// Helper function to generate a user-friendly ticket ID
const generateTicketId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `TKT-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

// @desc    Get tickets (all for admins, own for users)
// @route   GET /api/tickets
const getTickets = async (req, res) => {
  try {
    // Find the logged-in user to check their role
    const user = await User.findById(req.user.id);

    let tickets;
    if (user.role === "Admin") {
      // If user is an Admin, find all tickets
      tickets = await Ticket.find({}).sort({ createdAt: -1 });
    } else {
      // Otherwise, find only the tickets that belong to this user
      tickets = await Ticket.find({ user: req.user.id }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a new ticket
// @route   POST /api/tickets
const createTicket = async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user.id; // We get the user's ID from the 'protect' middleware

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Please provide a title and description." });
  }

  try {
    // Find the user to get their name and role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate the new user-friendly ticket ID
    const ticketId = generateTicketId();

    // The description becomes the first reply
    const firstReply = {
      text: description,
      user: userId,
      name: user.name,
      role: user.role,
    };

    const newTicket = await Ticket.create({
      user: userId,
      ticketId, // Add the new ID here
      title,
      description, // We still save the main description
      tags,
      replies: [firstReply], // Add the first reply to the array
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Add a reply to a ticket
// @route   POST /api/tickets/:id/replies
const addTicketReply = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ticket ID." });
  }

  if (!text) {
    return res.status(400).json({ error: "Reply text is required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    const newReply = {
      text,
      user: userId,
      name: user.name,
      role: user.role,
    };

    ticket.replies.push(newReply);
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a ticket's status
// @route   PATCH /api/tickets/:id
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ticket ID." });
  }

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
const deleteTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ticket ID." });
  }

  try {
    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.status(200).json({ message: "Ticket deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTickets,
  createTicket,
  updateTicket,
  addTicketReply,
  deleteTicket,
};
