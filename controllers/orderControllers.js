const { Order, User, Item } = require("../models/");

class OrderController {
  static async fetchOrder(req, res, next) {
    try {
      let option = {};
      if (req.user.role === "Customer") {
        option.UserId = req.user.id;
      }

      const orders = await Order.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }, Item],
        where: option,
      });

      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }

  static async addOrder(req, res, next) {
    try {
      const { ItemId, additionalPrice, additionalDetail } = req.body;

      const order = await Order.create({
        UserId: +req.user.id,
        ItemId: +ItemId,
        additionalPrice: additionalPrice === "" ? null : additionalPrice,
        additionalDetail: additionalDetail === "" ? null : additionalDetail,
        status: "Unpaid",
      });

      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }

  static async editOrder(req, res, next) {
    try {
      const id = +req.params.id;
      const { ItemId, additionalPrice, additionalDetail } = req.body;

      const foundOrder = await Order.findByPk(id);

      if (!foundOrder) {
        throw { name: "NotFound", model: "Order", id };
      }

      await Order.update(
        {
          UserId: foundOrder.UserId,
          ItemId: ItemId,
          additionalPrice: additionalPrice === "" ? null : additionalPrice,
          additionalDetail: additionalDetail === "" ? null : additionalDetail,
          status: foundOrder.status,
        },
        { where: { id } }
      );

      res.status(200).json({ message: "Success update order" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
