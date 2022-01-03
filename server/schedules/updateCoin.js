const axios = require("axios");
const db = require("../models/db");
const cron = require("node-cron");

if (process.env.NODE_ENV === "development") {
  const dotenv = require("dotenv");
  dotenv.config();
}

/**
 *
 * @param {number} coinPrice - latest bitcoin price
 */
const patchCoinPrice = async (coinPrice) => {
  const query = `
  UPDATE coin
  SET price = '${coinPrice}'
  WHERE name = 'Bitcoin'
  RETURNING id
  `;

  const coins = await db.query(query);

  console.log("Coin prices are updated for id ", coins.rows);
};

/**
 *
 * @param {number} prodRate - production rate per day
 * @param {number} rentalRate - rental price per day
 */
const patchRentalPrice = async (hashrateId, prodRate, rentalRate) => {
  const query = `
  UPDATE coin
  SET production_rate = '${prodRate}', rental_price = '${rentalRate}'
  WHERE id = '${hashrateId}'
  RETURNING id
  `;

  try {
    const coins = await db.query(query);

    console.log(
      `Rental price for hashrate_id = ${hashrateId} updated`,
      coins.rows
    );
  } catch (e) {
    console.log(e.message);
  }
};

/**
 *
 * @param {number} hashrate - in TH/s
 * @param {number} difficulty
 * @param {number} blockReward
 * @returns
 */
const prodRateCalc = (hashrate, difficulty, blockReward) => {
  const secondsPerDay = 86400;
  const multiplier = 2 ** 32;
  const hashRateInByte = hashrate * 1000 ** 4;
  return (
    (blockReward * hashRateInByte * secondsPerDay) / (difficulty * multiplier)
  );
};

const updateCoinDb = async () => {
  const HASHRATE_API_KEY = process.env.HASHRATE_API_KEY;
  const HASHRATE_API_URL = `http://www.coinwarz.com/v1/api/profitability/?apikey=${HASHRATE_API_KEY}&algo=sha-256`;

  // api call to get coin data
  const res = await axios.get(HASHRATE_API_URL);

  const bitcoinData = res.data.Data.filter(
    (coin) => coin.CoinName === "Bitcoin"
  )[0];

  const bitcoinPrice = bitcoinData.ExchangeRate;

  // Update bitcoin price in db
  await patchCoinPrice(bitcoinPrice);

  // Calculate profit and selling price
  const difficulty = bitcoinData.Difficulty;
  const blockReward = bitcoinData.BlockReward;

  const query = `
    SELECT *
    FROM hashrate
    `;

  const hashrateRes = await db.query(query);

  for await (const data of hashrateRes.rows) {
    const hashrateId = data.id;
    const tier = data.hashrate_tier;
    const lowerBound = tier.match(/\d+/g)[0];
    const upperBound = tier.match(/\d+/g)[1];
    const avgHashrate = (Number(lowerBound) + Number(upperBound)) / 2;
    const lenderProfitRate = 0.7;

    const prodRate = prodRateCalc(avgHashrate, difficulty, blockReward);
    const rentalRate = prodRate * bitcoinPrice * lenderProfitRate;

    // Update production rate and rental price
    await patchRentalPrice(hashrateId, prodRate, rentalRate);
  }
};

module.exports = () => {
  console.log("Running cron schedule to update Coin DB...");
  cron.schedule("0 22 * * *", () => {
    updateCoinDb();
  });
};
