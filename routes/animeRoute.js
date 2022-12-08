const express = require("express");
const router = express.Router();
const Controller = require('../controllers/animeController');

router.get('/all', Controller.getAllAnime)
router.get('/topAll', Controller.getTop10Alltime)
router.get('/topNow', Controller.getTop10Current)
router.get('/upcoming', Controller.upcoming)
router.get('/image', Controller.getRandomImage)
router.get('/:animeId', Controller.getAnimeById)

module.exports = router