const express = require("express");
const router = express.Router();
const userRoute = require("./users");
const productRoute = require("./products");
const orderRouter = require("./orders");

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRouter);
module.exports = router;
