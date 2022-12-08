const { Order, User, Item } = require("../models/");
const midtransClient = require("midtrans-client");
const ImageKit = require("imagekit");

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

      res
        .status(200)
        .json({ message: `Success update order with id: ${foundOrder.id}` });
    } catch (err) {
      next(err);
    }
  }

  static async changeStatusToPaid(req, res, next) {
    try {
      const id = +req.params.id;

      const foundOrder = await Order.findByPk(id);

      if (!foundOrder) {
        throw { name: "NotFound", model: "Order", id };
      }

      await Order.update({ status: "Paid" }, { where: { id } });

      res
        .status(200)
        .json({ message: `Success update status with id: ${foundOrder.id}` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const id = +req.params.id;

      const foundOrder = await Order.findByPk(id);

      if (!foundOrder) {
        throw { name: "NotFound", model: "Order", id };
      }

      await Order.destroy({ where: { id } });

      res
        .status(200)
        .json({ message: `Success delete order with id: ${foundOrder.id}` });
    } catch (err) {
      next(err);
    }
  }
  static async midtrans(req, res, next) {
    try {
      const id = +req.params.id;

      const order = await Order.findByPk(id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          Item,
        ],
        where: {
          UserId: req.user.id,
        },
      });

      if (!order) {
        throw { name: "NotFound", model: "Order", id };
      }

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "midtrans -" + order.id + "test",
          gross_amount: order.Item.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: order.User.email,
        },
      };

      const midtrans_token = await snap.createTransaction(parameter);

      res.status(201).json({ midtrans_token, parameter });
    } catch (err) {
      
      next(err);
    }
  }
  static async uploadImage(req, res, next) {
    try {
      const id = +req.params.id;
      const { url, fileName } = req.body;
      
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
        urlEndpoint: "https://ik.imagekit.io/iprojectNadya/",
      });

      const foundOrder = await Order.findByPk(id);

      if (!foundOrder) {
        throw { name: "NotFound", model: "Order", id };
      }

      imagekit.upload(
        {
          file: url, //required
          fileName: fileName, //required
        },
        async function (error, result) {
          if (error) {
            next(error);
          } else {
            const order = await Order.update(
              { ImageId: result.fileId },
              { where: { id } }
            );

            res.status(200).json(result);
          }
        }
      );
    } catch (err) {
      next(err);
    }
  }
  static async downloadImage(req, res, next) {
    try {
      const id = +req.params.id;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
