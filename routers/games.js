const router = require('express').Router()
const { GameController } = require('../controllers')

router.get('/', GameController.getGamesList)

module.exports = router