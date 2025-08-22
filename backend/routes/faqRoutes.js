const express = require('express');
const router = express.Router();
const {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faqController');
const { protect } = require('../middleware/authMiddleware'); // We'll need this to protect routes

// GET all FAQs (this can remain public for all users)
router.get('/', getFaqs);

// The following routes should only be accessible by admins.
// We will add a specific admin middleware later. For now, we'll use 'protect'.

// POST a new FAQ
router.post('/', protect, createFaq);

// PATCH (update) a specific FAQ
router.patch('/:id', protect, updateFaq);

// DELETE a specific FAQ
router.delete('/:id', protect, deleteFaq);

module.exports = router;
