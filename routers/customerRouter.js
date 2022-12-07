const express = require("express");
const controllerCustomer = require("../controllers/controller");
const router = express.Router();
const authentication = require("../middlewares/authentication")

router.post("/register", controllerCustomer.register,);
router.post("/login", controllerCustomer.login);
router.post("/googleLogin", controllerCustomer.googleLogin)

router.get("/products", controllerCustomer.paginationAndFiltering)
router.get("/products/:id", controllerCustomer.findOne)
router.get("/categories", controllerCustomer.showCategories)

router.use(authentication);

router.get("/bookmarks", controllerCustomer.readBookmark)
router.post("/bookmarks/:ProductId",/*authorizationPublic,*/controllerCustomer.addBookmark)
router.delete("/bookmarks/:ProductId",/*authorizationPublic,*/controllerCustomer.deleteBookmark)


module.exports = router;
