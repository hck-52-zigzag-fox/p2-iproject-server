const router = require("express").Router();

const Mentor = require("../../controllers/mentor");
const authentication = require("../../middlewares/authentication");

router.use(authentication);
router.get("/", Mentor.getMentors);
router.post("/", Mentor.insertMentor);
router.get("/:id", Mentor.getMentor);
router.put("/:id", Mentor.updateMentor);
router.delete("/:id", Mentor.destroyMentor);

module.exports = router;
