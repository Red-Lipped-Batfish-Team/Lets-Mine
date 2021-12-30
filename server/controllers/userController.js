const db = require("../models/db");

const userController = {};

// Get Users Controller
userController.getUsers = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM users
    `;

    const users = await db.query(query);

    res.locals.users = users.rows;

    return next();
  } catch (err) {
    return next({
      log: "userController.getUsers: ERROR: /* the error while getting data from database */",
      message: {
        err: "userController.getUsers: ERROR: Check server logs for details",
      },
    });
  }
};

// Get a User Controller
userController.getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const query = `
    SELECT *
    FROM users
    WHERE id = ${userId}
    `;

    const user = await db.query(query);

    if (user.rows.length === 0) {
      throw new Error(`No user with id of ${userId} found!`);
    }

    res.locals.user = user.rows[0];

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Post a User Controller
userController.postUser = async (req, res, next) => {
  try {
    const schema = ["first_name", "last_name", "email", "password", "address"];
    const missingFields = [];
    const params = schema.reduce((arr, field) => {
      console.log(field, req.body[field]);
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
      INSERT INTO users (first_name, last_name, email, password, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const user = await db.query(query, params);
    res.locals.userId = user.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Patch a User Controller
userController.patchUser = async (req, res, next) => {
  const userId = [req.params.id];
  const schema = ["first_name", "last_name", "email", "password", "address"];

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
    UPDATE users
    SET ${setValue}
    WHERE id = ${userId}
    RETURNING id
    `;

    const user = await db.query(query);

    if (user.rows.length === 0) {
      throw new Error(`No user with id of ${userId} found!`);
    }

    res.locals.userId = user.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Delete a User Controller
userController.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const query = `
    DELETE FROM users WHERE id = ${userId}
    RETURNING id
    `;

    const user = await db.query(query);

    if (user.rows.length === 0) {
      throw new Error(`No user with id of ${userId} found!`);
    }

    res.locals.userId = user.rows[0].id;

    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = userController;
