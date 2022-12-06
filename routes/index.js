const express = require("express");
const router = express.Router();
const users = require('./userRoute');
const animes = require('./animeRoute');
const like = require('./likeRoute');

router.use('/users', users)
router.use('/anime', animes)
router.use('/like', like)

module.exports = router