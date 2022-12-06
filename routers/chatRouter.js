const express = require("express");
const ControllerChat = require("../controllers/controllerChat");
const router = express.Router();

router.get("/", ControllerChat.showChat)
router.post("/upload",ControllerChat.uploadChat)

module.exports = router