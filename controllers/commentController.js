const { Comment, User, Profile } = require("../models");

class CommentController {
  static async findAllCommentById(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({
        where: {
          postId,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: Profile,
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "about",
                    "job",
                    "company",
                    "dateOfBirth",
                    "gender",
                  ],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CommentController;
