const express = require("express");
const ProductController = require("../controllers/productController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.use(authentication);
router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProductById);

module.exports = router;
