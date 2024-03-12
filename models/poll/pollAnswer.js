let mongoose = require('mongoose');

const optionPollResponses = new mongoose.Schema({
    pollId: {
        type: mongoose.Schema.ObjectId,
        ref: 'optionPolls',
    },
    response: String,
    extraOption: {
        type: String,
        optional: true
    },
    userEmail: String,
    userPhone: {
        type: String,
        optional: true,
    },
    userAddress: {
        type: String,
        optiona: true
    },
    userLocation: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        optional: true
    },
});

module.exports.optionPollResponses = mongoose.model('optionPollResponses', optionPollResponses)