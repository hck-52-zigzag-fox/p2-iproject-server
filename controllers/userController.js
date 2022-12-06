const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }

      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const compare = comparePass(password, user.password);

      if (!compare) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      //tambahin role string customer kalo login customer
      const payload = { id: user.id, role: user.role };

      const access_token = createToken(payload);

      res
        .status(200)
        .json({ access_token, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
