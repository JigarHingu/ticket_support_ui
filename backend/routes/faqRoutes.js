const express = require('express');
const router = express.Router();
const { getFaqs } = require('../controllers/faqController');

// @desc    Get all FAQs
// @route   GET /api/faqs
router.get('/', getFaqs);

module.exports = router;
