const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();
const authentication = require("../middlewares/authentication")

router.post("/register", controller.register,);
router.post("/login", controller.login);
router.post("/googleLogin", controller.googleLogin)
router.get("/speech", controller.speechToText)

router.get("/products", controller.paginationAndFiltering)
router.get("/products/:id", controller.findOne)
router.get("/categories", controller.showCategories)

router.use(authentication);

router.get("/bookmarks", controller.readBookmark)
router.post("/midtrans", controller.checkout)
router.delete("/bookmarks/customer/:CustomerId",controller.deleteAllBookmark )
router.post("/bookmarks/:ProductId",/*authorizationPublic,*/controller.addBookmark)
router.delete("/bookmarks/:ProductId",/*authorizationPublic,*/controller.deleteBookmark)


module.exports = router;
