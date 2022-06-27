const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: false,
    },
    role: {
      type: String,
      trim: true,
      required: false,
    },

  },
  { timestamps: true }

);
module.exports = mongoose.model("user", userSchema);
