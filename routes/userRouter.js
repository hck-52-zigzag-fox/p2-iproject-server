const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/register", UserController.handleRegister);
router.post("/login", UserController.handleLogin);

module.exports = router;
