const { Op } = require("sequelize");
const { Product, Category } = require("../models");
class ProductController {
  static async fetchData(req, res, next) {
    try {
      const fetch = await Product.findAll({
        include: Category,
        where: {
          quantity: {
            [Op.gt]: 6,
          },
        },
      });
      res.status(200).json(fetch);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
