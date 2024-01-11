const express = require("express");
const ViteExpress = require("vite-express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("Hello World");
});


app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
