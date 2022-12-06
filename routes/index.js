const router = require('express').Router()

const userRoutes = require('./user')
const profileGirlfriendRoutes = require('./profileGirlfriend')
const chatRoutes = require('./chat')
const customerOrderRoutes = require('./customerOrder')

router.use(userRoutes)
router.use('/customer-orders',customerOrderRoutes)
router.use('/chats',chatRoutes),
router.use('/profile-girlfriends',profileGirlfriendRoutes)

module.exports = router