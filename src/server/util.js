const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  const bearer = req.headers.authorization;
  console.log(bearer);
  console.log(process.env.JWT_SECRET);

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
    // console.log("req", req);
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid Token" });
    return;
  }
};
module.exports = { verify };
