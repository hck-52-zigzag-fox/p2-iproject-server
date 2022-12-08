const express = require("express");
const NewsController = require("../controllers/NewsController");
const router =  express.Router()

router.get('/', NewsController.readNews)

module.exports = router