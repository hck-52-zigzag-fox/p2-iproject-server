const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");

class UserController {
  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }

      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const compare = comparePass(password, user.password);

      if (!compare) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      //tambahin role string customer kalo login customer
      const payload = { id: user.id, role: user.role };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        email: user.email,
        role: user.role,
        id: user.id,
      });
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
      // const userid = payload["sub"];

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "google sign in",
          role: "Customer",
        },
        hooks: false,
      });

      const jwtPayload = { id: user.id };
      const access_token = createToken(jwtPayload);

      res
        .status(200)
        .json({ access_token, email: user.email, role: user.role, id: user.id });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
