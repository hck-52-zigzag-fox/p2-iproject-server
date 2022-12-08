const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");
const CategoryRoutes = require("./CategoryRoutes");
const EmployeeRoutes = require("./EmployeeRoutes");
const TransactionRoutes = require("./TransactionRoutes");
const NewsRoutes = require("./NewsRoutes");
const { authentification } = require("../middleware/middleware");

router.use("/users", UserRoutes);
router.use("/news", NewsRoutes);
router.use(authentification);
router.use("/categories", CategoryRoutes);
router.use("/employees", EmployeeRoutes);
router.use("/transactions", TransactionRoutes);

module.exports = router;
