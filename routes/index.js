const router = require("express").Router();
const { authentication } = require("../middlewares");
const users = require("./userRoutes.js");
const posts = require("./postRoutes.js");
const profile = require("./profileRoutes.js");
const comment = require("./commentRoutes.js");

router.use("/users", users);
router.use(authentication);
router.use("/posts", posts);
router.use("/profiles", profile);
router.use("/comments", comment);
module.exports = router;
