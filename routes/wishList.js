const router = require("express").Router();
const Wishlist = require("../controllers/wishList");
const { authentication } = require("../middlewares");

router.use(authentication)
router.get("/", Wishlist.readProduct);
router.post("/add/:id", Wishlist.addProduct);
router.delete("/:id", Wishlist.deleteProduct); // MASIH ERROR
router.patch('/:id', Wishlist.updateStatus)

module.exports = router;
