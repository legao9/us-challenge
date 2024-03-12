const mongoose = require("mongoose")

const PaymentCoinSchema = new mongoose.Schema({
    payment_id : {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        default: 0
    },
    amount:{
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const PaymentCoin = mongoose.model("paymentHistory",PaymentCoinSchema)

module.exports = PaymentCoin