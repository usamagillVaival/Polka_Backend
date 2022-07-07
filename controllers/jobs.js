const NFT = require('../models/NFT')
var Web3 = require('web3');
var provider = process.env.HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
exports.mintjob  = async () => {
    console.log(provider)
    console.log("hello")
    NFT.find({
        mint_status: "pending",
    }).exec((err, data) => {
     
      // console.log('data',data)
      data?.map(async (x) => {
        console.log("mint job job running")
          let hash = x.mint_hash;
          await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
            if (err) {
              console.log(err);
            }
            if (receipt !== null && receipt !== undefined) {
              if (receipt.status == true) {

                x.status = 3;
                x.mint_status="minted";
                x.nft_mint_confirmed_data=new Date()
                x.save((err, user) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(user);
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