const { User, Contract } = require("../models");
const { comparePassword, signToken } = require("../helpers/helper");

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
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!password){
        throw {name: 'PASSWORD_REQUEST'}
      } else if (!email){
        throw {name: 'EMAIL_REQUEST'}
      }

      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }

      const isValid = comparePassword(password, foundUser.password);
      if (!isValid) {
        throw { name: "invalid_credentials" };
      }

      let payload = { id: foundUser.id, role: foundUser.role };
      const access_token = signToken(payload);

      req.headers = { access_token };

      res.status(200).json({
        access_token,
        user: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
