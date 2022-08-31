const mongoose = require("mongoose");
const monthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    percentage: {
      type: String,
      trim: true,
    },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("month", monthSchema);
