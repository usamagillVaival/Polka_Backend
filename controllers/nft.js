const NFT = require('../models/NFT')
const User = require('../models/User')
const {
  toJson,
} = require("../service/utils");
const { create, urlSource } = require("ipfs-http-client");

const client = create("https://ipfs.infura.io:5001/api/v0");





async function getUserByEmail(email) {
  const user = await User.findOne({ _id:email }, (err, user) => {});
  return toJson(user);
}

exports.getNfts  = async (req, res) => {
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



exports.approveNfts  = async (req, res) => {
  try {

    const nftId = req.body.nftId

    res.header( "Access-Control-Allow-Origin" );

    NFT.updateOne(
        { "_id": nftId}, // Filter
        {"status": 1} // Update
    )
    .then((obj) => {
        console.log('Updated - ' + obj);
        return res.status(200).json({
          data: [],
        });
    })
    .catch((err) => {
        console.log('Error: ' + err);
    })

    // throw "NFT not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
  }
};



exports.getAllNftsByUserId  = async (req, res) => {
  try {

    const userId = req.body.userId

    const approveUser = await getUserByEmail(userId);
    
    console.log('approve userrr',approveUser)

    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
      userId      
    })
      .lean();
    if (nftDetails) {
      return res.status(200).json({
        data: nftDetails,
        walletAddress:approveUser.walletAddress
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



exports.viewProfile = (req, res) => {
  try {
    req.gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      // Read output to browser
      const readstream = req.gfs.createReadStream(file.filename);
      readstream.pipe(res);
      //   res.json({ readstream });
    });
  } catch (ex) {
    res.status(400).json({ error: "No file exists" });
  }
  //   const { payload } = req.body;
  //   const {
  //     name,
  //     yearOfBirth,
  //     nationality,
  //     coverArt,
  //     biography,
  //     networkCategory,
  //     links,
  //   } = payload;
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



exports.uploadIPFS = async (req, res, next) => {
  
  const { title, description, imageurl } = req.body;
  console.log(imageurl)
  let url = "";

  try {
    const added = await client.add(urlSource(imageurl));
    url = `https://ipfs.infura.io/ipfs/${added.cid}`;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }

  // const cid = await ipfs.add({ content }, {
  //   cidVersion: 1,
  //   hashAlg: 'sha2-256'
  // }

  const data = JSON.stringify({
    name: title,
    description,
    image: url,
  });

  try {
    const added = await client.add(data);
    const meta = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(meta);
    res.json(meta);
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};

exports.insertMintHash = async (req, res, next) => {
  console.log("call mint hash")
  const { artId, hash } = req.body;
  console.log("artId: ", artId);
  console.log("hash: ", hash);

  NFT.findOne({ _id: artId }, async (err, nft) => {
    if (err || !nft) {
      return res.status(400).json({
        error: " not found",
      });
    }
    if (nft) {
      (nft.mint_status = "pending"), (nft.mint_hash = hash),
      (nft.nft_mint_pending_date=new Date()),
      (nft.status=2)
    }
    nft.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      res.json(updatedUser);
    });
  });
};