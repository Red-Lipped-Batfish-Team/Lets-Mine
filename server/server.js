require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userApiRouter = require("./routes/userApi");
const transactionApiRouter = require("./routes/transactionApi");
const cartApiRouter = require("./routes/cartApi");
const itemApiRouter = require("./routes/itemApi");
const hashrateApiRouter = require("./routes/hashrateApi");
const coinApiRouter = require("./routes/coinApi");
const authRouter = require("./routes/auth");
const sessionClear = require("./schedules/sessionClear");
const updateCoinDb = require("./schedules/updateCoin");

const PORT = process.env.PORT || 3000;



/**
 * Middlewares
 */
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Cookie Parser
app.use(cookieParser());

/**
 * REST API Router
 */
app.use("/api/users", userApiRouter);
app.use("/api/transactions", transactionApiRouter);
app.use("/api/carts", cartApiRouter);
app.use("/api/items", itemApiRouter);
app.use("/api/hashrates", hashrateApiRouter);
app.use("/api/coins", coinApiRouter);
app.use("/auth", authRouter);

/**
 * Recurring cron schedules
 */
sessionClear();
updateCoinDb();

// Statically serve everything in the build folder on the route '/public'
if (process.env.NODE_ENV === "production") {
  app.use("/public", express.static(path.join(__dirname, "../public")));
  
  // Serve index.html on the route '/'
  app.use("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../public/index.html"));
    
  });
}

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(
    `Server is running on the server ${PORT}`
  );
});
