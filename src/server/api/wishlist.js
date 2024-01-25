const express = require("express");
const router = express.Router();
const prisma = require('../../../prisma/client');
const verify = require("../util");

router.get("/", verify, async (req, res, next) => {
    try {
        const wishlist = await prisma.wishlist.findMany({
            where: {userId: +req.user.id,},
            include: {
                Destination: true, 
            },
        });
        res.status(200).send(wishlist);
    } catch (error) {
        console.log(error)
    }
});

router.post("/destination/:id", verify, async(req, res, next) => {
    const destinationId = +req.params.id;
    const userId = +req.user.id;
    try {
        const wishlistExists = await prisma.wishlist.findFirst({
            where: {
                userId,
                destinationId
            }})
        if (wishlistExists){
            console.log("Already Exists")
            return;
            }
        else {
            const createWishlist = await prisma.wishlist.create({
                data: {
                    userId,
                    destinationId
                }})
            res.status(200).send(createWishlist)
            return;
        }}
    catch (error) {
        console.log(error)
    }
})

router.delete("/:id", verify, async (req, res, next) => {
    const destinationId = +req.params.id;
    const userId = +req.user.id;
    const wishlistItemId = +req.body.wishlistItemId;
    
    try {
        const removedDestination = await prisma.wishlist.delete({
            where: {
                id: wishlistItemId,
                userId,
                destinationId
            }
        })
        res.send({message: "Destination successfully removed from wishlist."})
        return
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;