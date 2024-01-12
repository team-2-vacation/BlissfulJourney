const express = require("express");
const router = express.Router();
// const prisma = require("../client");

// GET /api/interests
router.get("/", async (req, res, next) => {
  res.send("Hello interests route!");
});

module.exports = router;
