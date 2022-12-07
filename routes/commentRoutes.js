const router = require("express").Router();
const { CommentController } = require("../controllers/");
router.get("/:postId", CommentController.findAllCommentById);

module.exports = router;
