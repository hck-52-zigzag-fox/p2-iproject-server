const express = require("express");
const router = express.Router();
const customer = require("./customerRouter")

router.get("/", (req, res) => {
  res.send(`Hello World Sekut Banget`);
});

router.use("/pub", customer)

module.exports = router;
