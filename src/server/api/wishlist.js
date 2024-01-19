const express = require("express");
const router = express.Router();
const prisma = require("../../../prisma/client");
const verify = require("../util");

router.get("/", verify, async (req, res, next) => {
    try {
        const wishlist = await prisma.wishlist.findUnique({
            where: {userId: +req.user.id,},
        });
        res.status(200).send(wishlist);
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;