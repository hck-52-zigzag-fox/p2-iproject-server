const { Item } = require("../models/");
class ItemController {
  static async fetchItems(req, res, next) {
    try {
      const items = await Item.findAll();

      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ItemController;
