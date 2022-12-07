const router = require("express").Router();
const { authentication } = require("../middlewares");
const users = require("./userRoutes.js");
const posts = require("./postRoutes.js");
const profile = require("./profileRoutes.js");

router.use("/users", users);
router.use(authentication);
router.use("/posts", posts);
router.use("/profiles", profile);

module.exports = router;
