const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const sendMail = require("../helpers/nodemailer");
const { User, Profile } = require("../models/index");
const DatauriParser = require("datauri/parser");
const cloudinary = require("../helpers/cloudinary");
const profile = require("../models/profile");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let Users = await User.create({
        username,
        email,
        password,
      });
      sendMail(email, username);
      res.status(201).json({
        id: Users.id,
        email: Users.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "Bad_Request" };
      }
      if (!password) {
        throw { name: "Bad_Request" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "Invalid_Credential" };
      }

      const comparePassword = comparedPassword(password, foundUser.password);

      if (!comparePassword) {
        throw { name: "Invalid_Credential" };
      }

      const payload = {
        id: foundUser.id,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token: access_token,
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addProfileUser(req, res, next) {
    try {
      const { gender, date0fBirth, location, games } = req.body;

      const parser = new DatauriParser();

      const pathImage = parser.format(req.file.originalname, req.file.buffer);

      const image = await cloudinary.uploader.upload(pathImage.content);

      const profile = await Profile.create({
        imgUrl: image.secure_url,
        gender,
        date0fBirth,
        location,
        games,
        UserId: req.user.id,
      });
      res.status(201).json(profile);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async listUsers(req, res, next) {
    try {
      const Users = await User.findAll({
        attributes: ["id", "username"],
        include: {
          model: Profile,
          attributes: ["id", "imgUrl", "location", "games"],
        },
      });
      res.status(200).json(Users);
    } catch (err) {
      next(err);
    }
  }

  static async listProfileById(req, res, next) {
    try {
      let { id } = req.params;
      const Profiles = await Profile.findByPk(id, {
        attributes: [
          "id",
          "imgUrl",
          "gender",
          "dateOfBirth",
          "location",
          "games",
        ],
      });
      if (!profile) {
        throw { name: "Not_Found" };
      }
      res.status(200).json(Profiles);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
