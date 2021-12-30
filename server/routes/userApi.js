const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

/**
 * User REST API
 */
// Get Users
router.get("/", getUsers, (req, res) => {
  return res.status(200).json({ users: res.locals.users });
});

// Get a User
router.get("/:id", getUser, (req, res) => {
  return res.status(200).json({ user: res.locals.user });
});

// Post a User
router.post("/", postUser, (req, res) => {
  return res.status(200).json({ userId: res.locals.userId });
});

// Patch a User
router.patch("/:id", patchUser, (req, res) => {
  return res.status(200).json({ userId: res.locals.userId });
});

// Delete a User
router.delete("/:id", deleteUser, (req, res) => {
  return res.status(200).json({ userId: res.locals.userId });
});

module.exports = router;
