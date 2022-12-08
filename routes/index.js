const express = require('express')
const router = express.Router()
const userRoute = require('./users')
const productRoute = require('./product')
const orderRoute = require('./orders')
const categoryRoute = require('./category')

router.use('/users', userRoute)
router.use('/product', productRoute)
router.use('/order', orderRoute)
router.use('/category', categoryRoute)


module.exports = router