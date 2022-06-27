const { user: userService } = require("../service");
const User = require('../models/User')


exports.getAllUser  = async (req, res) => {
  try {
    res.header( "Access-Control-Allow-Origin" );

    const userDetails = await User.find({
      
       account_type:'user'
      // account_type: "gallery",
      // invitation_status: payload.invitation_status,
      // gallery_signup_step: payload.gallery_signup_step,
      // pause_status:payload.pause_status
      // approved: true,
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {
      return res.status(200).json({
        data: userDetails,
      });
    } else {
      throw "User not found";
    }

    // throw "User not found";
  } catch (ex) {
    throw "User not found";
  }
};





exports.createAccount = async (req, res) => {
  const { 
    name,
    email,
    password,
    role,
    
   } = req.body;
  const result = await userService.createUser(
   
    name,
    email,
    password,
    role,
    res

  );
};


exports.login  = async (req, res) => {
  try {
    const { email,password} =   req.body
    res.header( "Access-Control-Allow-Origin" );

    const userDetails = await User.findOne({
       email,
       password
     
    })
      // .populate("artist_artwork")
      .lean();
      console.log('user',userDetails)
    if (userDetails) {
      return res.status(200).json({
        data: userDetails,
      }); 
      
    } else {
      res.status(200).json({
        error:'Incorrect UserName Or Password'
      });

    }

    // throw "User not found";
  } catch (ex) {
    throw "Voter not found";
  }
};
