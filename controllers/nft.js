const { user: userService } = require("../service");
const NFT = require('../models/NFT')


exports.getAllNfts  = async (req, res) => {
  try {
    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
      
      
    })
      .lean();
    if (nftDetails) {
      return res.status(200).json({
        data: nftDetails,
      });
    } else {
      throw "NFT not found";
    }

    // throw "NFT not found";
  } catch (ex) {
    throw "NFT not found";
  }
};





exports.createNFT = async (req, res) => {
  const { 
   
    title,
    description,
    price,
    amount_for_sale,
    userId, 

    
   } = req.body;
   console.log('kk')
   try {
    if (!req.file) {

      return res.status(200).json({
        message: "Failed to upload file",
        success:false
      
        // token: user.confirmationCode,
        //  user:user
      });
    }

    if (!userId) {
      return res.status(200).json({
        message: "UserId is required",
        success:false
      
        // token: user.confirmationCode,
        //  user:user
      });

    }

    const {filename} = req.file

   
    

    const nft = new NFT({
      file:filename, 
      title,
      description,
      price,
      amount_for_sale,
      userId, 
  
    });
    await nft.save(async(err, user) => {
  
      if (err) {
        console.log(err);
        return res.status(400).json({
          // error: errorHandler(err)
          error: err.message,
        });
      }
  
    
  
  
  
      return res.status(200).json({
        message: "created",
        success:true,
        data:user
        // token: user.confirmationCode,
        //  user:user
      });
    });
  }

 catch(e){

 }
   
};

