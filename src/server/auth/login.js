const express = require("express");
const router = express.Router();
const prisma = require("../../../prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getAllUsers } = require("../../../prisma/users");
require("dotenv").config();

// /auth/login
router.post("/", async(req, res, next) => {
    const { identifier , password } = req.body

    if(!identifier || !password){
        return res.status(401).send('Invalid username or password');
    }
   try {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
            {username: identifier},
            {email: identifier}
        ]}
    })

    if (!user) {
        return res.status(401).send('Invalid username or password');
      }

    const validUser = await bcrypt.compare(password, user.password)

    if (!validUser){
        return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign(
    { id: user.id, username: user.username }, 
    process.env.JWT_SECRET)
    res.status(200).send({ message: "Login Sucessful", token, admin: user.isAdmin });
    
   } 
   catch (error) {
        console.log(error)
   }

});

module.exports = router;
