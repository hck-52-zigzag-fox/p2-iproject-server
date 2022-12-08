const OrderController = require("../controllers/orderControllers");
const { isAdmin } = require("../middlewares/authorization");

const orderRouter = require("express").Router();

orderRouter.get("/", OrderController.fetchOrder);
orderRouter.post("/", OrderController.addOrder);
orderRouter.post("/images/:id", OrderController.uploadImage);
orderRouter.put("/:id", OrderController.editOrder);
orderRouter.post("/:id/midtrans", OrderController.midtrans);
orderRouter.patch("/:id", OrderController.changeStatusToPaid);
orderRouter.delete("/:id", isAdmin, OrderController.deleteOrder);
module.exports = orderRouter;
