const express = require("express");
const prisma = require('../../../prisma/client');
const router = express.Router();
const {createAttractions, getAllAttractions} = require("../../../prisma/attractions");

router.get("/", async (req, res, next) => {
  try {
      const allAttractions = await getAllAttractions();
      res.json(allAttractions);
  } catch (error) {
      console.error("Error retrieving attractions:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  const attractionId = parseInt(req.params.id);

  try {
      const attraction = await prisma.attraction.findUnique({
          where: { id: attractionId }
      });

      if (!attraction) {
          return res.status(404).json({ error: "attraction not found" });
      }

      res.json(attraction);
  } catch (error) {
      console.error("Error retrieving attraction by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/", async (req, res, next) => {
  const { name, imageURL, destinationId } = req.body;

  try {
     
      if (!name || !imageURL || !destinationId) {
          return res.status(400).json({ error: "Missing required data" });
      }

      
      const newAttraction = await createAttractions(name, imageURL, destinationId);

      
      res.status(201).json(newAttraction);
  } catch (error) {
      console.error("Error creating attraction:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.patch("/:id", async (req, res, next) => {
  const attractionId = parseInt(req.params.id);
  const { name, imageURL, destinationId } = req.body;

  try {
    
      if (!name || !imageURL || !destinationId) {
          return res.status(400).json({ error: "Missing required data" });
      }

   
      const updatedAttraction = await prisma.attraction.update({
          where: { id: attractionId },
          data: {
              name,
              imageURL,
              destinationId
          }
      });

      res.json(updatedAttraction);
  } catch (error) {
      console.error("Error updating attraction:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const attractionId = parseInt(req.params.id);

  try {
      const deletedAttraction = await prisma.attraction.delete({
          where: { id: attractionId }
      });

      res.json(deletedAttraction);
  } catch (error) {
      console.error("Error deleting attraction:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
