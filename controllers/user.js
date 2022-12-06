const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "CredentialsNeeded",
        };
      }
      const newUser = await User.create({
        email,
        password,
      });
      // kirim nodemailer
      // nodemailer(newUser.email)
      res.status(201).json({ message: `Success register` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "CredentialsNeeded",
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw {
          name: "InvalidCredentials",
        };
      }
      let validPass = comparePass(password, user.password);
      if (!validPass) {
        throw {
          name: "InvalidCredentials",
        };
      }
      let access_token = signToken({
        id:user.id,
      })
      res.status(200).json({access_token})
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
