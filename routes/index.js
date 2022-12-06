const router = require('express').Router()
const user = require('./userRoute');
const movie = require('./movieRoute');

router.use('/', user)
router.use('/movie', movie)



module.exports = router