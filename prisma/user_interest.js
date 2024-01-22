const prisma = require("./client")

const getAllUserInterests = async() => {
  const allUserInterests = await prisma.user_Interest.findMany()
  return allUserInterests
}

const createUserInterest = async( userId, interestId ) => {
  const userInterest = await prisma.user_Interest.create({
    data: {
      userId,
      interestId
    }
  })
  return userInterest
}

const getUserInterest = async( userId, interestId ) => {
  existingJoin = await prisma.user_Interest.findFirst({
    where: {
      AND: [
        { userId },
        { interestId },
      ],
    },
  });
  return existingJoin
}


module.exports = { getUserInterest, createUserInterest, getAllUserInterests }