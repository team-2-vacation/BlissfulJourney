const express = require("express");
const router = express.Router();
const prisma = require("../../../prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, checkUserExistance } = require("../../../prisma/users");

router.post("/", async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;

  const existingUser = await checkUserExistance(username, email)
  
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await createUser(
      email,
      username,
      hashedPassword,
      firstName,
      lastName
    );

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    )
    res.status(201).send({ token })

  } catch (error) {
    console.error(error);
  }
});
module.exports = router;