const express = require("express")
const stripePaymentController = require("../controllers/stripePaymentController")
// const checkSuperAdminToken = require("../middlewares/checkSuperAdminToken")
// const chekSuperAdminAndAdminToken = require("../middlewares/chekSuperAdminAndAdminToken")
const router = express.Router()

router.post('/create-payment-intent',stripePaymentController.paymentIntent)
router.post('/create-checkout-session',stripePaymentController.checkoutSession)

// router.route("/addSubscriptionPlan").post(checkSuperAdminToken,stripePaymentController.addSubscriptionPlan)
// router.route("/getSubscriptionPlan").get(chekSuperAdminAndAdminToken,stripePaymentController.getSubscriptionPlan)
// router.route("/getActivePlan/:id").get(stripePaymentController.getActivePlan)
router.route("/stripePayment").post(stripePaymentController.stripePayment)
// router.route("/subscriptionPlanActivateDeactivate/:id").post(checkSuperAdminToken,stripePaymentController.activateAndDeActivatePlan)
// router.route("/deletedSubscriptionPlan/:id").post(checkSuperAdminToken,stripePaymentController.deleted)
// router.route("/updateSubscriptionPlan/:id").post(checkSuperAdminToken,stripePaymentController.updateSubscriptionPlan)
// router.route("/addCoinRule").post(stripePaymentController.addCoinRule)
// router.route("/addCoinRuleForPayment").post(stripePaymentController.addCoinRuleForPayment)
// router.route("/getCoin/:id").get(stripePaymentController.getUserCoin)

module.exports = router
