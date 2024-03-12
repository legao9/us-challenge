const mongoose = require("mongoose")

const WithdrawalSchema = new mongoose.Schema({
    Withdrawal_by: {
        type: String,
        required: true
    },
    Withdrawal_amt: {
        type: String,
        required: true
    },
    Withdrawal_reference: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
 const Withdrawal = mongoose.model("Withdrawal",WithdrawalSchema)

 module.exports = Withdrawal