const router = require('express').Router()
const { GameController } = require('../controllers')
const {authentication} = require('../middlewares/auth')

router.get('/', GameController.getGamesList)

router.get('/steam/:steamAppID', GameController.getGameFromSteam)

router.get('/cheapshark/:gameID', GameController.getGameFromCheapShark)

router.use(authentication)

router.get('/mygames', GameController.getOwnedGames)

module.exports = router