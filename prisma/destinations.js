const prisma = require("./client");

const createDestinations = async(name, country, description, time_to_visit, average_cost, imageURL, currency, language) => {
    const destination = await prisma.destination.create({
        data: {
            name,
            country,
            description,
            time_to_visit,
            average_cost: +average_cost,
            imageURL,
            currency,
            language
        }
    })
    return destination;
}

const getAllDestinations = async() => {
    const allDestinations = await prisma.destination.findmany()
    return allDestinations
}

module.exports = {createDestinations, getAllDestinations} 