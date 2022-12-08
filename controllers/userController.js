const { verifiyPassword, signToken } = require("../helpers");
// require Oauth
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const speakeasy = require("speakeasy");
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

      res.status(200).json({ id: user.id, access_token });
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
  static async get2FA(req, res, next) {
    try {
      const secret = speakeasy.generateSecret({
        length: 20,
        encoding: "base32",
      });
      res.status(200).json({ secret: secret.otpauth_url });
    } catch (error) {
      console.log(error);
    }
  }
  static async verify2FAToken(req, res, next) {
    try {
      const { token, secret } = req.body;
      console.log(token, secret);
      const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: token,
      });
      if (!verified) {
        throw { name: "InvalidToken" };
      }
      console.log(verified);
      res.status(200).json({ message: "Token verified" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
