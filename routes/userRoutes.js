const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
router.get("/coins/:userId",userController.getUsercoin) 
module.exports=router
