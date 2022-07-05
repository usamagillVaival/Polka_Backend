const express = require("express");
const { connectDB } = require("../config/db");
const { upload } = require("../config/multer");

const {
 getAllNfts,
 createNFT
 
} = require("../controllers/nft");


const router = express.Router();

router.post("/users/createNFT",upload.single("file"), createNFT);
router.get("/users/getAllNFT", getAllNfts);


module.exports = router;
