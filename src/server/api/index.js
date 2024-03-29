const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/attractions", require("./attractions"));
router.use("/destinations", require("./destinations"));
router.use("/interests", require("./interests"));
router.use("/wishlist", require("./wishlist"));
router.use("/users_interests", require ("./users_interests"))

module.exports = router;