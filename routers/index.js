const express = require("express")
const router = express.Router()
const planetsRouter = require("./planetsRouter")
const usersRouter = require("./usersRouter")
const weatherRouter = require('./weatherRouter')

router.use("/planets", planetsRouter)
router.use("/users", usersRouter)
router.use("/weathers",weatherRouter)


module.exports = router