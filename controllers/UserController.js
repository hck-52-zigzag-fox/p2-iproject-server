const { OAuth2Client } = require("google-auth-library");
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

  static async googleLogin(req, res, next) {
    try {
      const token = req.headers.google_token;
      const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const googlePayload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: googlePayload.email },
        defaults: {
          email: googlePayload.email,
          password: "login_by_google",
        },
        hooks: false,
      });
      const payload = { id: user.id };
      const access_token = signToken(payload)
      res.status(200).json({access_token, user: {
        id: user.id,
        email: user.email,
      }})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController;
