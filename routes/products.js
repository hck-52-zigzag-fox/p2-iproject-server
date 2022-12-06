const express = require("express");
const ProductController = require("../controllers/productController");
const router = express.Router();

router.get("/", ProductController.getAllProduct);

module.exports = router;
