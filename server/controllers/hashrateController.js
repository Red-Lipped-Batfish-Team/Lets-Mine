const db = require("../models/db");

const hashrateController = {};

// Get Hashrate Controller
hashrateController.getHashrates = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM hashrate
    `;

    const hashrates = await db.query(query);

    res.locals.hashrates = hashrates.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get a Hashrate Controller
hashrateController.getHashrate = async (req, res, next) => {
  const hashrateId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM hashrate
    WHERE id = ${hashrateId}
    `;

    const hashrate = await db.query(query);

    if (hashrate.rows.length === 0) {
      throw new Error(`No hashrate with id of ${hashrateId} found!`);
    }

    res.locals.hashrate = hashrate.rows[0];

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = hashrateController;
