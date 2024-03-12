const mongoose = require("mongoose")

const board = new mongoose.Schema({
userId: {type: String},
challengeid: {type: String},
points: Number,
streak: Array,
tasksCompleted: {type:Number}
})

const LeaderBoard = mongoose.model("LeaderBoard", board)
module.exports = LeaderBoard
