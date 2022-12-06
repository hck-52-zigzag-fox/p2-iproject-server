const { Product } = require("../models");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const dataProduct = await Product.findAll({
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      res.status(200).json(dataProduct);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const readData = await Product.findByPk(id);
      if (!readData) {
        throw { name: "Not Found" };
      }
      res.status(200).json(readData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
