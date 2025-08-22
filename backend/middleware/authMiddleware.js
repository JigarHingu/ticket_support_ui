const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Check if the token was sent in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (it's in the format 'Bearer <token>')
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID from the token and attach it to the request object
      // We exclude the password from being returned
      req.user = await User.findById(decoded._id).select("-password");

      next(); // Move on to the next function (our controller)
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

module.exports = { protect };
