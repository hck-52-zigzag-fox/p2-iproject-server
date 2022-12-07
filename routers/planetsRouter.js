const express = require("express")
const ControllerPlanet = require("../controllers/controllerPlanets")
const authenticate = require("../middlewares/authentication")
const errorHandler = require("../middlewares/errorHandler")
const router = express.Router()


router.get("/mainplanets", ControllerPlanet.getMainObjects)
router.get("/mainplanets/:planetName",ControllerPlanet.getObjectDetail)
router.post("/createobject",authenticate, ControllerPlanet.createObject)

router.use(errorHandler)
module.exports = router