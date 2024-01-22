const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "No token provided, NOT AUTHORIZED!" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).send({ message: "No token provided, NOT AUTHORIZED!" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid Token" });
    return;
  }
};
module.exports = verify;