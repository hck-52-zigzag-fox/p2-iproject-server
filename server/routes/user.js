const express = require('express')
const UserController = require('../controllers/userController')
const router = express()



router.post('/register', UserController.register)
router.post ('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)


module.exports = router