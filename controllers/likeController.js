const { Liked } = require("../models/index");
const axios = require("axios");

class Controller {
  static async addLike(req, res, next) {
    try {
      let { animeId } = req.params;
      let { data } = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeId}/full`
      );
      let newLiked = await Liked.create({
        malId: data.mal_id,
        title: data.title,
        type: data.type,
        malUrl: data.url,
        posterUrl: data.images.image_url,
        released: data.aired.from,
        recommended: false,
      });
      res.status(201).json({ id: newLiked.id, title: newLiked.title });
    } catch (error) {
      next(error);
    }
  }
  static async getLike(req, res, next) {
    try {
      let { userId } = req.params;
      let likedAnime = await Liked.findAll({
        where: {
          UserId: userId
        },
        order: [['id', 'ASC']]
      });
      res.status(200).json(likedAnime)
    } catch (error) {
      next(error);
    }
  }
  static async reccomend(req, res, next) {
    try {
      let { animeId, userId } = req.params;
      let foundAnime = await Liked.findOne({
        where: { UserId: userId, malId: animeId },
      });
      if (!foundAnime) {
        throw { name: "not_found" };
      }
      let updateLike = await Liked.update(
        { recommended: true },
        { where: { UserId: userId, malId: animeId } }
      );
      res.status(201).json({ id, LikeId: updateLike.id });
    } catch (error) {
      next(error);
    }
  }
  static async unreccomend(req, res, next) {
    try {
      let { animeId, userId } = req.params;
      let foundAnime = await Liked.findOne({
        where: { UserId: userId, malId: animeId },
      });
      if (!foundAnime) {
        throw { name: "not_found" };
      }
      let updateLike = await Liked.update(
        { recommended: false },
        { where: { UserId: userId, malId: animeId } }
      );
      res.status(201).json({ id: userId, LikeId: updateLike.id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
