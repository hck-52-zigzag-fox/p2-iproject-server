const express = require("express");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
const users = require("./userRouter");
const motorcycles = require("./motorRouter");
const rents = require("./rentRouter");
const news = require("./newsRouter");

router.use("/users", users);
router.use("/motorcycles", motorcycles);
router.use("/news", news);

router.use(authentication);

router.use("/rents", rents);

module.exports = router;
