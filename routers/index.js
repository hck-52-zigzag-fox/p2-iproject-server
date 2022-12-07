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
router.get("/users", Controller.listUsers);
router.get("/profiles/:id", Controller.listProfileById);
router.post("/posts", Controller.addPost);
router.get("/posts", Controller.listpost);

router.use(errorHandler);

module.exports = router;
