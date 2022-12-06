const { User } = require("../models");
const { Op } = require("sequelize");

class Auth {
  static async registerUser(req, res, next) {
    try {
      const { userName, email, password } = req.body;

      const [user, created] = await User.findOrCreate({
        where: {
          [Op.or]: [{ userName }, { email }],
        },
        defaults: {
          userName,
          email,
          password,
        },
      });
      if (!created) throw { name: "ConflictCreateUser" };
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Auth;
