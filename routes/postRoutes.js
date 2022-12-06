const router = require("express").Router();
const { PostController } = require("../controllers/");

router.get("/", PostController.findAll);

module.exports = router;
