const db = require("../models/db");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const authController = {};

// Authenticate a User Controller
authController.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userQuery = `
    SELECT *
    FROM users
    WHERE email = '${email}' AND password = '${password}'
    `;

    const user = await db.query(userQuery);

    if (user.rows.length === 0) {
      throw new Error(`Incorrect email or password provided`);
    }
    const userId = user.rows[0].id;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(Math.random().toString(36), salt);

    const hashQuery = `
      INSERT INTO session (user_id, ssid)
      VALUES ($1, $2)
      RETURNING ssid
    `;

    const params = [userId, hash];

    const session = await db.query(hashQuery, params);
    const sessionId = session.rows[0].ssid;

    if (!sessionId)
      throw new Error(`Unexpected error occured while creating a session`);

    res.locals.sessionId = sessionId;

    return next();
  } catch (err) {
    return res.status(200).send(err.message);
  }
};

module.exports = authController;
