const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      trim: true,
    },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("wallets", walletSchema);
