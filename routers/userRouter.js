const express = require("express");
const ControllerUser = require("../controllers/controllerUser");
const router = express.Router();

router.post("/login", ControllerUser.login)
router.post("/register", ControllerUser.register)

module.exports = router