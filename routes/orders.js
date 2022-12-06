const express = require("express");
const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.use(authentication);

router.get("/", OrderController.getOrderById);
router.post("/:id", OrderController.addOrderById);
router.delete("/:id", authorization, OrderController.deleteById);
module.exports = router;
