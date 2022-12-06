const express = require("express");
const router = express.Router();
const users = require('./userRoute');

router.use('/user', users)

module.exports = router