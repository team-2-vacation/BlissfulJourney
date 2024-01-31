const express = require("express");
const router = express.Router();
const { getUser, getAllUsers, updateUser, deleteUser } = require("../../../prisma/users");
const prisma = require("../../../prisma/client");

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

router.get("/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id) || userId
  
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

router.patch("/:id", async (req, res, next) => {
  const userId = +(req.params.id);
  const { username, firstName, lastName, email } = req.body.data;
  try {  
      const updatedUser = await updateUser(userId, email, username, firstName, lastName)
      res.json(updatedUser)
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id);

  const existingUser = getUser(userId)
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" })
  }

  try {
      const deletedUser = await deleteUser(userId)
      res.json(deletedUser);
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;