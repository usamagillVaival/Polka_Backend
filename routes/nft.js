const express = require("express");
const { connectDB } = require("../config/db");
const { upload } = require("../config/multer");



const {
 getAllNfts,
 createNFT,
 getAllNftsByUserId,
 viewProfile,
 uploadIPFS,
 getNfts,
 insertMintHash
 
} = require("../controllers/nft");

let gfs;

(async function () {
  gfs = await connectDB();
})();

const addingGFS = async (req, res, next) => {
  if (!gfs) {
    gfs = await connectDB();
  }
  req.gfs = gfs;
  next();
};

const router = express.Router();

router.post("/users/createNFT",upload.single("file"), createNFT);
router.post("/users/getNftByStatus", getAllNfts);
router.post("/users/getNfts", getNfts);

router.post("/users/getAllNftsByUserId", getAllNftsByUserId);
router.get("/users/nft_image/:filename", addingGFS, viewProfile);
router.post("/users/uploadIPFS", uploadIPFS);
router.post("/users/InsertMintHash",insertMintHash);


module.exports = router;
