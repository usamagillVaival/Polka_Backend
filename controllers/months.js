const { user: userService } = require("../service");
const User = require('../models/User')
const Category = require("../models/Category")
const Month = require("../models/months")
const {
  toJson,
} = require("../service/utils");
const moment = require('moment')

async function getNftById(userId) {
  const user = await NFT.find({ userId:userId }, (err, user) => {});
  return toJson(user);
}


exports.getAllMonths  = async (req, res) => {
  try {
    res.header( "Access-Control-Allow-Origin" );

    const userDetails = await Month.find({
     
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




exports.getMonthReward  = async (date) => {
  try {

    let month =    moment(date,'DD-MM-YYYY').format('MMMM')
    //  console.log(month)


    const userDetails = await Month.find({
     
      name:month
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {
              

      let reward = userDetails?.[0]?.percentage
        // console.log('reward',reward)
              const startmonth = moment(date,'DD-MM-YYYY');
              const totalDays = moment(date,'DD-MM-YYYY').daysInMonth()
              // console.log('totaldays',totalDays)
        const endOfMonth   = moment(date,'DD-MM-YYYY').endOf('month');

            

        const first_month_days = moment.duration(endOfMonth.diff(startmonth)).asDays()

            const rewardInDays =     reward / totalDays * first_month_days


            //  console.log('rewardssssss',rewardInDays)
               


           return  rewardInDays

   
    } else {
      return  0

    }

    // throw "User not found";
  }
  catch (ex) {
    return  0

  }
};


exports.getLastMonthReward  = async (date) => {
  try {

    let month =    moment(date,'DD-MM-YYYY').format('MMMM')
    // console.log(month)


    const userDetails = await Month.find({
     
      name:month
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {
              

      let reward = userDetails?.[0]?.percentage

              const startmonth = moment(date,'DD-MM-YYYY').startOf('month');
              const totalDays = moment(date,'DD-MM-YYYY').daysInMonth()
              // console.log('totaldays',totalDays)
        const endOfMonth   =   moment(date,'DD-MM-YYYY'); 

            

        const last_month_days = moment.duration(endOfMonth.diff(startmonth)).asDays()

      //  console.log('lastMonthDays',last_month_days)

            const rewardInDays =     reward / totalDays * last_month_days


             console.log('rewardssssss',rewardInDays)
               


           return  rewardInDays

   
    } else {
      return  0

    }

    // throw "User not found";
  }
  catch (ex) {
    return  0

  }
};



exports.getMonthsReward  = async (date) => {
  try {

    

    // console.log('cc')
    let month =  date?.map((x)=> moment(x,'DD-MM-YYYY').format('MMMM'))  
    // console.log(month)


    


    const userDetails = await Month.find({
     
      name:  month
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {
              

      let reward  = userDetails.reduce(function (acc, obj) { return acc + Number(obj?.percentage); }, 0);
      // console.log(reward);  
      
           return   reward
          

   
    } else {
     return 0

    }

    // throw "User not found";
  }
  catch (ex) {
    return  0

  }
};





exports.createMonth = async (req, res) => {
  const { 
    name,
    percentage
   } = req.body;
   try {
    Month.findOneAndUpdate({name}, {$set: {percentage}}, {upsert: true}, function(err,doc) {
      if (err) { 
        
        return res.status(200).json({
          message: "failed",
          success:false,
          // data:user
          // token: user.confirmationCode,
          //  user:user
        });      
      }
      else { 

        return res.status(200).json({
          message: "created",
          success:true,
          // data:user
          // token: user.confirmationCode,
          //  user:user
        });
       }
    })
  }

 catch(e){

 }
   
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
    return res.status(200).json({
      error: ex,
    });
  }
};
