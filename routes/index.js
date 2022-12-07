const express = require("express");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
const users = require("./userRouter");
const motorcycles = require("./motorRouter");
const rents = require("./rentRouter");

router.use("/users", users);
router.use("/motorcycles", motorcycles);

router.use(authentication)

router.use("/rents", rents);

module.exports = router;
