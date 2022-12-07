const router = require("express").Router();
const { ProfileController } = require("../controllers/");
const { upload } = require("../middlewares/cloudinary");
router.get("/", ProfileController.getProfile);
router.put(
  "/edit",
  upload.single("profilePict"),
  ProfileController.editProfile
);
module.exports = router;
