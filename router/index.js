const express = require("express");
const router = express.Router();
const UserRoutes = require('./UserRoutes')
const CategoryRoutes = require('./CategoryRoutes')
const EmployeeRoutes = require('./EmployeeRoutes');
const { authentification } = require("../middleware/middleware");

router.use('/users', UserRoutes)
router.use(authentification)
router.use('/categories', CategoryRoutes)
router.use('/employees', EmployeeRoutes)

module.exports = router