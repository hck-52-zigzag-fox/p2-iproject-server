const { Comment } = require("../models");
async function authorization(req, res, next) {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw { name: "NotFound" };
    }
    if (comment.UserId != req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authorization };
