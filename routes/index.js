const router = require("express").Router();

const publicRouter = require("./public");
const privateRouter = require("./private");
router.get("/", (req, res, next) => {
  res.json({ message: "server is connected" });
});
router.use("/public", publicRouter);
router.use("/private", privateRouter);

module.exports = router;
