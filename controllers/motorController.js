const { Motorcycle } = require("../models");

class MotorController {
  static async handleMotorcycles(req, res, next) {
    try {
      const motorcycles = await Motorcycle.findAll();
      res.status(200).json(motorcycles);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MotorController;
