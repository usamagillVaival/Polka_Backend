const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    file: { type: String },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    amount_for_sale: { type: Number },
   
    userId: { type: String }, 
    
    mint_status: {
      type: String, 
      trim: true,
    }, 
    mint_date: {
      type: Date,
      trim: true,
    },
    sold_date: {
      type: Date,
      trim: true,
    },
    mint_hash: {
      type: String,
      trim: true,
    },

    buying_status:{
      type: String,
      trim: true,
    },

    buying_hash:{
      type: String,
      trim: true,
    },

    token_id: {
      type: String,
      trim: true,
    },
  
  },
  { timestamps: true }










);
module.exports = mongoose.model("nft", nftSchema);
