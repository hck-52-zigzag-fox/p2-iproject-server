const express = require("express");
const router = express.Router();
const Controller = require('../controllers/userController');

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/googlelogin', Controller.googleLogin)
router.patch('/premium/:userId', Controller.subscribe)
router.post('/payment/:userId', Controller.midtransPayment)
router.get('/:userId', Controller.getOne)

module.exports = router