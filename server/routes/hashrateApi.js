const express = require("express");
const router = express.Router();
const {
  getHashrates,
  getHashrate,
} = require("../controllers/hashrateController");

/**
 * Hashrate REST API
 */
// Get Hashrates
router.get("/", getHashrates, (req, res) => {
  return res.status(200).json({ hashrates: res.locals.hashrates });
});

// Get a Hashrate
router.get("/:id", getHashrate, (req, res) => {
  return res.status(200).json({ hashrate: res.locals.hashrate });
});

module.exports = router;
