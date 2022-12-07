const router = require("express").Router();
const Auth = require("../../controllers/auth");
const Public = require("../../controllers/public");

router.post("/register", Auth.registerUser);
router.post("/login", Auth.loginUser);
router.get("/courses", Public.getCourses);
router.get("/courses/:id", Public.getCourse);
module.exports = router;
