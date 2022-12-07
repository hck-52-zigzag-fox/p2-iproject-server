const router = require("express").Router();
const { UserController, ChatController } = require("../controllers/");
const { authentication } = require("../middlewares");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/googleLogin", UserController.googleLogin);
router.use(authentication);
router.get("/chat/:ReceiverId", ChatController.readChat);
router.post("/chat", ChatController.addChat);
module.exports = router;
