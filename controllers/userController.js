const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
class UserController {
  // comment buat test
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
      // console.log(error);
      // res.status(500).json(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest Email" };
      }
      if (!password) {
        throw { name: "BadRequest Password" };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "invalid_credentials" };
      }

      const comparePass = compareHash(password, user.password);

      if (!comparePass) {
        throw { name: "invalid_credentials" };
      }

      const access_token = createToken({ email: user.email, id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      // console.log(error);
      // res.status(500).json(error);
      next(error);
    }
  }
}

module.exports = UserController;
