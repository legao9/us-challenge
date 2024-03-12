const express = require('express');
const { getChallengeById, updateChallenge, updateTodoList,completeATodo } = require('../controllers/challengeControllers');
const router = express.Router();


router.get('/:challengeId', getChallengeById);
router.post("/update", updateChallenge)
router.post("/updateTodo", updateTodoList)
router.post("/completeTodo", completeATodo)



module.exports = router