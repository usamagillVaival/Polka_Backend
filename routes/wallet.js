const express = require("express");

const {
 createWallet
} = require("../controllers/wallets");

const router = express.Router();

router.post("/createWallet", createWallet);
module.exports = router;
