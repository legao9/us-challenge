const mongoose = require("mongoose");
const Todos = require("./todoList");

const UserChallengeSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  challenge_id: {
    type: String,
    required: true,
  },
  todos: {
    type: [Object],
    default: []
  },
  challenge_deleted: {
    type: Boolean,
    default: false
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const UserChallenge = mongoose.model("UserChallenge", UserChallengeSchema);

module.exports = UserChallenge;
