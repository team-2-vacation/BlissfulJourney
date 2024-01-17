const prisma = require("./client");

const createInterests = async(name, description, imageURL) => {
    const interest = await prisma.interest.create({
        data: {
            name,
            description,
            imageURL 
        }
    })
}

const getAllInterests = async() => {
    const allInterests = await prisma.interest.findMany()
    return allInterests;
}

module.exports = {createInterests, getAllInterests} 