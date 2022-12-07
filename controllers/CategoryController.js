const { Category } = require("../models");

class CategoryController {
  static async readCategory(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
