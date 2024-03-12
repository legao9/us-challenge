const mongoose = require("mongoose")

const CoinHistorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },in: {
        type: Boolean
    },
    description:{
        type: String
    },
    coins: {
        type: Number,
        required: true
    },
    reference_id: {
        type: String,
        dafault: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const CoinHistory = mongoose.model("CoinHistory",CoinHistorySchema)

module.exports = CoinHistory