const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const router =  express.Router()

router.post("/:id", TransactionController.createTransaction)
router.post("/payment/:id", TransactionController.paymentMidtrans)

module.exports = router