const express = require('express')
const router = express.Router()
const userRoute = require('./users')
const productRoute = require('./product')
const wishListRoute = require('./wishList')
const categoryRoute = require('./category')

router.use('/users', userRoute)
router.use('/product', productRoute)
router.use('/wishlist', wishListRoute)
router.use('/category', categoryRoute)


module.exports = router