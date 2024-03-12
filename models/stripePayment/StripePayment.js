const mongoose = require("mongoose")

const StripePaymentSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    card_detail: { String },

    reference_id: {
        type: String
    },
    currency: {
        type: String,
        required: true
    },
    payment_provider: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    validity: {
        type: Number
    }
})

const StripePayment = mongoose.model("StripePayment",StripePaymentSchema)

module.exports = StripePayment