const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const sendMail = require("../helpers/nodemailer");
const { User } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let Users = await User.create({
        username,
        email,
        password,
      });
      sendMail(email, username);
      res.status(201).json({
        id: Users.id,
        email: Users.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "Bad_Request" };
      }
      if (!password) {
        throw { name: "Bad_Request" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "Invalid_Credential" };
      }

      const comparePassword = comparedPassword(password, foundUser.password);

      if (!comparePassword) {
        throw { name: "Invalid_Credential" };
      }

      const payload = {
        id: foundUser.id,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token: access_token,
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
