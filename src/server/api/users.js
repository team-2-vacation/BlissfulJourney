const express = require("express");
const router = express.Router();
const prisma = require("../client");

// GET /api/users
router.get("/", async (req, res, next) => {
  res.send("Hello user route!");
});

module.exports = router;
