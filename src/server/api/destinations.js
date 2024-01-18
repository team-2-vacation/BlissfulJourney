const express = require("express");
const router = express.Router();
const prisma = require('../../../prisma/client');
const {createDestinations, getAllDestinations} = require("../../../prisma/destinations");

router.get("/", async (req, res, next) => {
  try {
    const allDestinations = await getAllDestinations();
    res.send(allDestinations);
  } catch (error) {
    console.error(error)
    next(error);
  } 
});

router.get('/:id', async (req, res, next) => {
  const destinationId = +req.params.id;

  try {
     const singleDestination= await prisma.destination.findUnique({
      where: {
        id: destinationId,
      }
     });
    res.send(singleDestination);
  } catch (error) {
    console.error(error)
    next(error);
  }
});
 
router.post('/', async (req, res, next) => {
  const { name, country, description, time_to_visit, average_cost, imageURL, currency, language } = req.body;
  try {
    const newDestination = await createDestinations(name, country, description, time_to_visit, average_cost, imageURL, currency, language);
    res.status(201).send(newDestination);
  } catch (error) {
    console.error(error)
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const destinationId = +req.params.id
    const postBody = req.body

    const updateDestination = await prisma.destination.update({
      where:{
        "id":destinationId
      },
      data:postBody,
     });
    res.send(updateDestination);
  } catch (error) {
    console.error(error)
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const destinationId = +req.params.id
    
    const attractions = await prisma.attraction.findMany({
      where: {
        destinationId: destinationId
      }
    });
    if (attractions.length > 0) {
      res.status(400).send({ message: "Deletion not allowed: Destination is referenced in Attraction." });
    } else {
      const deletedDestination = await prisma.destination.delete({
        where:{
          "id":destinationId
        },
       });
      res.send({ message: `The following destination was deleted: ${deletedDestination.name}` });

    }
  } catch (error) {
    console.error(error)
    next(error);
  }
});

module.exports = router;