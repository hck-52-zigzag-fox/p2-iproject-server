const express = require("express")
const ControllerPlanet = require("../controllers/controllerPlanets")
const router = express.Router()


router.get("/mainplanets", ControllerPlanet.getMainPlanets)
router.get("/mainplanets/:planetName",ControllerPlanet.getPlanetDetail)

module.exports = router