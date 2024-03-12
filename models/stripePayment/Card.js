const { Mongoose } = require("mongoose")
const mongoose = require("mongoose")

const CardSchema  = new mongoose.Schema({
    company_id:{
        type: String
    },
    card_number: {
        type: String,
        trim: true
    },
    exp_month: {
        type: String
    },
    exp_year: {
        type: String
    }
})

const Card = mongoose.model("cardDetails",CardSchema)

module.exports = Card