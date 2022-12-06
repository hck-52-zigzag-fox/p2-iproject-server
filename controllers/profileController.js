const { signToken, upload } = require("../helpers");

const { Profile } = require("../models");

class ProfileController {
  static async createProfile(req, res, next) {
    try {
      const { id } = req.user;
      const { name, gender, about, job, company, dateOfBirth } = req.body;
      //   console.log(req.file, "<<<");
      //   console.log(dateOfBirth, "<<< iniî");
      const profile = await Profile.create({
        name,
        profilePict: req.file.path,
        dateOfBirth,
        gender,
        about,
        job,
        company,
        UserId: id,
      });
      res.status(201).json(profile);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProfileController;
