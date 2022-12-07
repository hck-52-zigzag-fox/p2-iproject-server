const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const router =  express.Router()

router.get('/', EmployeeController.readEmployee)
router.get('/:id', EmployeeController.findEmployee)

module.exports = router