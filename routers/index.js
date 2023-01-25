const router = require('express').Router()
const users = require('./users')
const games = require('./games')
const transactions = require('./transactions')
const {authentication} = require('../middlewares/auth')

router.use('/users', users)
router.use('/games', games)

router.use(authentication)

router.use('/transactions', transactions)

module.exports = router