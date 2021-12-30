const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  postItem,
  patchItem,
  deleteItem,
} = require("../controllers/itemController");

/**
 * Item REST API
 */
// Get Items
router.get("/", getItems, (req, res) => {
  return res.status(200).json({ items: res.locals.items });
});

// Get a Item
router.get("/:id", getItem, (req, res) => {
  return res.status(200).json({ item: res.locals.item });
});

// Post a Item
router.post("/", postItem, (req, res) => {
  return res.status(200).json({ itemId: res.locals.itemId });
});

// Patch a Item
router.patch("/:id", patchItem, (req, res) => {
  return res.status(200).json({ itemId: res.locals.itemId });
});

// Delete a Item
router.delete("/:id", deleteItem, (req, res) => {
  return res.status(200).json({ itemId: res.locals.itemId });
});

module.exports = router;
