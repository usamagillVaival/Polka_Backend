const express = require("express");
const { connectDB } = require("../config/db");
const { upload } = require("../config/multer");

const {
 getAllNfts,
 createNFT,
 getAllNftsByUserId
 
} = require("../controllers/nft");


const router = express.Router();

router.post("/users/createNFT",upload.single("file"), createNFT);
router.post("/users/getNftByStatus", getAllNfts);
router.post("/users/getAllNftsByUserId", getAllNftsByUserId);


module.exports = router;
