const express = require("express");
const prisma = require("./client");
const router = express.Router();

const createAttractions = async (name, imageURL, destinationId) => {
    const attractions = await prisma.attraction.create({
        data: {
            name,
            imageURL,
            destinationId
        }
    });
    return attractions;
}

const getAllAttractions = async () => {
    const allAttractions = await prisma.attraction.findMany()
    return allAttractions;
}

module.exports = { createAttractions, getAllAttractions };
