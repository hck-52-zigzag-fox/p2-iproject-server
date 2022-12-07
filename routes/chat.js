const router = require('express').Router()
const ControllerChat = require('../controllers/chat')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/',ControllerChat.getAll)
router.post('/:id',ControllerChat.sendChat)
// router.delete('/:id',ControllerChat.dropChat)

module.exports = router