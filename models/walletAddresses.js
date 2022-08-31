const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      trim: true,
    },

    lock_time: {
      type: String,
      trim: true,
    },

    flexible_time: {
      type: String,
      trim: true,
    },
    staked_tokens: {
      type: String,
      trim: true,
    },
    staked_type: {
      type: Number,
      trim: true,
    },
    reward: {
      type: Number,
      trim: true,
    },
    
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("wallets", walletSchema);
