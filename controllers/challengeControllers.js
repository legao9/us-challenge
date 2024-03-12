const challenge = require("../models/challenges")
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const CoinHistory = require("../models/stripePayment/CoinHistory");
const UserCoin = require("../models/stripePayment/UserCoin");
const { ObjectId } = require('mongoose').Types; 


exports.getChallengeById = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;

    const challengeData = await challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(challengeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateChallenge = async (req, res) => {
  console.log("__REQUEST___")
  try {

    const response = await challenge.findOneAndUpdate({ _id: req.body.challengeId }, { joiners: req.body.joiners }, { new: true })
    if (response) {
      res.status(200).json({ response })
      console.log(response)
    } else {
      res.status(409).send({ message: "join challenge failed" })
    }



    // console.log(response,"response")
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
    console.log(error)
  }

}

exports.updateTodoList = async (req, res) => {
  try {
    const challengeId = req.body.challengeId;
    const todoArray = JSON.parse(JSON.stringify(req.body.todoArray));
    console.log(JSON.stringify(req.body));
    const response = await challenge.findOneAndUpdate(
      { _id: challengeId },
      { todos: todoArray }
    );
    res.send({ response, status: 200 })
  } catch (e) {
    res.status(500).json({ message: "internal server error", e })
    console.log(e)
  }
}

exports.completeATodo = async (req, res) => {
  const challengeId = req.body.challengeId;
  const todoId = req.body.todoId;
  const userId = req.body.userId;

  console.log("challengeIdchallengeIdchallengeId : " + challengeId );
  console.log("todoId : " + todoId );
  console.log("userId : " + userId );
  challenge.findOneAndUpdate(
    { "_id": new ObjectId(challengeId), "todos._id": new ObjectId(todoId) },
    { $push: { "todos.$.checkedBy": userId } },
    { new: true }
  )
    .then(async updatedChallenge => {
      if (updatedChallenge) {
        console.log('Updated challenge:', updatedChallenge);
        let todoObj = await getTodoById(challengeId, todoId);
        if (todoObj.points && todoObj.points == 0) {
          res.send({ updatedChallenge, status: 200 });
          return;
        }

        let alreadyUser = await UserCoin.findOne({ user_id: userId });
        if (alreadyUser) {
          let coin = alreadyUser.coins + parseInt(todoObj.points);
          await UserCoin.findOneAndUpdate({ user_id: userId }, { coins: coin })
        } else {
          await UserCoin.create({
            user_id: userId,
            coins: todoObj.points
          })
        }
        await CoinHistory.create({
          user_id: userId,
          in: true,
          description: "You completed a Todo",
          coins: todoObj.points
        })

        res.send({ updatedChallenge, status: 200 });
      } else {
        console.log('Challenge not found');
      }
    })
    .catch(error => {
      console.error('Error updating challenge:', error);
    });

}

async function getTodoById(challengeId, todoId) {
  try {
    const challengeObj = await challenge.findOne(
      { "_id": new ObjectId(challengeId) }
    );

    if (challengeObj && challengeObj.todos && challengeObj.todos.length > 0) {
      const todo = challengeObj.todos.find(todo => todo._id.equals(new ObjectId(todoId)));
      if (todo) {
        return todo;
      } else {
        throw new Error('Todo not found');
      }
    } else {
      throw new Error('Challenge or Todo not found');
    }
  } catch (error) {
    throw error;
  }
}