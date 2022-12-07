const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const newUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(200).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
