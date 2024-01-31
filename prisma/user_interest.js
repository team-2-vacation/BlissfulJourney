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
const getInterestsByUser = async( userId ) => {
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {
        interests: {
          include: {
            Interest: true,

          }
        }
      }
    })
    const interests = user.interests
    return interests
  } catch (error) {
    console.error('Error fetching user interests:', error)
  }
}

const deleteUserInterest = async( userId, interestId ) => {
  try {
    const deletedUserInterest = await prisma.user_Interest.delete({
      where: {
        userId_interestId: {
          userId,
          interestId,
        },
      },
    });
    return deleteUserInterest;
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getUserInterest, createUserInterest, getAllUserInterests, getInterestsByUser, deleteUserInterest }