const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    token_id: {
      type: String,
      trim: true,
    },
    nft_id: {
        type: String,
        trim: true,
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
    listed_price:{
        type:String,
        trim:true
    }
  },
  { timestamps: true }

);
module.exports = mongoose.model("listednft", nftSchema);
