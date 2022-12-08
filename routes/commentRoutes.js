const router = require("express").Router();
const { CommentController } = require("../controllers/");
const { authorization } = require("../middlewares");
router.get("/:postId", CommentController.findAllCommentById);
router.post("/:postId", CommentController.addCommentById);
router.delete(
  "/:commentId",
  authorization,
  CommentController.deleteCommentById
);
module.exports = router;
