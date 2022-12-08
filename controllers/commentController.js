const { Comment, User, Profile } = require("../models");

class CommentController {
  static async findAllCommentById(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({
        where: {
          postId,
        },
        order: [["createdAt", "ASC"]],
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
  static async addCommentById(req, res, next) {
    try {
      const { postId } = req.params;
      const { message } = req.body;
      const { id } = req.user;
      const comment = await Comment.create({
        content: message,
        postId,
        UserId: id,
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCommentById(req, res, next) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.destroy({
        where: {
          id: commentId,
        },
      });
      res.status(200).json({ message: "comment deleted" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CommentController;
