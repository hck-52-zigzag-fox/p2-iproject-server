const express = require("express")
const router = express.Router()
const planetsRouter = require("./planetsRouter")
const usersRouter = require("./usersRouter")

router.use("/planets", planetsRouter)
router.use("/users", usersRouter)



module.exports = router