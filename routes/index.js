const express = require("express");
const router = express.Router();
const users = require("./userRouter");
const motorcycles = require("./motorRouter");

router.use("/users", users);
router.use("/motorcycles", motorcycles);

module.exports = router;
