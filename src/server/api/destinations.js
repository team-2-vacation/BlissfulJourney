const express = require("express");
const router = express.Router();
const prisma = require('../../../prisma/client');
const {createDestinations, getAllDestinations} = require("../../../prisma/destinations");

//CURRENT ROUTES
// GET /api/destinations Gets all destinations 
// GET /api/destinations/:id Gets details of a specific destination
// POST /api/destinations Adds a new destination. //ADMIN ONLY
// PUT /api/destinations  Edits the details of a specific destination. //ADMIN ONLY
// DELETE /api/destinations/:id Deletes a specific destination.  //ADMIN ONLY

// GET /api/destinations Gets all destinations 
router.get("/", async (req, res, next) => {
  try {
    const allDestinations = await getAllDestinations();
    res.send(allDestinations);
  } catch (error) {
    console.error(error)
    next(error);
  } 
});

// GET /api/destinations/:id Gets details of a specific destination
router.get('/:id', async (req, res, next) => {
  const destinationId = parseInt(req.params.id);

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

// POST /api/destinations Adds a new destination. 
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

// PUT /api/destinations  Edits the details of a specific destination. //ADMIN ONLY
router.put('/:id', async (req, res, next) => {
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

// DELETE /api/destinations/:id Deletes a specific destination.  //ADMIN ONLY
router.delete('/:id', async (req, res, next) => {
  try {
    const destinationId = +req.params.id
    
    const deletedDestination = await prisma.destination.delete({
      where:{
        "id":destinationId
      },
     });
    res.send({ message: `The following destination was deleted: ${deletedDestination.name}` });
  } catch (error) {
    console.error(error)
    next(error);
  }
});

module.exports = router;


