require("dotenv").config();
const db = require("../models/db");
const stripeAPI = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const cartController = {};

// Get Cart Controller
cartController.getCarts = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM cart
    `;

    const carts = await db.query(query);

    res.locals.carts = carts.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get a Cart Controller
cartController.getCart = async (req, res, next) => {
  const cartId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM cart
    WHERE id = ${cartId}
    `;

    const cart = await db.query(query);

    if (cart.rows.length === 0) {
      throw new Error(`No cart with id of ${cartId} found!`);
    }

    res.locals.cart = cart.rows[0];

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Get User Carts Controller
cartController.getUserCart = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const getQuery = `
    SELECT c.*, i.model
    FROM cart c
    JOIN item i
    ON c.item_id = i.id
    WHERE c.borrower_id = ${userId}
    `;
    const cart = await db.query(getQuery);

    res.locals.userCart = cart.rows;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Post a Cart Controller
cartController.postCart = async (req, res, next) => {
  console.log(req.body);
  try {
    const schema = [
      "borrower_id",
      "item_id",
      "quantity",
      "rental_duration",
      "amount",
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
      INSERT INTO cart (borrower_id, item_id, quantity, rental_duration, amount)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const cart = await db.query(query, params);
    res.locals.cartId = cart.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Patch a Cart Controller
cartController.patchCart = async (req, res, next) => {
  const cartId = req.params.id;
  const schema = [
    "borrower_id",
    "item_id",
    "quantity",
    "rental_duration",
    "amount",
    "expired",
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
    UPDATE cart
    SET ${setValue}
    WHERE id = ${cartId}
    RETURNING id
    `;

    const cart = await db.query(query);

    if (cart.rows.length === 0) {
      throw new Error(`No cart with id of ${cartId} found!`);
    }

    res.locals.cartId = cart.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Delete a Cart Controller
cartController.deleteCart = async (req, res, next) => {
  const cartId = req.params.id;

  try {
    const query = `
    DELETE FROM cart WHERE id = ${cartId}
    RETURNING id
    `;

    const cart = await db.query(query);

    if (cart.rows.length === 0) {
      throw new Error(`No cart with id of ${cartId} found!`);
    }

    res.locals.cartId = cart.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Delete a Cart Controller
cartController.deleteUserCart = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const getQuery = `
    SELECT * FROM cart WHERE borrower_id = ${userId}
    `;
    const response = await db.query(getQuery);
    const ids = response.rows.map((cart) => {
      return cart.id;
    });

    const deletedCarts = [];
    for await (const id of ids) {
      const deleteQuery = `
        DELETE FROM cart WHERE id = ${id}
        RETURNING id
        `;

      const cart = await db.query(deleteQuery);

      if (cart.rows.length === 0) {
        throw new Error(`No cart with id of ${id} found!`);
      }

      deletedCarts.push(id);
    }

    res.locals.deletedCarts = deletedCarts;
    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

cartController.checkoutCart = async (req, res, next) => {
  const domainURL = process.env.WEB_APP_URL;
  const { line_items, customer_email, cartId } = req.body;
  console.log(req.body);
  //check req.body
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing required stripe session params" });
  }
  let session;

  try {
    console.log(cartId);
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      client_reference_id: cartId,
      success_url: `${domainURL}/success`,
      cancel_url: `${domainURL}/canceled`,
    });
    res.locals.sessionId = session.id;
    return next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "chekout cart middleware error" });
  }
};
module.exports = cartController;
