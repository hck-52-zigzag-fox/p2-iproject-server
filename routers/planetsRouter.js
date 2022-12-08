const express = require("express")
const ControllerPlanet = require("../controllers/controllerPlanets")
const authenticate = require("../middlewares/authentication")
const errorHandler = require("../middlewares/errorHandler")
const router = express.Router()


router.get("/mainplanets", ControllerPlanet.getMainObjects)
router.get("/mainplanets/:planetName",ControllerPlanet.getObjectDetail)
router.post("/createobject",authenticate, ControllerPlanet.createObject)
router.get("/customObjects", ControllerPlanet.getCustomObject)
router.get("/suggestions", ControllerPlanet.getSuggestion)

router.use(errorHandler)
module.exports = router