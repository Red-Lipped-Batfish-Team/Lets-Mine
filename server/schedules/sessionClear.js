const cron = require("node-cron");

module.exports = () => {
  console.log("Running cron schedule...");
  cron.schedule("* * * * *", () => {
    console.log("Every mintue task!");
  });
};
