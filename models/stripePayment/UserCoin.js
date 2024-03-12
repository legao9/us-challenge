const mongoose = require("mongoose")

const UserCoinSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const UserCoin = mongoose.model("UserCoin",UserCoinSchema)

module.exports = UserCoin