const express = require("express");
const ViteExpress = require("vite-express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);