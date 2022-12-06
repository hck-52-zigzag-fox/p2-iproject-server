const { Op } = require("sequelize");
const { Product, Category } = require("../models");
class ProductController {
  static async fetchData(req, res, next) {
    try {
      // let { filter, search } = req.query

      // if(filter){
      //   totalProduct.CategoryId
      // }
      // if(search){
      //   totalProduct.name = {
      //     [Op.iLike]: `%${search}%`
      //   }
      // }
      const fetch = await Product.findAll({
        include: Category,
        where: {
          quantity: {
            [Op.gt]: 0,
          },
        },
      });
      res.status(200).json(fetch);
    } catch (error) {
      console.log(error);
      // next(error);
    }
  }
}

module.exports = ProductController;
