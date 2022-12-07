const router = require('express').Router()
const { GameController } = require('../controllers')

router.get('/', GameController.getGamesList)

router.get('/steam/:steamAppID', GameController.getGameFromSteam)

router.get('/cheapshark/:gameID', GameController.getGameFromCheapShark)

module.exports = router