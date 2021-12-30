const express = require("express");
const router = express.Router();
const { getCoins, getCoin } = require("../controllers/coinController");

/**
 * Coin REST API
 */
// Get Coins
router.get("/", getCoins, (req, res) => {
  return res.status(200).json({ coins: res.locals.coins });
});

// Get a Coin
router.get("/:id", getCoin, (req, res) => {
  return res.status(200).json({ coin: res.locals.coin });
});

module.exports = router;
