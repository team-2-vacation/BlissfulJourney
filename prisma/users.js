const prisma = require("./client");
const bcrypt = require("bcrypt");

const createUser = async(email, username, password, firstName, lastName, isAdmin) => {
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password,
            firstName,
            lastName,
            isAdmin
        }
    })
    return user
}

const getAllUsers = async() => {
    const allUsers = await prisma.user.findMany()
    return allUsers;
}

const getUser = async( id ) => {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user;
}

const checkUserExistance = async(username, email) => {
    const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: email },
          ],
        },
      });
      return existingUser
}


module.exports = {createUser, getAllUsers, getUser, checkUserExistance}