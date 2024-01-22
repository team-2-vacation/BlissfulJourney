const express = require("express");
const router = express.Router();
const { getUserInterest, getAllUserInterests, createUserInterest } = require("../../../prisma/user_interest")

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



module.exports = router;