require("dotenv").config();
const express = require("express");
const Controller = require("../Controllers");
const { authentication, authorization } = require('../middlewares/index')
const router = express.Router();

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login-google', Controller.loginUserGoogle)
router.use(authentication)
router.get('/teams', Controller.showTeams)
router.get('/players', Controller.showPlayer)
router.patch('/upgrade', Controller.updateStatus)
router.get('/matches', Controller.showMatches)

module.exports = router;