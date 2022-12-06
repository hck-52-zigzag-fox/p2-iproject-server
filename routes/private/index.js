const router = require("express").Router();
const mentorRouter = require("./mentor");

router.use("/mentors", mentorRouter);

module.exports = router;
