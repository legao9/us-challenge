const express = require("express")
const router = express.Router()
const todoListController = require("../controllers/todoListController")
router.post("/create",todoListController.createTodoList) 
router.get("/get/:challengeId", todoListController.getTodoByChallengeId)
module.exports=router
