const express = require("express");
const RentController = require("../controllers/rentController");
const router = express.Router();

router.post("/payment/:price/:trxcode", RentController.handleMidtrans);
router.patch("/:id", RentController.handleStatus);
router.post("/:id", RentController.handleCreateRent);

module.exports = router;
