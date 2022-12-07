const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/Controllers");
const { multerUploads } = require("../helpers/multer");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.post("/profiles", multerUploads, Controller.addProfileUser);

router.use(errorHandler);

module.exports = router;
