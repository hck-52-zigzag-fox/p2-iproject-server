const axios = require("axios");
const { User } = require("../models/");
const {
  comparePassword,
  signToken,
  registerSuccess,
  verify,
} = require("../helpers/");

class UserController {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      let newUser = await User.create({ email, password });
      registerSuccess(email);
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmailPasswordRequired" };
      }
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredentials" };
      }
      let isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "InvalidCredentials" };
      }
      let access_token = signToken({
        id: user.id,
        email,
      });
      res.status(200).json({
        access_token,
        email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let { google_token } = req.headers;
      let emailGoogle = await verify(google_token);
      let [user, created] = await User.findOrCreate({
        where: { email: emailGoogle },
        defaults: {
          email: emailGoogle,
          password: "dariMbahGoogle",
        },
        hooks: false,
      });
      let access_token = signToken({
        id: user.id,
        email: emailGoogle,
      });
      res.status(200).json({ access_token, email: emailGoogle });
    } catch (err) {
      next(err);
    }
  }

  static async motivationalQuotes(req, res, next) {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://motivational-quotes1.p.rapidapi.com/motivation",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        },
        data: '{"key1":"value","key2":"value"}',
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
