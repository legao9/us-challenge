const mongoose = require("mongoose")

const CoinRuleSchema = new mongoose.Schema({
    rule_key: {
        type: String,
        required: true
    },
    rule_value: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

const CoinRule = mongoose.model("CoinRule",CoinRuleSchema)

module.exports = CoinRule
