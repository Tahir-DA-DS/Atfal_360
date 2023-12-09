const express = require("express")
const router = express.Router()
const {RegisterUser, loginUser}=require("../contoller/admin_users")
const validateUser = require("../middlewares/validateUser")

router.post('/register', validateUser.validateAdminSignup, RegisterUser)

router.post('/login', loginUser)

module.exports = router