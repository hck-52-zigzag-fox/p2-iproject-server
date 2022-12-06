const router = require("express").Router();
const mentorRouter = require("./mentor");
const courseRouter = require("./course");

router.use("/mentors", mentorRouter);
router.use("/courses", courseRouter);

module.exports = router;
