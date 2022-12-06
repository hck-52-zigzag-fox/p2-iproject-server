const { Product } = require("../models");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const dataProduct = await Product.findAll({
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      res.status(200).json(dataProduct);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;
