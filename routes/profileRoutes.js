const router = require("express").Router();
const { ProfileController } = require("../controllers/");
const { authentication, upload } = require("../middlewares");
router.put(
  "/edit",
  upload.single("profilePict"),
  ProfileController.editProfile
);
module.exports = router;
