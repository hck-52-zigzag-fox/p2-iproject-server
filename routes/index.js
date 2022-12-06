const router = require("express").Router();
const { authentication } = require("../middlewares");
const users = require("./userRoutes.js");
const posts = require("./postRoutes.js");

router.use("/users", users);
router.use(authentication);
router.use("/posts", posts);

module.exports = router;
