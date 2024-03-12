const mongoose = require("mongoose")

const CoinRuleForPaymentSchema = new mongoose.Schema({
    rule_key: {
        type: Number,
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

const CoinRuleForPayment = mongoose.model("CoinRuleForPayment",CoinRuleForPaymentSchema)

module.exports = CoinRuleForPayment
