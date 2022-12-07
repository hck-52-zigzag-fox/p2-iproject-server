const { Order, Product } = require("../models");
const axios = require("axios");
class OrderController {
  // error, BESOK TANYA !!
  static async addProduct(req, res, next) {
    try {
      const { id } = req.params;
      // const {quantity} = req.body
      const add = await Order.create({
        quantity: 2,
        ProductId: id,
        UserId: req.user.id,
        status: `Unpaid`,
      });
      res.status(201).json(add);
    } catch (error) {
      console.log(error);
      // next(error)
    }
  }
  static async readProduct(req, res, next) {
    try {
      const fetchProduct = await Order.findAll({
        include: Product,
      });
      res.status(200).json(fetchProduct);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const findProduct = await Order.findByPk(id);
      if (!findProduct) {
        throw { name: `Not_found` };
      }
      const remove = Order.destroy({
        where: {
          ProductId: id,
          status: "Unpaid",
        },
      });
      if (!remove) {
        throw { name: "error" };
      }
      res.status(200).json({ message: `Product has been deleted` });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const findProduct = await Order.findByPk(+id);
      if (!findProduct) {
        throw { name: `Not_found` };
      }
      const updateStat = await Order.update(
        {
          status: "Paid",
        },
        { where: { id } }
      );
      res.status(200).json({ message: `Success payment` });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }
  // RAJA ONGKIR == get data
  static async ongkir(req, res, next) {
    try {
      const { data } = await axios({
        method: `GET`,
        url: `https://api.rajaongkir.com/starter/city`,
        headers: {
          key: `e36d0d896ae6d4f31824a82381bddeeb`,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // RAJA ONGKIR == post
  static async cost(req, res, next) {
    try {
      const {origin, destination,weight,courier} = req.body
      const { data } = await axios({
        method: `POST`,
        url: `https://api.rajaongkir.com/starter/cost`,
        headers: {
          key: `e36d0d896ae6d4f31824a82381bddeeb`,
        },
        data: {
          origin, destination,weight,courier
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = OrderController;
