const db = require("../models/db");

const transactionController = {};

// Get Transaction Controller
transactionController.getTransactions = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM transaction
    `;

    const transactions = await db.query(query);

    res.locals.transactions = transactions.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get a Transaction Controller
transactionController.getTransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM transaction
    WHERE id = ${transactionId}
    `;

    const transaction = await db.query(query);

    if (transaction.rows.length === 0) {
      throw new Error(`No transaction with id of ${transactionId} found!`);
    }

    res.locals.transaction = transaction.rows[0];

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Post a Transaction Controller
transactionController.postTransaction = async (req, res, next) => {
  try {
    const schema = ["borrower_id", "item_id", "quantity", "due", "amount"];
    const missingFields = [];
    const params = schema.reduce((arr, field) => {
      if (field in req.body) {
        arr.push(req.body[field]);
        return arr;
      } else {
        missingFields.push(field);
        return arr;
      }
    }, []);

    // Check if fields are missing
    if (missingFields.length !== 0)
      throw new Error(`Following fields are missing [${missingFields}]`);

    const query = `
      INSERT INTO transaction (borrower_id, item_id, quantity, due, amount)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const transaction = await db.query(query, params);
    res.locals.transactionId = transaction.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Patch a Transaction Controller
transactionController.patchTransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  const schema = [
    "borrower_id",
    "item_id",
    "order_date",
    "quantity",
    "due",
    "amount",
  ];

  let setValue = schema.reduce((str, field) => {
    if (field in req.body) {
      str += field + " = " + "'" + req.body[field] + "', ";
      return str;
    } else {
      return str;
    }
  }, "");

  setValue = setValue.replace(/(,\s$)/g, "");

  try {
    const query = `
    UPDATE transaction
    SET ${setValue}
    WHERE id = ${transactionId}
    RETURNING id
    `;

    const transaction = await db.query(query);

    if (transaction.rows.length === 0) {
      throw new Error(`No transaction with id of ${transactionId} found!`);
    }

    res.locals.transactionId = transaction.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Delete a Transaction Controller
transactionController.deleteTransaction = async (req, res, next) => {
  const transactionId = req.params.id;

  try {
    const query = `
    DELETE FROM transaction WHERE id = ${transactionId}
    RETURNING id
    `;

    const transaction = await db.query(query);

    if (transaction.rows.length === 0) {
      throw new Error(`No transaction with id of ${transactionId} found!`);
    }

    res.locals.transactionId = transaction.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = transactionController;
