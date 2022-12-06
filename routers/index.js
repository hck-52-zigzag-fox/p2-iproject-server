const express = require("express")
const router = express.Router()
const planetsRouter = require("./planetsRouter")

router.use("/planets", planetsRouter)




module.exports = router