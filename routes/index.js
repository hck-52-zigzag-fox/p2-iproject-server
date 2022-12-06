const { isLogin } = require("../middlewares/authentication");
const userRouter = require("./customerRouter");
const itemRouter = require("./itemRouter");
const orderRouter = require("./orderRouter");
const router = require("express").Router();

router.post("/customers", userRouter);

router.use(isLogin)
router.get("/items", itemRouter);
router.get("/orders", orderRouter);

module.exports = router;
