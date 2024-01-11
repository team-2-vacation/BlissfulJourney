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
}

const getAllUsers = async() => {
    const allUsers = await prisma.user.findmany()
    return allUsers;
}

const getUser = async() => {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user;
}

module.exports = {createUser, getAllUsers, getUser}