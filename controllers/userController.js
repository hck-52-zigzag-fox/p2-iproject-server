const { User } = require("../models");
class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, address } = req.body;
      const createUser = await User.create({
        email,
        password,
        address,
      });
      res.status(201).json({
        id: createUser.id,
        email: createUser.email,
        address: createUser.address,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
