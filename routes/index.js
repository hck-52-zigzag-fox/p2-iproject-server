const express = require("express");
const router = express.Router();
const users = require("./userRouter");

router.use("/users", users);


module.exports = router;
