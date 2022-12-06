const router = require("express").Router();
const Auth = require("../../controllers/auth");

router.post("/register", Auth.registerUser);
router.post("/login", Auth.loginUser);

module.exports = router;
