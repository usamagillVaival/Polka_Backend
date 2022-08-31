const NFT = require('../models/NFT')
const Wallet = require('../models/walletAddresses')
const ListedNft=require('../models/ListedNft')
var Web3 = require('web3');
var provider = "https://data-seed-prebsc-1-s1.binance.org:8545/";
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var abi=require("../abis/abi.json")
var staking_abi = require("../abis/staking.json")
var marketplaceabi=require("../abis/marketplaceabi.json")
const abiDecoder = require('abi-decoder');
const abiDecoder1=require('abi-decoder')
const { resolve } = require('path');
const moment = require('moment')
abiDecoder.addABI(abi.abi);
abiDecoder1.addABI(marketplaceabi.abi)
const {getMonthReward,getMonthsReward,getLastMonthReward} = require('./months')


exports.mintjob  = async () => {
   
    NFT.find({
      mint_status: "pending",
    }).exec((err, data) => {
     
      // 
      data?.map(async (x) => {
        
          let hash = x.mint_hash;
          await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
            
            if (err) {
              
            }
            if (receipt !== null && receipt !== undefined) {
              if (receipt.status == true) {
                
                const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
               
                let arr=[]
                for(var i=0;i<decodedLogs?.length;i++)
                {
                     arr.push(decodedLogs[i]?.events[2]?.value)
                }
                
                x.minted_ids.push(arr)
                
                x.status = 3;
                x.mint_status="minted";
                x.nft_mint_confirmed_data=new Date()
                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                   
                  }
                });
              }
               else if (receipt.status == false) {
                x.status = "false";
                x.failed_transaction=true
                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                    
                  }
                });
              }
            } else {
              
            }
          });
        
      });
    });
}
exports.listjob  = async () => {
  
  ListedNft.find({
      list_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      
      
        let hash = x.list_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              
              const decodedLogs = abiDecoder1.decodeLogs(receipt.logs);
              
              if(decodedLogs[0].events[1].value)
              {
                x.index_hash=decodedLogs[0].events[1].value
             
                x.list_status="listed";
                x.list_confirm_date=new Date()
                x.status=1
                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                  //  
                  }
                });  
              }
            
            }
             else if (receipt.status == false) {
              x.list_status = "rejected";
              x.failed_transaction=true
              x.save((err, user) => {
                if (err) {
                  
                 } else {
                   // 
                 }
               });
             }
           } else {
             
           }
         });
         
        
     });
  });
}
exports.cancellisting  = async () => {
  
  ListedNft.find({
    cancel_listing_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      
      
        let hash = x.cancel_listing_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              
              
              x.delete((err,data)=>{
                 if(err)
                 {
                  
                 }
                 
              })
              
            }
             else if (receipt.status == false) {
              x.cancel_listing_status = "rejected";
              x.save((err, user) => {
                if (err) {
                  
                 } else {
                   // 
                 }
               });
             }
           } else {
             
           }
         });
         
        
     });
  });
}
exports.buyJob  = async () => {
  
  ListedNft.find({
    buying_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      
      
        let hash = x.buying_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              x.buying_status="bought"
              x.status=2
              NFT.findOneAndUpdate({_id:x?.nft_id},
              { $pull: { "minted_ids.0" : `${x?.token_id}` } }, (err,data) => {
                
                  if (err) {
                    
                      
                  }
                })
                x.save()
            }
             else if (receipt.status == false) {
              x.buying_status=""
              x.buying_hash=""
              x.buying_wallet_address=""
              x.buyer_user_id=""
              x.status=1
              x.save((err, user) => {
                if (err) {
                  
                 } else {
                   // 
                 }
               });
             }
           } else {
             
           }
         });
         
        
     });
  });
}

function getPerc(num, percent) {
  return Number(num) - ((Number(percent) / 100) * Number(num));
}

exports.rewardsJob  = async () => {
   
  Wallet.find({
  }).exec((err, data) => {
   
    // 
    data?.map(async (x) => {
         
        let wallet = x?.wallet_address;
        // console.log(wallet)
        const mycontract= new web3.eth.Contract(staking_abi.abi,'0x23972b924DF5927c728B8aAB5F582ce0dF3Ab539');

    const balance =    await mycontract.methods.getLockedBalance(wallet).call()
    const lockBalance = web3.utils.fromWei(balance.toString(),'ether');
         
             
   
    console.log('lockBalance',lockBalance)


    if(lockBalance>0 && x.staked_type == 0){



          // console.log(result);


        //  console.log(last_month_reward)

              
                    
        //  console.log(x)


      



      if(!x.lock_time){
        x.lock_time =    new Date()
      }
     
     x.staked_type = 0;
     x.staked_tokens = lockBalance
     x.reward = 0
                x.save((err, user) => {
                  if (err) {
                    console.log('er',err)
                  } else {
                    //  console.log('updated') 
                  }
                });
        


                return


    }




    const flexible =    await mycontract.methods.getFlexibleBalance(wallet).call()
    const flexibleBalance = web3.utils.fromWei(flexible.toString(),'ether');

   
    // console.log('flexible balance',flexibleBalance)
      
    if(flexibleBalance>0 && x.staked_type == 1){
      const getMonths = (start, end) =>
    Array.from({ length: end.diff(start, 'month') + 1 }).map((_, index) =>
      moment(start).add(index, 'month').format('DD-MM-YYYY'),
    );
    
const months = getMonths(moment('16-06.2022','DD-MM-YYYY'),moment(new Date(),'DD-MM-YYYY'))
    

          
         let first_month = months[0]
        //  console.log('first',first_month)
         let first_month_reward =  await getMonthReward(first_month);
        //  console.log('firstt',first_month_reward)
           
         let mid_month = months?.slice(1,-1);
        //  console.log('mid',mid_month)  
         let mid_months_reward =  await  getMonthsReward(mid_month)
        //  console.log('firstt',mid_months_reward)


         let last_month= moment(new Date()).format('DD-MM-YYYY')
         console.log('lastmonthname',last_month)
         let last_month_reward= await getLastMonthReward(last_month);
            // console.log('lasttt',last_month_reward)


      let   reward =  first_month_reward + mid_months_reward + last_month_reward
  //  console.log(reward)

        const  result = (reward / 100) * flexibleBalance;


      if(!x.flexible_time){
        x.flexible_time =new Date()

      }
      x.staked_type = 1;

      x.staked_tokens = flexibleBalance
           x.reward = result


                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                    //  console.log('updated') 
                  }
                });



    }




      
    });
  });
}
