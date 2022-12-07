const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { authentification } = require("../middleware/middleware");
const router =  express.Router()

router.use(authentification)
router.get('/', CategoryController.readCategory)

module.exports = router