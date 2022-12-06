const { User, Order, Product } = require("../models");

class OrderController {
  static async getOrderById(req, res, next) {
    try {
      const data = await Order.findAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["updatedAt", "createdAt", "password"] },
          },
          {
            model: Product,
            attributes: { exclude: ["updatedAt", "createdAt"] },
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt"] },
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
      // console.log(error);
      next(error);
    }
  }
  static async addOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const { size } = req.body;
      const addOrder = await Order.create({
        UserId: req.user.id,
        ProductId: id,
        size,
        status: "Unpaid",
      });
      res.status(201).json(addOrder);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async deleteById(req, res, next) {
    try {
      const id = +req.params.id;

      const deleteOrder = await Order.destroy({
        UserId: req.user.id,
        where: {
          id,
        },
      });
      res.status(201).json({
        message: `Order with product ${req.order.Product.name} has been delete`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async patchById(req, res, next) {
    try {
      const id = +req.params.id;
      const order = await Order.findByPk(id);

      if (!order) {
        throw { name: "Order Not Found" };
      }
      if (order.status == "Paid") {
        throw { name: "change error" };
      }

      await Order.update({ status: "Paid" }, { where: { id } });

      res.status(200).json({
        message: `Success to update status ${req.order.Product.name}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
