const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCart,
  postCart,
  patchCart,
  deleteCart,
} = require("../controllers/cartController");

/**
 * Cart REST API
 */
// Get Carts
router.get("/", getCarts, (req, res) => {
  return res.status(200).json({ carts: res.locals.carts });
});

// Get a Cart
router.get("/:id", getCart, (req, res) => {
  return res.status(200).json({ cart: res.locals.cart });
});

// Post a Cart
router.post("/", postCart, (req, res) => {
  return res.status(200).json({ cartId: res.locals.cartId });
});

// Patch a Cart
router.patch("/:id", patchCart, (req, res) => {
  return res.status(200).json({ cartId: res.locals.cartId });
});

// Delete a Cart
router.delete("/:id", deleteCart, (req, res) => {
  return res.status(200).json({ cartId: res.locals.cartId });
});

module.exports = router;
