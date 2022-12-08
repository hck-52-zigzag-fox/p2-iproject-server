const router = require("express").Router();
const { PostController } = require("../controllers/");
const { upload } = require("../middlewares/cloudinary");

router.get("/", PostController.findAll);
router.post("/", upload.single("imgUrl"), PostController.createPost);

module.exports = router;
