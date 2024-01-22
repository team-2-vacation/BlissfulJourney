const prisma = require("./client");

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
    return user;
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
      return existingUser;
}

const updateUser = async(id, email, username, password, firstName, lastName) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            email,
            username,
            password,
            firstName,
            lastName
        }
    })
    return updatedUser;
}

const deleteUser = async( id ) => {
    const deletedUser = await prisma.user.delete({
        where: { id }
    })
    return deletedUser;
}

module.exports = {createUser, getAllUsers, getUser, updateUser, deleteUser, checkUserExistance};