const { comparePassword } = require("../helpers/password");
const { createToken } = require("../helpers/token");
const { User } = require("../models");

class UserController {
  static async handleRegister(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const newUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }
  static async handleLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "BAD_REQUEST" };
      }

      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        throw { name: "INVALID_CREDENTIALS" };
      }

      const isValid = comparePassword(password, foundUser.password);
      if (!isValid) {
        throw { name: "INVALID_CREDENTIALS" };
      }

      const payload = { id: foundUser.id };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
