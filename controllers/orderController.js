const { User, Order, Product } = require("../models");
const midtransClient = require("midtrans-client");
const axios = require("axios");

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
      const { size, origin, destination, courier, weight } = req.body;
      const addOrder = await Order.create({
        UserId: req.user.id,
        ProductId: id,
        size,
        origin: "Bandung",
        destination,
        courier: "jne",
        weight: 2000,
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

  static async ongkir(req, res, next) {
    try {
      const { data } = await axios({
        method: `GET`,
        url: `https://api.rajaongkir.com/starter/city`,
        headers: {
          key: `14af9cd2b9019a4b1c9eedf82642b7c1`,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async cost(req, res, next) {
    try {
      const { origin, destination, weight, courier } = req.body;
      const { data } = await axios({
        method: `POST`,
        url: `https://api.rajaongkir.com/starter/cost`,
        headers: {
          key: `14af9cd2b9019a4b1c9eedf82642b7c1`,
        },
        data: {
          origin,
          destination,
          weight,
          courier,
        },
      });

      const dataUser = await User.findOne({
        where: {
          email,
        },
      });
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-uvypLRCqfYnT6RVkIvfDgi8h",
      });

      let parameter = {
        transaction_details: {
          order_id: "02101996",
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: dataUser.email,
        },
      };

      await snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = OrderController;
