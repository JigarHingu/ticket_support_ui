const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['General Questions', 'Pricing', 'Services', 'Account', 'Others'],
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;
