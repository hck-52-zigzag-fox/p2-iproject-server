const express = require('express')
const router = express.Router()
const userRoute = require('./users')
const productRoute = require('./product')

router.use('/users', userRoute)
router.use('/product', productRoute)


module.exports = router