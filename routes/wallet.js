const express = require("express");

const {
 createWallet,
 getWallets,
 sendEmail
} = require("../controllers/wallets");

const router = express.Router();

router.post("/createWallet", createWallet);
router.get("/getWallets", getWallets);
router.get("/sendEmail", sendEmail);



module.exports = router;
