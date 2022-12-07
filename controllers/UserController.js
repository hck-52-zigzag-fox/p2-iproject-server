const { User, Contract } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        next(err)
    }
  }
}

module.exports = UserController;
