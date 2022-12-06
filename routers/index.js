const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/Controllers");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);

router.use(errorHandler);

module.exports = router;
