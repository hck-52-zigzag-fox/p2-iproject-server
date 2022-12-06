const express = require("express");
const ControllerTopic = require("../controllers/controllerTopic");
const router = express.Router();

router.get("/",ControllerTopic.showTopic)
router.post("/show",ControllerTopic.createTopic)
router.delete("/delete/:TopicId", ControllerTopic.deleteTopic)

module.exports = router