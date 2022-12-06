const express = require("express");
const router = express.Router();
const Controller = require('../controllers/likeController');

router.get('/liked/:userId', Controller.getLike)
router.patch('/recommend/:animeId/:userId', Controller.reccomend)
router.patch('/unrecommend/:animeId/:userId', Controller.unreccomend)
router.post('/:animeId', Controller.addLike)

module.exports = router