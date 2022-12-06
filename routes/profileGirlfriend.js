const router = require('express').Router()
const ControllerProfileGirlfriend = require('../controllers/profileGirlfriend')

router.get('/',ControllerProfileGirlfriend.getAll)
router.post('/',ControllerProfileGirlfriend.addProfileGirlfriend)

module.exports = router