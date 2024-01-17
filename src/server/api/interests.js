const express = require("express");
const router = express.Router();
const prisma = require('../../../prisma/client');
const {createInterests, getAllInterests} = require('../../../prisma/interests');

// GET /api/interests
router.get("/", async (req, res, next) => {
  try {
      const allInterests = await getAllInterests();
      res.json(allInterests);
  } catch (error) {
      console.error("Error retrieving interests:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  const interestId = parseInt(req.params.id);

  try {
      const interest = await prisma.interest.findUnique({
          where: { id: interestId }
      });

      if (!interest) {
          return res.status(404).json({ error: "interest not found" });
      }

      res.json(interest);
  } catch (error) {
      console.error("Error retrieving interest by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/", async (req, res, next) => {
  const { name, imageURL, description } = req.body;

  try {
     
      if (!name || !imageURL || !description) {
          return res.status(400).json({ error: "Missing required data" });
      }

      
      const newInterest = await createInterests(name, imageURL, description);

      
      res.status(201).json(newInterest);
  } catch (error) {
      console.error("Error creating interest:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.patch("/:id", async (req, res, next) => {
  const interestId = parseInt(req.params.id);
  const { name, imageURL, description } = req.body;

  try {
      const updatedinterest = await prisma.interest.update({
          where: { id: interestId },
          data: {
              name,
              imageURL,
              description
          }
      });

      res.json(updatedinterest);
  } catch (error) {
      console.error("Error updating interest:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const interestId = parseInt(req.params.id);

  try {
      const deletedInterest = await prisma.interest.delete({
          where: { id: interestId }
      });

      res.json(deletedInterest);
  } catch (error) {
      console.error("Error deleting interest:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
