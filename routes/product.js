const express = require('express')
const ProductController = require('../controllers/productController')
const router = express.Router()

router.get('/', ProductController.fetchData)
router.post('/', ProductController.fetchData)
module.exports = router