const router = require("express").Router();
const Auth = require("../../controllers/auth");

router.post("/register", Auth.registerUser);

module.exports = router;
