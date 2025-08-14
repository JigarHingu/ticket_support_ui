const express = require('express');
const router = express.Router();
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

// We'll protect all of these routes to ensure only logged-in users can access them.
// Later, we can add an admin-only middleware here.

// GET all articles
router.get('/', protect, getArticles);

// POST a new article
router.post('/', protect, createArticle);

// PATCH (update) a specific article
router.patch('/:id', protect, updateArticle);

// DELETE a specific article
router.delete('/:id', protect, deleteArticle);

module.exports = router;
