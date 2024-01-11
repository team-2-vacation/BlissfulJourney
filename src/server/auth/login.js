const express = require("express");
const router = express.Router();
const prisma = require("../client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// /auth/login
router.post("/", (req, res, next))
