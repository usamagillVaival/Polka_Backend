const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    file: { type: String },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    amount_for_sale: { type: Number },
   
    userId: { type: String }, 
    status:{type:Number },
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
    nft_mint_pending_date:{
      type:Date,
      trim:true
    },
    nft_mint_confirmed_data:{
      type:Date,
      trim:true
    },
    minted_ids:{
      type:Array,
      trim:true
    },
    listed_ids:{
      type:Array,
      trim:true
    },
    list_pending_date:{
      type:Date,
      trim:true
    },
    list_confirm_date:{
      type:Date,
      trim:true
    },
    list_status:{
      type:String,
      trim:true
    },  
    list_hash:{
      type:String,
      trim:true
    },  
  },
  { timestamps: true }

);
module.exports = mongoose.model("nft", nftSchema);
