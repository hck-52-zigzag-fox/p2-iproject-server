const router = require("express").Router();
const { ProfileController } = require("../controllers/");
const { authentication, upload } = require("../middlewares");
router.post(
  "/create",
  upload.single("profilePicture"),
  ProfileController.createProfile
);

module.exports = router;
