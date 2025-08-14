const Faq = require('../models/faqModel');

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getFaqs = async (req, res) => {
  try {
    // Find all FAQs and sort them by when they were created
    const faqs = await Faq.find({}).sort({ createdAt: 'asc' });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFaqs,
};
