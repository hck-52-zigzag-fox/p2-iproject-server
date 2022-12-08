const router = require("express").Router();
const { ProfileController } = require("../controllers/");
const { upload } = require("../middlewares/cloudinary");
router.get("/all", ProfileController.getAllProfile);
module.exports = router;
router.get("/", ProfileController.getProfile);
router.get("/:id", ProfileController.getProfileById);
router.put(
  "/edit",
  upload.single("profilePict"),
  ProfileController.editProfile
);
