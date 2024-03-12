const StripePayment = require("../models/stripePayment/StripePayment");
const SubscriptionPlan = require("../models/stripePayment/SubcriptionPlan");
const PaymentHistory = require("../models/stripePayment/PaymentHistory");
const CoinHistory = require("../models/stripePayment/CoinHistory");
const UserCoin = require("../models/stripePayment/UserCoin");
const CoinRuleForPayment = require("../models/stripePayment/CoinRuleForPayment")
const CoinRule = require("../models/stripePayment/CoinRule");
const User = require("../models/User");
const CompanySubscription = require("../models/stripePayment/CompanySubscription");
const Company = require("../models/Company");
const { now } = require("mongoose");
const stripe = require("stripe")("sk_test_Aj88eMqJMiIzbOq8XGHFQIB9", {apiVersion: "2020-08-27"});
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

exports.checkoutSession= async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${"http://localhost:3000"}/success.html`,
      cancel_url: `${"http://localhost:3000"}/cancel.html`,
    })
    res.json({ res: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
exports.addSubscriptionPlan = async (req, res) => {
  try {
    const { subscription_type, price, benefits ,coins} = req.body;

    if (subscription_type && price && benefits) {
      await SubscriptionPlan.create({
        subscription_type,
        price,
        benefits,
        coins
      });
      return res.status(200).json({
        data: "SubscriptionPlan added successfully",
        success: true,
      });
    } else {
      res.status(400).json({
        error: "Please enter detail",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.getSubscriptionPlan = async (req, res) => {
  const data = req.user;
  try {
    if (data.role_id === 0) {
      const subsPlan = await SubscriptionPlan.find({ is_deleted: false });

      return res.status(200).json({
        data: subsPlan,
        success: true,
      });
    } else if (data.role_id === 1) {
      const subsPlan = await SubscriptionPlan.find({
        is_deleted: false,
        is_active: true,
      });
      if (subsPlan) {
        return res.status(200).json({
          data: subsPlan,
          success: true,
        });
      }
    } else {
      return res.status(400).json({
        error: "SubscriptioPlan not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.paymentIntent = 
  async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  

}

exports.stripePayment = async (req, res) => {
  try {
    const cardDetails = req.body.card_details;
    const userId = req.body.user_id;
    const Amount = Number(req.body.amount);
    const Currency = req.body.currency;
    const paymentProvider = req.body.payment_provider;
    const subscriptionId = req.body.subscription_id;
    const validity = Number(req.body.validity);
    const user = await User.findById({ _id: userId });

    if (user.role_id !== 0 && user.role_id !== 1) {
      if (Amount === undefined || Amount <= 0 || !Currency) {
        return res.status({
          error: "Invalid data",
          success: false,
        });
      }

      const newCardToken = await stripe.tokens.create({
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc,
        },
      });
      if (newCardToken) {
        const options = {
          amount: Amount * 100,
          currency: Currency || "USD",
          source: newCardToken.id,
          metadata: { userId },
          description: "My First Test Charge (created for API docs)",
          shipping: {
            name: "Test Customer",
            address: {
              line1: "123 ABC Street",
              postal_code: "395005",
              city: "Surat",
              state: "CA",
              country: "US",
            },
          },
        };
        const charge = await stripe.charges.create(options);
        const paymentDetails = {
          user_id: userId,
          payment_amt: Amount,
          payment_currency: Currency,
          paymentId: charge.id,
          created_at: new Date(),
        };
        await StripePayment.create({
          user_id: userId,
          amount: Amount,
          reference_id: charge.id,
          currency: Currency,
          payment_provider: paymentProvider,
        });

        if (charge.status == "succeeded") {
            const coinRule = await CoinRuleForPayment.findOne({ rule_key: Amount});
          if (!coinRule) {
            res.status(400).json({});
          }
          const coin = coinRule.rule_value;
          const userID = user._id;
          const userCoin = await UserCoin.findOne({user_id: userID})
          if(userCoin){
            const newCoin = userCoin.coins + coin
            await UserCoin.findOneAndUpdate({user_id: userID},{coins: newCoin})
          }else{
            await UserCoin.create({
              user_id: userID,
              coins: coin,
            });
          }
          await CoinHistory.create({
            user_id: user._id,
            coins: coin,
            reference_id: charge.id,
          });
          return res.status(200).json({
            data: paymentDetails,
            success: true,
          });
        } else {
          res.status(400).json({
            error: "Payment failed ",
          });
        }
      }
    } else {
      // company payment
      if (Amount === undefined || Amount <= 0 || !Currency) {
        return res.status({
          error: "Invalid data",
          success: false,
        });
      }

      const newCardToken = await stripe.tokens.create({
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc,
        },
      });
      if (newCardToken) {
        const options = {
          amount: Amount * 100,
          currency: Currency || "USD",
          source: newCardToken.id,
          metadata: { userId },
          description: "My First Test Charge (created for API docs)",
          shipping: {
            name: "Test Customer",
            address: {
              line1: "123 ABC Street",
              postal_code: "395005",
              city: "Surat",
              state: "CA",
              country: "US",
            },
          },
        };
        const user = await User.findById({ _id: userId });
        const companyId = user.company_id[0];
        const now = new Date()
        const companySubscription = await CompanySubscription.find({company_id: companyId, is_active: true});
        if(companySubscription.length > 0){
          console.log(companySubscription);
          if(!(companySubscription[0].subscription_type === "free" || companySubscription[0].subscription_endDate < now)){
            return res.status(400).json({
              error: "You already have active subscriptionPlan",
              success: false
            })
          }
        }
        const subsPlan = await SubscriptionPlan.findByIdAndUpdate({_id: subscriptionId})
        const coins = subsPlan.coins
        const price = subsPlan.price;
        const month = price.monthly;
        const year = price.annually;
        const subsYear = Math.floor(validity / 12);
        const subsMonth = validity % 12;
        const yearPrice = subsYear * year.price;
        const monthPrice = subsMonth * month.price;
        const totalPrice = yearPrice + monthPrice;

        if (totalPrice !== Amount) {
          return res.status(400).json({
            error: "Amount is not valid",
            success: false,
          });
        }
        if (subsPlan) {
          const charge = await stripe.charges.create(options);
          const paymentDetails = {
            user_id: userId,
            payment_amt: Amount,
            payment_currency: Currency,
            payment_id: charge.id,
            created_at: new Date(),
          };

          await StripePayment.create({
            user_id: userId,
            amount: Amount,
            reference_id: charge.id,
            currency: Currency,
            payment_provider: paymentProvider,
          });

          const subsStartDate = new Date();
          const subEndDate = new Date(
            subsStartDate.setMonth(subsStartDate.getMonth() + validity)
          );
          if (charge.status == "succeeded") {
            await CompanySubscription.create({
              company_id: companyId,
              coins: coins,
              subscription_id: subscriptionId,
              subscription_type: subsPlan.subscription_type,
              subscription_startDate: new Date(),
              subscription_endDate: subEndDate,
              price: subsPlan.price,
              benefits: subsPlan.benefits,
              created_at: new Date(),
              is_active: true,
              is_deleted: false,
            });
            await Company.findByIdAndUpdate(companyId,{subscription_type: subsPlan.subscription_type , is_subscription: true})
            await User.findByIdAndUpdate(userId,{subscription_active: true})
            await PaymentHistory.create({
              payment_id: charge.id,
              company_id: companyId,
              amount: Amount,
            });
            res.status(200).json({
              data: paymentDetails,
              success: true,
            });
          } else {
            res.status(400).json({
              error: "Payment failed ",
            });
          }
        } else {
          res.status(400).json({
            errror: "SubscriptionPlan not found",
            success: false,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.activateAndDeActivatePlan = async (req, res) => {
  const data = req.user;
  try {
    if (data.role_id === 0) {
      const _id = req.params.id;
      if (!_id) {
        return res.status(400).json({
          error: "Please enter id",
          success: false,
        });
      }
      const activated = req.body.is_active;

      if (activated === true) {
        const plan = await SubscriptionPlan.find({
          is_deleted: false,
          is_active: true,
        });
        if (plan.length > 3) {
          return res.status(400).json({
            error: "You can't activate more than four plan",
            success: false,
          });
        }
        const subsPlan = await SubscriptionPlan.findByIdAndUpdate(_id, {is_active: true});
        if (!subsPlan) {
          return res.status(400).json({
            error: "SubscriptionPlan not found",
            success: false,
          });
        }
        return res.status(200).json({
          data: "SubscriptionPlan activated successfully",
          success: true,
        });
      } else if (activated === false) {
        const subsPlan = await SubscriptionPlan.findByIdAndUpdate(_id, {is_active: false});
        if (!subsPlan) {
          return res.status(400).json({
            error: "SubscriptionPlan not found",
            success: false,
          });
        }
        return res.status(200).json({
          data: "SubscriptionPlan De-activated successfully",
          success: true,
        });
      } else {
        return res.status(400).json({
          error: "Please enter details",
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        error: "Access denied",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.deleted = async (req, res) => {
  const data = req.user;
  try {
    if (data.role_id === 0) {
      const _id = req.params.id;
      if (!_id) {
        return res.status(400).json({
          error: "Please enter id",
          success: false,
        });
      }
      const subsPlan = await SubscriptionPlan.findByIdAndUpdate(_id, {is_deleted: true});
      if (subsPlan) {
        return res.status(200).json({
          data: "SubscriptionPlan deleted successfully",
          success: true,
        });
      } else {
        res.status(400).json({
          error: "SubscriptionPlan not found",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        error: "Access denied",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.updateSubscriptionPlan = async (req, res) => {
  const data = req.user;
  try {
    if (data.role_id === 0) {
      const _id = req.params.id;
      if (!_id) {
        return res.status(400).json({
          error: "Please enter id",
          success: false,
        });
      }
      if (!req.body) {
        return res.status(400).json({
          error: "Please enter details",
          success: false,
        });
      }
      const subsPlan = await SubscriptionPlan.findByIdAndUpdate(_id, req.body);
      if (subsPlan) {
        return res.status(200).json({
          data: "SubscriptionPlan updated successfully",
          success: true,
        });
      } else {
        return res.status(400).json({
          error: "SubscriptionPlan not found",
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        error: "Access denied",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.addCoinRuleForPayment = async (req, res) => {
  try {
    try {
      const coin = new CoinRuleForPayment(req.body);
      await coin.save();
      if (coin) {
        return res.status(200).json({
          data: "Coin added successfully",
          success: true,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
}

exports.addCoinRule = async (req, res) => {
  try {
    const coin = new CoinRule(req.body);
    await coin.save();
    if (coin) {
      return res.status(200).json({
        data: "Coin added successfully",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};

exports.getUserCoin = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const userCoin = await UserCoin.findOne({ user_id: userId });

      const coin = userCoin.coins;
      if (coin) {
        return res.status(200).json({
          data: coin,
          success: true,
        });
      } else {
        return res.status(400).json({
          error: "Coin not found of this user",
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        errror: "Please enter id",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false
    })
  }
};

exports.getActivePlan = async (req, res) => {
  try {
    const companyId = req.params.id
    if(companyId){
      const active = await Company.findById(companyId)
      const userId = active.admin_id
      if(active.is_subscription === true){
        const companySubscription = await CompanySubscription.find({$and: [{company_id: companyId},{is_active: true ,is_deleted: false}]})
        const subsEndDate = companySubscription[companySubscription.length-1].subscription_endDate

        const now  = new Date()
        if(subsEndDate <= now){
          await Company.findByIdAndUpdate(companyId,{is_subscription: false,subscription_type: "free"})
          await CompanySubscription.findOneAndUpdate({company_id: companyId},{is_active: false, is_deleted:true})
          await User.findOneAndUpdate({_id: userId},{subscription_active: false})
          return res.status(200).json({
            data: "your subscriptionPlan is expire",
            success: true
          })
        }else{
        return res.status(200).json({
          data: companySubscription[companySubscription.length-1],
          success: true
        })
      }
    }else{
      res.status(400).json({
        error: "CompanySubscription is not active",
        success: false
      })
    }
    }else{
      res.status(400).json({
        error: "Please enter id",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
        error: error.message,
        success: false
      })
  }
}
