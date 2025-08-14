const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This links the article to the admin who wrote it
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Draft',
  },
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
