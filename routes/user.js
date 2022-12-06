const router = require('express').Router()
const ControllerUser  = require('../controllers/user')

router.post('/register',ControllerUser.register)
router.post('/login',ControllerUser.login)
router.post('/google-login',ControllerUser.googleLogin)

module.exports = router
