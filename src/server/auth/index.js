const express = require("express");
const router = express.Router();
const prisma = require("../../../prisma/client")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.use("/login", require("./login"))

router.use("/register", require("./register"))

module.exports = router;