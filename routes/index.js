const express = require('express')
const router = express.Router()
const userRoute = require('./users')
const productRoute = require('./product')
const usersProduct = require('./usersProduct')

router.use('/users', userRoute)
router.use('/product', productRoute)
router.use('/userProduct', usersProduct)


module.exports = router