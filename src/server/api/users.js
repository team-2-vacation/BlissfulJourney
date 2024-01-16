const express = require("express");
const router = express.Router();
const { getUser, getAllUsers, updateUser, deleteUser } = require("../../../prisma/users");

const prisma = require("../../../prisma/client");

// ROUTE TO CREATE USERS IS IN server/auth/register

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
});

//GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await getUser(userId);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.send(user);
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

//PUT /api/users/:id
router.put("/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id);
  const { email, username, password, firstName, lastName } = req.body;

 //will eventually add logic here to ensure that user making these changes is authorized to do so
  //i.e. is the owner of the account or an admin


  try {  
      const updatedUser = await updateUser(userId, email, username, password, firstName, lastName)
      res.json(updatedUser)
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE /api/users/:id
router.delete("/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id);

  //checks to see if user exists
  const existingUser = getUser(userId)
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" })
  }

  //will eventually add logic here to ensure that user making these changes is authorized to do so
  //i.e. is the owner of the account or an admin

  try {
      const deletedUser = await deleteUser(userId)
      res.json(deletedUser);
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;