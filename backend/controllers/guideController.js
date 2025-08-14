const Guide = require('../models/guideModel');

// @desc    Get all guides
// @route   GET /api/guides
// @access  Public
const getGuides = async (req, res) => {
  try {
    // Find all guides and sort them by when they were created
    const guides = await Guide.find({}).sort({ createdAt: 'desc' });
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGuides,
};
