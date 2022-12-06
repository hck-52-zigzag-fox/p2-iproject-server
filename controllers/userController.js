// const { OAuth2Client } = require("google-auth-library");
const { comparePass, createToken } = require("../helpers");
const { User } = require("../models");
class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const newUser = await User.create({
        email,
        password,
        username,
      });
      // if (newUser) {
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
      // }
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "ErrorEmptyInput",
        };
      }
      const loginUser = await User.findOne({
        where: { email },
      });
      if (!loginUser) {
        throw { name: `INVALID_CREDENTIALS` };
      }
      // untuk menyamakan pass
      const compare = comparePass(password, loginUser.password);
      if (!compare) {
        throw { name: `INVALID_CREDENTIALS` };
      }
      let payload = { id: loginUser.id };
      const getToken = createToken(payload);
      req.headers = { access_token: getToken };
      res.status(201).json({
        email: loginUser.email,
        access_token: getToken,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  //google login
  // static async userGoogleLogin(req, res, next) {
  //   try {
  //     const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  //     const ticket = await client.verifyIdToken({
  //       idToken: req.headers.google_token,
  //       audience: process.env.GOOGLE_CLIENT_ID,
  //     });
  //     const payload = ticket.getPayload();
  //     const [user, created] = await Customer.findOrCreate({
  //       where: { email: payload.email },
  //       defaults: {
  //         username: "google_account",
  //         email: payload.email,
  //         password: "hacktiv123",
  //         phoneNumber: "0987654321",
  //       },
  //       hooks: false,
  //     });
  //     const access_token = createCust({
  //       id: user.id,
  //     });
  //     res.status(200).json({
  //       access_token,
  //       email: user.email,
  //       role: user.role,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

module.exports = UserController;
