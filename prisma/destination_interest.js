const prisma = require("./client")

const getAllDestinationInterests = async () => {
    const allDestinationInterests = await prisma.destination_Interest.findMany()
    return allDestinationInterests;
}

const createDestinationInterest = async (destinationId, interestId) => {
    const destinationInterest = await prisma.destination_Interest.create({
        data: {
            destinationId,
            interestId
        }
    })
    return destinationInterest;
}

const getDestinationInterests = async (destinationId, interestId) => {
    existingJoin = await prisma.destination_Interest.findFirst({
        where: {
        AND: [
            {destinationId},
            {interestId},
        ],
        },
    });
    return existingJoin;
}

module.exports = { getDestinationInterests, createDestinationInterest, getAllDestinationInterests }