const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    // This is the new field for the user-friendly ID
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Support Team", "Partner", "Developer"],
      default: "Developer",
    },
    phone: { type: String },
    company: { type: String },
    savedGuides: [{
      type: Schema.Types.ObjectId,
      ref: 'Guide'
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
