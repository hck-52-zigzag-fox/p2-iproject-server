const { isLogin } = require("../middlewares/authentication");
const userRouter = require("./customerRouter");
const itemRouter = require("./itemRouter");
const orderRouter = require("./orderRouter");
const router = require("express").Router();

router.use("/customers", userRouter);

router.use(isLogin)
router.use("/items", itemRouter);
router.use("/orders", orderRouter);

module.exports = router;
