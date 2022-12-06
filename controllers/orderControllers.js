const { Order, User, Item } = require("../models/");

class OrderController {
  static async fetchOrder(req, res, next) {
    try {
      const orders = await Order.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }, Item],
      });

      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
