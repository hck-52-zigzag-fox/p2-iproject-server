const ItemController = require("../controllers/itemController");
const OrderController = require("../controllers/orderControllers");
const UserController = require("../controllers/userController");
const { isLogin } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/customers/login", UserController.loginCustomer);

router.use(isLogin)
router.get("/items", ItemController.fetchItems);
router.get("/orders", OrderController.fetchOrder);

module.exports = router;
