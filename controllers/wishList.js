const { UserProduct, Product } = require("../models");
class Wishlist {
  static async addProduct(req, res, next) {
    try {
      const { id } = req.params;
      const add = await UserProduct.create({
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
      const fetchProduct = await UserProduct.findAll({
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
      const findProduct = await UserProduct.findByPk(id);
      if (!findProduct) {
        throw { name: `Not_found` };
      }
      const remove = UserProduct.destroy({
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
      const findProduct = await UserProduct.findByPk(+id);
      if (!findProduct) {
        throw { name: `Not_found` };
      }
      const updateStat = await UserProduct.update(
        {
          status: "Paid",
        },
        { where: { id } }
      );
      res.status(200).json({ message: `Success payment` });
    } catch (error) {
    //   console.log(error);
    next(error)
    }
  }
}

module.exports = Wishlist;
