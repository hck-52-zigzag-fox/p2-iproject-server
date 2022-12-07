const express = require("express")
const ControllerPlanet = require("../controllers/controllerPlanets")
const router = express.Router()


router.get("/mainplanets", ControllerPlanet.getMainObjects)
router.get("/mainplanets/:planetName",ControllerPlanet.getObjectDetail)

module.exports = router