const express = require('express');
const router = express.Router();
const { getGuides } = require('../controllers/guideController');

// @desc    Get all guides
// @route   GET /api/guides
router.get('/', getGuides);

module.exports = router;
