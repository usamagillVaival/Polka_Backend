const express = require("express");
const {
 getAllNfts,
 createNFT
 
} = require("../controllers/user");


const router = express.Router();

router.post("/users/createNFT", createNFT);
router.get("/users/getAllNFT", getAllNfts);


module.exports = router;
