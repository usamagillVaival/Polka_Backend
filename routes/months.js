const express = require("express");
const { connectDB } = require("../config/db");
const { upload } = require("../config/multer");



const {
 getAllMonths,
 createMonth,
 getMonthReward,
 getMonthsReward
} = require("../controllers/months");

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
router.post("/users/createMonth",createMonth);
router.get("/users/getAllMonths", getAllMonths);
router.post("/users/getMonth", getMonthReward);
router.post("/users/getMonthsReward",getMonthsReward );

module.exports = router;
