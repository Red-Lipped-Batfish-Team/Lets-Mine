const cron = require("node-cron");
const db = require("../models/db");

deleteSessions = async () => {
  let exp = new Date();
  exp.setDate(exp.getDate() - 1);
  exp = exp.toISOString().slice(0, 10);
  console.log(exp);
  const query = `
  DELETE FROM session WHERE expiration < '${exp}'
  RETURNING id
  `;

  const sessions = await db.query(query);

  console.log("Old sessions deleted from db..", sessions.rows);
};

module.exports = () => {
  console.log("Running cron schedule...");
  cron.schedule("0 */3 * * *", () => {
    deleteSessions();
  });
};
