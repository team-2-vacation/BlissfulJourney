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


// const isAdmin = (req, res, next) => {
    
//     const userIsAdmin = true; 

//     if (userIsAdmin) {
//         next(); 
//     } else {
//         res.status(403).json({ error: "Forbidden - Admins only" });
//     }
// };

module.exports = { createAttractions, getAllAttractions };
