const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const verify = require("../helpers/google");

class UserController {
  static async register(req, res, next) {
    try {
      const profilePict = req.file.path
      // console.log(req.file.path, '<<<<<<<');
      const { username, email, password } = req.body;
      const create = await User.create({
        username,
        email,
        password,
        profilePicture: profilePict
      });
      if (create) {
        res.status(201).json({
          message: `user with email ${create.email} has been created`,
        });
      }
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let { google_token } = req.headers;
      let email = await verify(google_token);
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username: `${email.split("@")[0]}`,
          password: "google",
          imageUrl:
            "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg",
          status: "fans",
        },
        hooks: false,
      });

      let payload = { id: user.id };

      const access_token = createToken(payload);
      res.status(200).json({ access_token, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "bad_request" };
      }

      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }

      const compare = comparePassword(password, foundUser.password);

      if (!compare) {
        throw { name: "invalid_credentials" };
      }

      let payload = { id: foundUser.id };
      const access_token = createToken(payload);

      res
        .status(200)
        .json({ access_token, email: foundUser.email, role: foundUser.role });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { username } = req.user;

      const update = await User.update({ status: 'Official' }, { where: { username } });
      if (!update) {
        throw { name: "DATA NOT FOUND" };
      }
      res.status(200).json({message: 'status updated'})
    } catch (error) {}
  }
}

module.exports = UserController;
