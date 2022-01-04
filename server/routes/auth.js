const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  validateSession,
} = require("../controllers/authController");

/**
 * Authenticate a User
 */
// Password
router.post("/", authenticateUser, (req, res) => {
  return res.status(200).json({ token: res.locals.token });
});

router.post("/session", validateSession, (req, res) => {
  return res.status(200).json({ userId: res.locals.userId });
});

module.exports = router;
