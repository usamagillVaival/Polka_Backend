const NFT = require('../models/NFT')
const ListedNft=require('../models/ListedNft')
var Web3 = require('web3');
var provider = process.env.HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var abi=require("../abis/abi.json")
var marketplaceabi=require("../abis/marketplaceabi.json")
const abiDecoder = require('abi-decoder');
const abiDecoder1=require('abi-decoder')
const { resolve } = require('path');
abiDecoder.addABI(abi.abi);
abiDecoder1.addABI(marketplaceabi.abi)


exports.mintjob  = async () => {
   
    NFT.find({
      mint_status: "pending",
    }).exec((err, data) => {
     
      // console.log('data',data)
      data?.map(async (x) => {
        console.log("mint job running")
          let hash = x.mint_hash;
          await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
            console.log("receipt is " + JSON.stringify(receipt))
            if (err) {
              console.log(err);
            }
            if (receipt !== null && receipt !== undefined) {
              if (receipt.status == true) {
                
                const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
               
                let arr=[]
                for(var i=0;i<decodedLogs?.length;i++)
                {
                     arr.push(decodedLogs[i]?.events[2]?.value)
                }
                console.log("minted id" + arr)
                x.minted_ids.push(arr)
                
                x.status = 3;
                x.mint_status="minted";
                x.nft_mint_confirmed_data=new Date()
                x.save((err, user) => {
                  if (err) {
                    console.log(err);
                  } else {
                   
                  }
                });
              }
               else if (receipt.status == false) {
                x.status = "false";
                x.failed_transaction=true
                x.save((err, user) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(user);
                  }
                });
              }
            } else {
              console.log(`transaction ${x?.mint_hash} not processed yet.`);
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
      console.log(x)
      console.log("list job job running")
        let hash = x.list_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            console.log(err);
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              
              const decodedLogs = abiDecoder1.decodeLogs(receipt.logs);
              console.log("decoded logs" + decodedLogs[0].events[1].value)
              if(decodedLogs[0].events[1].value)
              {
                x.index_hash=decodedLogs[0].events[1].value
             
                x.list_status="listed";
                x.list_confirm_date=new Date()
                x.status=1
                x.save((err, user) => {
                  if (err) {
                    console.log(err);
                  } else {
                  //  console.log(data)
                  }
                });  
              }
            
            }
             else if (receipt.status == false) {
              x.list_status = "rejected";
              x.failed_transaction=true
              x.save((err, user) => {
                if (err) {
                  console.log(err);
                 } else {
                   // console.log(user);
                 }
               });
             }
           } else {
             console.log(`transaction ${x?.list_hash} not processed yet.`);
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
      console.log(x)
      console.log("cancel listing  job running")
        let hash = x.cancel_listing_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            console.log(err);
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              
              
              x.delete((err,data)=>{
                 if(err)
                 console.log(err)
              })
              
            }
             else if (receipt.status == false) {
              x.cancel_listing_status = "rejected";
              x.save((err, user) => {
                if (err) {
                  console.log(err);
                 } else {
                   // console.log(user);
                 }
               });
             }
           } else {
             console.log(`transaction ${x?.list_hash} not processed yet.`);
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
      
      console.log("buy nft  job running")
        let hash = x.buying_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            console.log(err);
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              x.buying_status="bought"
              x.status=2
              NFT.findOneAndUpdate({_id:x?.nft_id},
              { $pull: { "minted_ids.0" : `${x?.token_id}` } }, (err,data) => {
                
                  if (err) {
                    console.log(err)
                      
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
                  console.log(err);
                 } else {
                   // console.log(user);
                 }
               });
             }
           } else {
             console.log(`transaction ${x?.buying_hash} not processed yet.`);
           }
         });
         
        
     });
  });
}