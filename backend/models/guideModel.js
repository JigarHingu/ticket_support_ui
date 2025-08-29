const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guideSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  guideBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  
}, { timestamps: true });

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
