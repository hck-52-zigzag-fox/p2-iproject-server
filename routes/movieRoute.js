const movieController = require('../controllers/movieController');
const router = require('express').Router()

router.get('/', movieController.getMovie)
router.get('/genre', movieController.getGenre)
router.post('/addToCart', movieController.addCart)
router.get('/:id', movieController.getDetailMovie)

module.exports = router