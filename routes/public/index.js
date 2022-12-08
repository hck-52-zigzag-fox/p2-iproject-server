const router = require("express").Router();

const Auth = require("../../controllers/auth");
const Public = require("../../controllers/public");
const MyCourse = require("../../controllers/myCourses");

const authentication = require("../../middlewares/authentication");

router.post("/register", Auth.registerUser);
router.post("/login", Auth.loginUser);
router.get("/login/github", Auth.loginGithub);
router.post("/google-login", Auth.loginGoogle);
router.get("/courses", Public.getCourses);
router.get("/courses/:id", Public.getCourse);

router.get("/mycourse", authentication, MyCourse.myVideo);
router.post("/checkout/:courseId", authentication, MyCourse.generateTokenMidtrans);
router.post("/success-payment/:courseId", authentication, MyCourse.successPayment);

module.exports = router;
