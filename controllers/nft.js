const { user: userService } = require("../service");
const NFT = require('../models/NFT')


exports.getAllNfts  = async (req, res) => {
  try {

    const status = req.body.status

    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
      status :status      
    })
      .lean();
    if (nftDetails) {
      return res.status(200).json({
        data: nftDetails,
      });
    } else {
      return res.status(200).json({
        data: [],
      });
    }

    // throw "NFT not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
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
      status:0
  
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

