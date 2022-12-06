const express = require('express')
const CategoryController = require('../controllers/categoryController')
const router = express.Router()

router.get('/', CategoryController.fetchData)
module.exports = router
