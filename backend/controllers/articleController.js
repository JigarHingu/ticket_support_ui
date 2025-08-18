const Article = require('../models/articleModel');
const mongoose = require('mongoose');

// @desc    Get all articles
// @route   GET /api/articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 }).populate('author', 'name');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single article by ID
// @route   GET /api/articles/:id
const getArticle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid article ID.' });
    }

    try {
        const article = await Article.findById(id).populate('author', 'name');
        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// @desc    Create a new article
// @route   POST /api/articles
const createArticle = async (req, res) => {
  const { title, content, category, status } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    const article = await Article.create({
      title,
      content,
      category,
      status,
      author: req.user._id,
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update an article
// @route   PATCH /api/articles/:id
const updateArticle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid article ID.' });
    }

    try {
        const article = await Article.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
const deleteArticle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid article ID.' });
    }

    try {
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        res.status(200).json({ message: 'Article deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  getArticles,
  getArticle, // Export the new function
  createArticle,
  updateArticle,
  deleteArticle,
};
