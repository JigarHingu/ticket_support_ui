const Faq = require("../models/faqModel");
const mongoose = require("mongoose");

// @desc    Get all FAQs
// @route   GET /api/faqs
const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({}).sort({ createdAt: "asc" });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a new FAQ
// @route   POST /api/faqs
const createFaq = async (req, res) => {
  const { category, question, answer } = req.body;

  if (!category || !question || !answer) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const faq = await Faq.create({ category, question, answer });
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update an FAQ
// @route   PATCH /api/faqs/:id
const updateFaq = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid FAQ ID." });
  }

  try {
    const faq = await Faq.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found." });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete an FAQ
// @route   DELETE /api/faqs/:id
const deleteFaq = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid FAQ ID." });
  }

  try {
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found." });
    }
    res.status(200).json({ message: "FAQ deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
};
