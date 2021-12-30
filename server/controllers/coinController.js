const db = require("../models/db");

const coinController = {};

// Get Coin Controller
coinController.getCoins = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM coin
    `;

    const coins = await db.query(query);

    res.locals.coins = coins.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get a Coin Controller
coinController.getCoin = async (req, res, next) => {
  const coinId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM coin
    WHERE id = ${coinId}
    `;

    const coin = await db.query(query);

    if (coin.rows.length === 0) {
      throw new Error(`No coin with id of ${coinId} found!`);
    }

    res.locals.coin = coin.rows[0];

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = coinController;
