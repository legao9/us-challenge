const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    admin_id: {
        type: String,
    },
    country: {
        type: String
    },
    region: {
        type: String
    },
    company_location: {
        type: String
    },
    subscription_type: {
        type: String,
        default: "free"
    },
    subscription_endDate: {
        type: Date,
    },
    is_subscription: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Company = mongoose.model("company",CompanySchema)

module.exports = Company
