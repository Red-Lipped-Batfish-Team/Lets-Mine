const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controllers/authController");

/**
 * Authenticate a User
 * TODO: autheticate a user credential in db and create a session
 */
// Password
router.post("/", authenticateUser, (req, res) => {
  return res.status(200).json({ sessionId: res.locals.sessionId });
});

module.exports = router;
