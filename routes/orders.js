const router = require("express").Router();
const OrderController= require("../controllers/orderController");
const { authentication} = require("../middlewares");

router.get('/city', OrderController
.ongkir)
router.post('/ongkir', OrderController
.cost)
router.use(authentication)
router.get("/", OrderController
.readProduct);
router.post("/add/:id", OrderController
.addProduct);
router.delete("/:id", OrderController
.deleteProduct); 
router.patch('/:id', OrderController
.updateStatus)
router.post('/payment', OrderController
.midtrans)


module.exports = router;
