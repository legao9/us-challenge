const mongoose = require("mongoose");

const SubscriptionPlanSchema = new mongoose.Schema({
    subscription_type: {
        type: String,
        required: true,
        default: "free"
    },
    coins: {
        type: Number,
        default: 0
    },
    price: {
        monthly : {
            price: Number,
            old_price: Number
        },
        annually : {
            price: Number,
            old_price: Number
        }
    },
    benefits: [Object],

    created_at: {
        type: Date,
        default: Date.now
    },
    is_active:{
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

const SubscriptionPlan = mongoose.model("SubscriptionPlan",SubscriptionPlanSchema)

module.exports = SubscriptionPlan