const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTicket,
  updateTicket,
  addTicketReply,
  deleteTicket,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

// GET all tickets (can remain public)
router.get("/", protect, getTickets);

// The following routes are now protected. The 'protect' middleware will run first.
// If the user is authenticated, it will then call the controller function.

// POST a new ticket
router.post("/", protect, createTicket);

// PATCH (update) a specific ticket's status
router.patch("/:id", protect, updateTicket);

// POST a new reply to a specific ticket
router.post("/:id/replies", protect, addTicketReply);

// DELETE a specific ticket
router.delete("/:id", protect, deleteTicket);

module.exports = router;
