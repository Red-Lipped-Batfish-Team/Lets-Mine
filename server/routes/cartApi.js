const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCart,
  getUserCart,
  postCart,
  patchCart,
  deleteCart,
  deleteUserCart,
  checkoutCart,
} = require("../controllers/cartController");

/**
 * Cart REST API
 */
// Get All Carts
router.get("/", getCarts, (req, res) => {
  return res.status(200).json({ carts: res.locals.carts });
});

// Get a Cart
router.get("/:id", getCart, (req, res) => {
  return res.status(200).json({ cart: res.locals.cart });
});

// Get User's Cart
router.get("/user/:id", getUserCart, (req, res) => {
  console.log("hi");
  return res.status(200).json({ userCart: res.locals.userCart });
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

// Delete User's cart items
router.delete("/user/:id", deleteUserCart, (req, res) => {
  return res.status(200).json({ deletedCarts: res.locals.deletedCarts });
});

//checkout cart route
router.post("/checkout", checkoutCart, (req, res) => {
  return res.status(200).json({ sessionId: res.locals.sessionId });
});

module.exports = router;
