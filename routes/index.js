const express = require("express");
const router = express.Router();
const userRoute = require("./users");
const productRoute = require("./products");

router.use("/users", userRoute);
router.use("/products", productRoute);

module.exports = router;
