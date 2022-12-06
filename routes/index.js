const router = require("express").Router();

const publicRouter = require("./public");
const privateRouter = require("./private");

router.use("/public", publicRouter);
router.use("/private", privateRouter);

module.exports = router;
