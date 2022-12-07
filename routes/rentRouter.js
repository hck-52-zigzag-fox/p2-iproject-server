const express = require("express");
const RentController = require("../controllers/rentController");
const router = express.Router();

router.post("/payment", RentController.handleMidtrans);

module.exports = router;
