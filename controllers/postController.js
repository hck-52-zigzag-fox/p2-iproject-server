const { Post, User } = require("../models");
class PostController {
  static async findAll(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [User],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
