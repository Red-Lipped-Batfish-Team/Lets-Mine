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

    /**
     * TODO: Create a session
     */
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(Math.random().toString(36), salt);

    const hashQuery = `
      INSERT INTO session (user_id, ssid, expiration)
      VALUES ($1, $2, $3)
      RETURNING ssid
    `;

    // Session expires 1 day after
    let exp = new Date();
    exp.setDate(exp.getDate() + 1);
    exp = exp.toISOString().slice(0, 10);

    const params = [userId, hash, exp];

    const session = await db.query(hashQuery, params);
    const sessionId = session.rows[0].ssid;

    if (!sessionId)
      throw new Error(`Unexpected error occured while creating a session`);

    res.locals.sessionId = sessionId;

    return next();
  } catch (err) {
    console.log(err);
    // return res.status(200).send(err.message);
  }
};

module.exports = authController;
