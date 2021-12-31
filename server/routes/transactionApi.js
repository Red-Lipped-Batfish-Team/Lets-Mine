const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  postTransaction,
  patchTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

/**
 * Transaction REST API
 */
// Get Transactions
router.get("/", getTransactions, (req, res) => {
  return res.status(200).json({ transactions: res.locals.transactions });
});

// Get a Transaction
router.get("/:id", getTransaction, (req, res) => {
  return res.status(200).json({ transaction: res.locals.transaction });
});

// Post a Transaction
router.post("/", postTransaction, (req, res) => {
  return res.status(200).json({ transactionId: res.locals.transactionId });
});

// Patch a Transaction
router.patch("/:id", patchTransaction, (req, res) => {
  return res.status(200).json({ transactionId: res.locals.transactionId });
});

// Delete a Transaction
router.delete("/:id", deleteTransaction, (req, res) => {
  return res.status(200).json({ transactionId: res.locals.transactionId });
});

module.exports = router;
