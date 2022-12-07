const { signToken, upload } = require("../helpers");

const { Profile, User } = require("../models");

class ProfileController {
  static async editProfile(req, res, next) {
    try {
      // upload images from public upload to cloudninary
      // if (req.file) {
      //   const file = dataUri(req).content;
      //   return uploader.upload(file).then(async (result) => {
      //     const image = result.url;
      //   });
      // }
      // console.log(image, "<<<");
      let profilePict = "#";
      profilePict = req.file.path;
      // console.log(profilePict, "<<<");
      const { id } = req.user;
      let { name, gender, about, job, company, dateOfBirth } = req.body;
      // change dateOfBirth to date format
      // console.log(dateOfBirth, "<<<");
      dateOfBirth = new Date(dateOfBirth);
      // console.log(dateOfBirth, "<<<");
      const dataFind = await Profile.update(
        {
          name,
          profilePict: profilePict,
          dateOfBirth,
          gender,
          about,
          job,
          company,
        },
        {
          where: {
            UserId: id,
          },
          returning: true,
        }
      );
      res.status(201).json(dataFind);
    } catch (err) {
      next(err);
    }
  }
  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;
      const dataFind = await Profile.findOne({
        where: {
          UserId: id,
        },
      });
      // change dataFind.dateOfBirth to yyyy-mm-dd without timezone
      dataFind.dateOfBirth = dataFind.dateOfBirth.toISOString().split("T")[0];
      res.status(200).json(dataFind);
    } catch (err) {
      next(err);
    }
  }
  static async getAllProfile(req, res, next) {
    try {
      const dataFind = await Profile.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json(dataFind);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProfileController;
