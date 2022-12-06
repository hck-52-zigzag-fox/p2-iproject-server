const express = require("express");
const router = express.Router();
const user = require('./userRouter')
const topic = require('./topicRouter')
const chat = require('./chatRouter')

router.use("/users", user)
router.use("/topics", topic)
router.use("/chats", chat)

module.exports = router;
