const router = require("express").Router();

const publicRouter = require("./public");

router.use("/public", publicRouter);
module.exports = router;
