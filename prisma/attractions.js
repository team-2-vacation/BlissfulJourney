const prisma = require("./client");

const createAttractions = async(name, imageURL, destinationId) => {
    const attractions = await prisma.attraction.create({
        data: {
            name,
            imageURL,
            destinationId
        }
    })
    return attractions
}

const getAllAttractions = async() => {
    const allAttractions = await prisma.attraction.findmany()
    return allAttractions
}

module.exports = {createAttractions, getAllAttractions}