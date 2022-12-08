const express = require("express");
const NewsController = require("../controllers/newsController");
const router = express.Router();

router.get("/", NewsController.handleNews);

module.exports = router;
