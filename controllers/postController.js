const { Post, User, Profile } = require("../models");
class PostController {
  static async findAll(req, res, next) {
    try {
      // find post include user nested include
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            include: [
              {
                model: Profile,
              },
            ],
          },
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
