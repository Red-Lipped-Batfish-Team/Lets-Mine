require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const {
  createCheckoutSession,
} = require("../controllers/stripeController");

/**
 * Stripe Checkout
 */

// Get All Carts
router.post("/create-checkout-session", createCheckoutSession, (req, res) => {
    return res.status(200).json({ carts: res.locals.carts });
  });



module.exports = router;