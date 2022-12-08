const { Post, User, Profile, Comment } = require("../models");
class PostController {
  static async findAll(req, res, next) {
    try {
      // find post include user nested include
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "email"],
            include: [
              {
                model: Profile,
                attributes: ["name", "profilePict"],
              },
            ],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "email"],
                include: [
                  {
                    model: Profile,
                    attributes: ["name", "profilePict"],
                  },
                ],
              },
            ],
          },
        ],

        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
  static async createPost(req, res, next) {
    try {
      const { id } = req.user;
      const { content } = req.body;
      let imgUrl;
      req.file ? (imgUrl = req.file.path) : (imgUrl = "#");
      const post = await Post.create({
        imgUrl,
        content,
        UserId: id,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
