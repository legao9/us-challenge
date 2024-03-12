
const UserCoin = require("../models/stripePayment/UserCoin");

exports.getUsercoin = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const userCoin = await UserCoin.findOne({ user_id: userId });

  
      if (!userCoin) {
        return res.status(404).json({ message: 'coin not found' });
      }
  
      res.json(userCoin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };