const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on the server ${PORT}`);
});
