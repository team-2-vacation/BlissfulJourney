const prisma = require("./client");

const createInterests = async (name, description, imageURL) => {
  const interest = await prisma.interest.create({
    data: {
      name,
      description,
      imageURL,
    },
  });
  return interest
};

const getAllInterests = async () => {
  const allInterests = await prisma.interest.findMany();
  return allInterests;
};

const getInterest = async (id) => {
  const interest = await prisma.interest.findUnique({
    where: { id },
  });
  return interest;
};

const deleteInterest = async (id) => {
  const deletedInterest = await prisma.interest.delete({
    where: { id },
  });
  return deletedInterest;
};

module.exports = { createInterests, getAllInterests, getInterest, deleteInterest };
