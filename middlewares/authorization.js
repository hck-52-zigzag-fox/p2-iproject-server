const { Product, Order } = require("../models");
async function authorization(req, res, next) {
  try {
    const id = +req.params.id;
    //order Userid !== req.user.id
    const order = await Order.findByPk(id, { include: Product });

    if (!order) {
      throw { name: "Order Not Found" };
    }
    if (order.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    req.order = order;

    next();
  } catch (error) {
    next(error);
  }
}
module.exports = authorization;
