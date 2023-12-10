const express = require("express");
const cors = require('cors')
const router = express.Router();
const { getAllatfal, filterdata, dataStat, countAllData, downloadAtfaldata} = require("../contoller/data_controller");
const {verifyToken} = require("../middlewares/Authuser")



// Route to get all data
router.get("/atfals", cors(), getAllatfal);
router.get("/atfalsfilter", cors(), filterdata)
router.get("/dataStat", cors(), dataStat)
router.get("/totalAtfal", cors(), countAllData)
router.get("/download", cors(), downloadAtfaldata)

module.exports = router;
