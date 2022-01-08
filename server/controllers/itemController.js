const db = require("../models/db");

const itemController = {};

// Get Item Controller
itemController.getItems = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM item
    `;

    const items = await db.query(query);

    res.locals.items = items.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get a Item Controller
itemController.getItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM item
    WHERE id = ${itemId}
    `;

    const item = await db.query(query);

    if (item.rows.length === 0) {
      throw new Error(`No item with id of ${itemId} found!`);
    }

    res.locals.item = item.rows[0];

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get a User Items Controller
itemController.getUserItem = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const query = `
    SELECT *
    FROM item
    WHERE lender_id = ${userId}
    `;

    const userItem = await db.query(query);

    res.locals.userItem = userItem.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Post a Item Controller
itemController.postItem = async (req, res, next) => {
  try {
    const schema = [
      "lender_id",
      "hashrate_id",
      "model",
      "quantity",
      "duration",
    ];
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
      INSERT INTO item (lender_id, hashrate_id, model, quantity, duration)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const item = await db.query(query, params);
    res.locals.itemId = item.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Patch a Item Controller
itemController.patchItem = async (req, res, next) => {
  const itemId = req.params.id;
  const schema = ["lender_id", "hashrate_id", "model", "quantity", "duration"];

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
    UPDATE item
    SET ${setValue}
    WHERE id = ${itemId}
    RETURNING id
    `;

    const item = await db.query(query);

    if (item.rows.length === 0) {
      throw new Error(`No item with id of ${itemId} found!`);
    }

    res.locals.itemId = item.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Patch With a Transaction Item Controller
itemController.patchWithTransaction = async (req, res, next) => {
  const itemId = req.body.item_id;
  const schema = ["lender_id", "hashrate_id", "model"];
  const newQuanity =
    res.locals.quantityAvailable.rows[0].quantity - req.body.quantity;

  let setValue = schema.reduce((str, field) => {
    if (field in req.body) {
      str += field + " = " + "'" + req.body[field] + "', ";
      return str;
    } else {
      return str;
    }
  }, "");

  // Add adjusted quantity to setValue
  setValue += `quantity = '${newQuanity}', `;

  setValue = setValue.replace(/(,\s$)/g, "");

  try {
    const query = `
    UPDATE item
    SET ${setValue}
    WHERE id = ${itemId}
    RETURNING id
    `;

    const item = await db.query(query);

    if (item.rows.length === 0) {
      throw new Error(`No item with id of ${itemId} found!`);
    }

    res.locals.itemId = item.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Delete a Item Controller
itemController.deleteItem = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const query = `
    DELETE FROM item WHERE id = ${itemId}
    RETURNING id
    `;

    const item = await db.query(query);

    if (item.rows.length === 0) {
      throw new Error(`No item with id of ${itemId} found!`);
    }

    res.locals.itemId = item.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = itemController;
