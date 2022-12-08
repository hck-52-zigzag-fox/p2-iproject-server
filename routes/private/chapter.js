const router = require("express").Router();

const Chapter = require("../../controllers/chapter");
const authentication = require("../../middlewares/authentication");

router.use(authentication);
router.get("/", Chapter.getChapters);
router.post("/", Chapter.insertChapter);
router.get("/:id", Chapter.getChapter);
router.put("/:id", Chapter.updateChapter);
router.delete("/:id", Chapter.destroyChapter);
module.exports = router;
