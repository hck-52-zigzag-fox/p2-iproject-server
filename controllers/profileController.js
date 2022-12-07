const { signToken, upload } = require("../helpers");

const { Profile } = require("../models");

class ProfileController {
  static async editProfile(req, res, next) {
    try {
      let profilePict = "#";
      profilePict = req.file.path;
      console.log(profilePict, "<<<");
      const { id } = req.user;
      let { name, gender, about, job, company, dateOfBirth } = req.body;
      // change dateOfBirth to date format
      console.log(dateOfBirth, "<<<");
      dateOfBirth = new Date(dateOfBirth);
      console.log(dateOfBirth, "<<<");
      //   console.log(req.file, "<<<");
      // console.log(
      //   name,
      //   gender,
      //   about,
      //   job,
      //   company,
      //   dateOfBirth,
      //   id
      //   // "<<< iniî"
      // );
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
}
module.exports = ProfileController;
