const express = require("express");
const router = express.Router();
const { getAllatfal, filterdata, dataStat, countAllData, downloadAtfaldata} = require("../contoller/data_controller");
const {verifyToken} = require("../middlewares/Authuser")



// Route to get all data
router.get("/atfals", getAllatfal);
router.get("/atfalsfilter", filterdata)
router.get("/dataStat",  dataStat)
router.get("/totalAtfal", countAllData)
router.get("/download", downloadAtfaldata)

module.exports = router;
