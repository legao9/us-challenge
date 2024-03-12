let mongoose = require('mongoose');

let postschema = new mongoose.Schema({
    user_email:String,
    topic: String,
    type: String,
    choices: [
        String
    ],
    answer: []  // {name:"JAMES", answer:"Sugar"}
});

module.exports = mongoose.model('poll',postschema)