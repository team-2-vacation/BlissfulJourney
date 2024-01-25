const express = require("express");
const router = express.Router();
const { getUserInterest, getAllUserInterests, createUserInterest, getInterestsByUser } = require("../../../prisma/user_interest")

// /api/users_interests/

router.get("/", async (req, res, next) => {
  try {
    const allUserInterests = await getAllUserInterests();
    res.send(allUserInterests);
  } catch (error) {
    console.error(error)
    next(error);
  } 
});

router.post("/", async (req, res, next) => {
  const { userId, interestId } = req.body;
  try {
    const newEntry = await createUserInterest(userId, interestId)
    res.status(201).send(newEntry);
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// GET all user interests for a specific user
router.get("/:userId", async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  try {
    const userInterests = await getInterestsByUser(userId);
    // console.log('User Interests:', userInterests)
    res.send(userInterests);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;