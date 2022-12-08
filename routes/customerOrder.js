const router = require('express').Router()
const ControllerCustomerOrder = require('../controllers/customerOrder')
const authentication = require('../middlewares/authentication')
const { authorizeOrder } = require('../middlewares/authorization')

router.use(authentication)
router.get('/',ControllerCustomerOrder.getAll)
router.post('/:girlfriendId',authorizeOrder,ControllerCustomerOrder.addOrder)

module.exports = router