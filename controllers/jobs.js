const NFT = require('../models/NFT')
const ListedNft=require('../models/ListedNft')
var Web3 = require('web3');
var provider = process.env.HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var abi=require("../abis/abi.json")
const abiDecoder = require('abi-decoder');
const { resolve } = require('path');
abiDecoder.addABI(abi.abi);

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
                x.minted_ids.push(arr)
                console.log(arr)
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
   let arr=[]
  ListedNft.find({
      list_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      console.log("list job job running")
        let hash = x.list_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            console.log(err);
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              x.list_status="listed";
              x.list_confirm_date=new Date()
              x.save((err, user) => {
                if (err) {
                  console.log(err);
                } else {
                 console.log(data)
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
                   // console.log(user);
                 }
               });
             }
           } else {
             console.log(`transaction ${x?.mint_hash} not processed yet.`);
           }
         });
         console.log("data isssss" + data)
         console.log(arr)
        
     });
  });
}