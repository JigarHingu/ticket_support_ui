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
  // We can add a field for the guide's content later
  // content: {
  //   type: String,
  //   required: true,
  // }
}, { timestamps: true });

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
