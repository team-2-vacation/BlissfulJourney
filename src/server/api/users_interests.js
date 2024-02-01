const express = require("express");
const router = express.Router();
const {
  getUserInterest,
  getAllUserInterests,
  createUserInterest,
  getInterestsByUser,
  deleteUserInterest,
} = require("../../../prisma/user_interest");
const prisma = require(`../../../prisma/client`)

router.get("/", async (req, res, next) => {
  try {
    const allUserInterests = await getAllUserInterests();
    res.send(allUserInterests);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { userId, interestId } = req.body;
  try {
    const newEntry = await createUserInterest(userId, interestId);
    res.status(201).send(newEntry);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  try {
    const userInterests = await getInterestsByUser(userId);
    res.send(userInterests);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  const { userId, interestId } = req.body;
  try {
    const deletedUserInterest = await deleteUserInterest(userId, interestId)
    res.send({message: "Interest successfully removed from wishlist."})
    return deletedUserInterest;
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;