const { verifiyPassword, signToken } = require("../helpers");
// require Oauth
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password,
      });
      let result = {
        id: user.id,
        email: user.email,
        message: `Success create account with email ${user.email}`,
      };
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmailPasswordRequired" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredentials" };
      }
      const checkPassword = verifiyPassword(password, user.password);
      if (!checkPassword) {
        throw { name: "InvalidCredentials" };
      }
      let payload = { id: user.id, email: user.email };
      const access_token = signToken(payload);

      res.status(200).json({ name: user.username, access_token });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const token = req.headers.google_token;
      const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

      if (!token) {
        throw { name: "Unauthorized" };
      }
      const client = new OAuth2Client(CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "google sign in",
        },
        hooks: false,
      });

      const jwtPayload = { id: user.id, email: user.email };
      const access_token = signToken(jwtPayload);
      res.status(200).json({ email: user.email, access_token });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
