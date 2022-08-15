const walletAddresses = require("../models/walletAddresses")

exports.createWallet = async (req, res) => {
    const { 
      wallet_address,
     } = req.body;
     try {
      const catg = new walletAddresses({
        wallet_address
      });
      await catg.save(async(err, user) => {
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
  