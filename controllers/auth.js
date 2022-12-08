const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require("../models");
const { Op } = require("sequelize");
const { comparePassword, jwtSign } = require("../helpers");
const axios = require("axios");
const querystring = require("querystring");

class Auth {
  static async registerUser(req, res, next) {
    try {
      const { userName, email, password } = req.body;

      const [user, created] = await User.findOrCreate({
        where: {
          [Op.or]: [{ userName }, { email }],
        },
        defaults: {
          userName,
          email,
          password,
        },
      });
      if (!created) throw { name: "ConflictCreateUser" };
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "NoEmail" };
      if (!password) throw { name: "NoPassword" };

      let options = {
        where: {
          email,
        },
      };
      const dataUser = await User.findOne(options);
      if (!dataUser) throw { name: "ConflictLoginUser" };

      if (dataUser.password) {
        const isValidPwd = comparePassword(password, dataUser.password);
        if (!isValidPwd) throw { name: "ConflictLoginUser" };

        const generateToken = jwtSign({ id: dataUser.id }, process.env.JWT_SECRET);
        res.status(200).json({
          statusCode: 200,
          access_token: generateToken,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async loginGithub(req, res, next) {
    try {
      const clientId = "6757ba3f3ba6aa0987e6";
      const clientSecret = "b1c94bcee7cefc2a0ad2111ecdfeec00b1fff925";
      const { code } = req.query;

      const uriGithub = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
      const { data } = await axios.post(`${uriGithub}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let token = data.split("=")[1].split("&")[0];
      const { data: userGithub } = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let customEmail = String(userGithub.id).concat("github@mail.com");

      const [user, created] = await User.findOrCreate({
        where: {
          [Op.or]: [{ userName: userGithub.login }, { email: customEmail }],
        },
        defaults: {
          userName: userGithub.login,
          email: customEmail,
          password: "from github",
        },
        hooks: false,
      });

      const generateToken = jwtSign({ id: user.id }, process.env.JWT_SECRET);

      res.status(200).json({
        access_token: generateToken,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const token = req.headers.google_token;

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const email = payload.email;
      const password = "dari google";
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: {
          [Op.or]: [{ userName: email }, { email: email }],
        },
        defaults: {
          userName: email,
          email: email,
          password: "from google",
        },
        hooks: false,
      });

      const generateToken = jwtSign({ id: user.id }, process.env.JWT_SECRET);

      res.status(200).json({
        access_token: generateToken,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Auth;
