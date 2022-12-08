const router = require("express").Router();

const mentorRouter = require("./mentor");
const courseRouter = require("./course");
const chapterRouter = require("./chapter");
const lessonRouter = require("./lesson");

router.use("/mentors", mentorRouter);
router.use("/courses", courseRouter);
router.use("/chapters", chapterRouter);
router.use("/lessons", lessonRouter);

module.exports = router;
