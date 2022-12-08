const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  // comment buat test
  static async register(req, res, next) {
    try {
      const { email, password, address } = req.body;
      const createUser = await User.create({
        email,
        password,
        address,
      });
      res.status(201).json({
        id: createUser.id,
        email: createUser.email,
        address: createUser.address,
      });
    } catch (error) {
      // console.log(error);
      // res.status(500).json(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest Email" };
      }
      if (!password) {
        throw { name: "BadRequest Password" };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "invalid_credentials" };
      }

      const comparePass = compareHash(password, user.password);

      if (!comparePass) {
        throw { name: "invalid_credentials" };
      }

      const access_token = createToken({ email: user.email, id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      // console.log(error);
      // res.status(500).json(error);
      next(error);
    }
  }

  static async pubLoginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          address: "Google",
          email: payload.email,
          password: "Google",
        },
        hooks: false,
      });
      const payloadJwt = { id: user.id };
      // console.log(payload);
      const access_token = createToken(payloadJwt);
      res.status(200).json({ access_token, email: user.email });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
