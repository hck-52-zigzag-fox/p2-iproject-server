const express = require("express");
const Controller = require("../Controllers");
const router = express.Router();

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.patch('/users/:id', Controller.updateStatus)

module.exports = router;