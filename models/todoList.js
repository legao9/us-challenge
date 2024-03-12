const mongoose = require("mongoose")

const list = new mongoose.Schema({
    task:{type:String},
    points: {type:Number},
    checkedBy:{type:Array},
    challengeId:{type: String},
    duedate: {type: Date}
})
const TodoList = new mongoose.model("TodoList", list)

module.exports = TodoList;