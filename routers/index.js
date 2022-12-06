const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/Controllers");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(errorHandler);

module.exports = router;
