const express = require("express");
const router = express.Router();
// const prisma = require("../client");

// GET /api/attractions
router.get("/", async (req, res, next) => {
  res.send("Hello attractions route!");
});

module.exports = router;
