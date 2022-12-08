const express = require("express")
const ControllerUser = require("../controllers/controllerUsers")
const errorHandler = require("../middlewares/errorHandler")
const router = express.Router()

router.post("/register",ControllerUser.register )
router.post("/login", ControllerUser.login)


router.use(errorHandler)
module.exports = router