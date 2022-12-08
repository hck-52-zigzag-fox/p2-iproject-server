const express = require("express")
const ControllerWeather = require("../controllers/controllerWeather")
const errorHandler = require("../middlewares/errorHandler")
const app = express()
const router = express.Router()

router.get("/", ControllerWeather.getWeather)



router.use(errorHandler)
module.exports = router