const { User } = require("../models");
const { Op } = require("sequelize");
const { comparePassword, jwtSign } = require("../helpers");

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

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "NoEmail" };
      if (!password) throw { name: "NoPassword" };

      let options = {
        where: {
          email,
        },
      };
      const dataUser = await User.findOne(options);
      if (!dataUser) throw { name: "ConflictLoginUser" };

      if (dataUser.password) {
        const isValidPwd = comparePassword(password, dataUser.password);
        if (!isValidPwd) throw { name: "ConflictLoginUser" };

        const generateToken = jwtSign({ id: dataUser.id }, process.env.JWT_SECRET);
        res.status(200).json({
          statusCode: 200,
          access_token: generateToken,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Auth;
