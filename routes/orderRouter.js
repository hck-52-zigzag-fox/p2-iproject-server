const OrderController = require("../controllers/orderControllers");
const { isAdmin } = require("../middlewares/authorization");

const orderRouter = require("express").Router();

orderRouter.get("/", OrderController.fetchOrder);
orderRouter.post("/", OrderController.addOrder);
orderRouter.put("/:id", OrderController.editOrder);
orderRouter.patch("/:id", isAdmin, OrderController.changeStatusToPaid);
orderRouter.delete("/:id", isAdmin, OrderController.deleteOrder);
module.exports = orderRouter;
