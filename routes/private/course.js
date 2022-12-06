const router = require("express").Router();

const { upload } = require("../../helpers/index");
const Course = require("../../controllers/courses");

router.get("/", Course.getCourses);
router.post("/", upload.single("thumbnail"), Course.insertCourse);
router.get("/:id", Course.getCourse);
router.put("/:id", upload.single("thumbnail"), Course.updateCourse);
router.patch("/:id", Course.patchStatusCourse);
router.delete("/:id", Course.destroyCourse);
module.exports = router;
