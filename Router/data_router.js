const express = require("express");
const router = express.Router();
const { getAllatfal, filterdata, dataStat, countAllData, downloadAtfaldata} = require("../contoller/data_controller");
const {verifyToken} = require("../middlewares/Authuser")



// Route to get all data
router.get("/atfals", verifyToken, getAllatfal);
router.get("/atfalsfilter", verifyToken, filterdata)
router.get("/dataStat", verifyToken, dataStat)
router.get("/totalAtfal", verifyToken, countAllData)
router.get("/download", verifyToken, downloadAtfaldata)

module.exports = router;
