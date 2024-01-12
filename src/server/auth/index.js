const express = require("express");
const router = express.Router();
// const prisma = require("../../../prisma/client")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// /auth/login
router.use("/login", require("./login"))

// /auth/register
router.use("/register", require("./register"))

// /auth/login
// router.use("/login", require("./login"));

// /auth/register
router.use("/register", require("./register"));

module.exports = router;
