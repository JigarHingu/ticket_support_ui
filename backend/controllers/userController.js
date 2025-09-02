const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to create a token
const createToken = (_id) => {
  // The JWT_SECRET is a secret key stored in your .env file
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Helper function to generate a user-friendly user ID
const generateUserId = async () => {
  // Find the last created user sorted by userId in descending order
  const lastUser = await User.findOne().sort({ userId: -1 });

  if (!lastUser) {
    return "USR-0001"; // First user
  }

  // Extract the number part from the last userId
  const lastNumber = parseInt(lastUser.userId.split("-")[1], 10);

  // Increment the number
  const nextNumber = lastNumber + 1;

  // Pad the number with leading zeros
  const paddedNumber = String(nextNumber).padStart(4, "0");

  return `USR-${paddedNumber}`;
};


// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { name, email, password, role, phone, company } = req.body;

  try {
    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Generate the new user-friendly ID
    const userId = await generateUserId();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const user = await User.create({
      userId,
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      company,
    });

    // Create a token
    const token = createToken(user._id);

    res.status(201).json({
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Login a user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password." });
    }

    // Check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect email or password." });
    }

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    // We will get the user's ID from the auth middleware later
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.phone = req.body.phone || user.phone;
      user.company = req.body.company || user.company;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        userId: updatedUser.userId,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        company: updatedUser.company,
        savedGuides: updatedUser.savedGuides,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Save or unsave a guide
// @route   PATCH /api/users/save-guide
const toggleSaveGuide = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { guideId } = req.body;

    if (!guideId) {
      return res.status(400).json({ error: "Guide ID is required." });
    }

    const isSaved = user.savedGuides.includes(guideId);

    if (isSaved) {
      // If already saved, remove it
      user.savedGuides.pull(guideId);
    } else {
      // If not saved, add it
      user.savedGuides.push(guideId);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      userId: updatedUser.userId,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      company: updatedUser.company,
      savedGuides: updatedUser.savedGuides,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user statistics
// @route   GET /api/users/stats
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude the password field for security
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add this new function to your userController.js file

// @desc    Update a user's role (Admin only)
// @route   PUT /api/users/:id
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Set the user's role to the new one sent in the request body
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();

      // Send back the updated user details (excluding password)
      res.json({
        _id: updatedUser._id,
        userId: updatedUser.userId,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  toggleSaveGuide,
  getUserStats,
  getAllUsers,
  updateUserRole,
};
