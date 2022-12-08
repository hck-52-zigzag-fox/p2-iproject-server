const express = require("express");
const MotorController = require("../controllers/motorController");
const router = express.Router();

router.get("/", MotorController.handleMotorcycles);
router.get("/:id", MotorController.handleDetailMotorcycle);

module.exports = router;
