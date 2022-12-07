const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "CredentialsNeeded",
        };
      }
      const newUser = await User.create({
        email,
        password,
      });
      // kirim nodemailer
      // nodemailer(newUser.email)
      res.status(201).json({ message: `Success register` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "CredentialsNeeded",
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw {
          name: "Unauthorized",
        };
      }
      let validPass = comparePass(password, user.password);
      if (!validPass) {
        throw {
          name: "Unauthorized",
        };
      }
      let access_token = signToken({
        id: user.id,
      });
      res
        .status(200)
        .json({ access_token, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: google_token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const [user] = await User.findOrCreate({
          where: {
            email: payload.email,
          },
          defaults: {
            email: payload.email,
            password: "user123",
            role: "customer",
          },
        });
        let accessToken = signToken({ email: user.email });
        req.headers = { access_token: accessToken };
        res.status(200).json({
          access_token: accessToken,
          email: user.email,
          role: user.role,
        });
      }
      verify().catch(console.error);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerUser;
