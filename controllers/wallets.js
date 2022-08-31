
const walletAddresses = require("../models/walletAddresses")
var nodemailer = require('nodemailer');



exports.getWallets  = async (req, res) => {
  console.log('cc')
  try {
    res.header( "Access-Control-Allow-Origin" );

    const userDetails = await walletAddresses.find({
     
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {
           
           return  res.status(200).json({
            data :userDetails,
          });

   
    } else {
      return  res.status(200).json({
        data:[],
      });

    }

    // throw "User not found";
  }
   catch (ex) {
    throw "User not found";
  }
};





exports.createWallet = async (req, res) => {
    const { 
      wallet_address,
      staked_type 

     } = req.body;
     try {
   
      console.log('found',staked_type)


      const nftDetails = await walletAddresses.find({
        wallet_address,
        staked_type : staked_type

        // status :status      
      })
        .lean();
        console.log('nft',nftDetails)
      if (nftDetails.length>0) {
        console.log('dd',nftDetails)

        return res.status(200).json({
          data: nftDetails,
        });
      }
       else {

          console.log('cc')
        const catg = new walletAddresses({
          wallet_address,
          staked_type
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

      
    }
  
   catch(e){
  
   }
     
  };



  
  exports.getRewards  = async (req, res) => {
    try {
  
      const wallet_address = req.body.wallet_address
  
  
      const nftDetails = await NFT.find({
        // status :status      
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
  



  exports.sendEmail  = async (req, res) => {
    console.log('cc')
    try {
      res.header( "Access-Control-Allow-Origin" );
  
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'usamaaagill@gmail.com',
          pass: 'bfthewmlzbmazvvj'
        }
      });
      
      var mailOptions = {
        from: 'usama@gmail.com',
        to: 'muhammad.usama@vaivaltech.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });



          // throw "User not found";
    }
     catch (ex) {
      throw "User not found";
    }
  };
  