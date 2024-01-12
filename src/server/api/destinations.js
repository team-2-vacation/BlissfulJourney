const express = require("express");
const router = express.Router();
// const prisma = require("../client");

// GET /api/destinations

router.get("/", async (req, res, next) => {
  res.send("Hello destinations route!");
});

module.exports = router;
