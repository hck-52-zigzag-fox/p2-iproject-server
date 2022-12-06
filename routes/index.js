const UserController = require("../controllers/userController");

const router = require("express").Router();

router.post("/customers/login", UserController.loginCustomer);
router.get("/items");
router.get("/orders");

module.exports = router;
