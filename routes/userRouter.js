const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/register", UserController.handleRegister);
router.post("/login", UserController.handleLogin);
router.post("/googleLogin", UserController.handleGoogleLogin);

module.exports = router;
