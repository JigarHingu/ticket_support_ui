const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile, toggleSaveGuide, getUserStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route for user registration
// This will correspond to POST /api/users/register
router.post('/register', registerUser);

// Route for user login
// This will correspond to POST /api/users/login
router.post('/login', loginUser);

// Route for updating user profile
// 2. This route is now protected. The 'protect' middleware will run first.
// If the user is authenticated, it will then call 'updateUserProfile'.
router.patch('/profile', protect, updateUserProfile);

// Route for saving or unsaving a guide
router.patch('/save-guide', protect, toggleSaveGuide)

// Route for getting user stats (must be protected)
router.get('/stats', protect, getUserStats);

module.exports = router;
