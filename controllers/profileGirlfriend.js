const { ProfileGirlfriend } = require("../models");

class ControllerProfileGirlfriend {
  static async getAll(req, res, next) {
    try {
      const girlfriends = await ProfileGirlfriend.findAll();
      res.status(200).json(girlfriends);
    } catch (error) {
      next(error);
    }
  }

  static async addProfileGirlfriend(req, res, next) {
    try {
      const { name, imageUrl, benefits, like, dislike,price } = req.body;
      const newGirlfriend = await ProfileGirlfriend.create({
        name,
        imageUrl,
        benefits,
        like,
        dislike,
        price,
        UserId: req.user.id,
      });
      res.status(201).json(newGirlfriend);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerProfileGirlfriend;
