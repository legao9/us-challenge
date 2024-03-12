const mongoose = require("mongoose");

const CompanySubscriptionSchema = new mongoose.Schema({
  company_id: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    default: 0
  },
  subscription_id: {
    type: String,
    required: true,
  },
  subscription_type: {
    type: String,
    required: true,
    default: "free",
  },
  subscription_startDate: {
    type: Date,
  },
  subscription_endDate: {
    type: Date,
  },
  price: {
    monthly: {
      price: Number,
      old_price: Number,
    },
    annually: {
      price: Number,
      old_price: Number,
    },
  },
  benefits: [Object],
  created_at: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

const CompanySubscription = mongoose.model("companySubscription",CompanySubscriptionSchema);

module.exports = CompanySubscription;
