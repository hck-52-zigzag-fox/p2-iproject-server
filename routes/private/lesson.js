const router = require("express").Router();

const Lesson = require("../../controllers/lesson");
const authentication = require("../../middlewares/authentication");
const { upload } = require("../../helpers/index");

router.use(authentication);
router.get("/", Lesson.getLessons);
router.post("/", upload.single("video"), Lesson.insertLesson);
router.get("/:id", Lesson.getLesson);
router.put("/:id", Lesson.updateLesson);
router.delete("/:id", Lesson.destroyLesson);

module.exports = router;
