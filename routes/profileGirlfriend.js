const router = require("express").Router();
const ControllerProfileGirlfriend = require("../controllers/profileGirlfriend");
const authentication = require("../middlewares/authentication");
const { authorizeRole } = require("../middlewares/authorization");

router
  .get("/", ControllerProfileGirlfriend.getAll)
  .use(authentication)
  .post("/", authorizeRole, ControllerProfileGirlfriend.addProfileGirlfriend);

module.exports = router;
