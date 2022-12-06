const router = require('express').Router()
const ControllerChat = require('../controllers/chat')

router.get('/',ControllerChat.getAll)
router.post('/:id',ControllerChat.sendChat)
router.delete('/:id',ControllerChat.dropChat)

module.exports = router