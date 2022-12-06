const router = require('express').Router()
const ControllerCustomerOrder = require('../controllers/customerOrder')

router.get('/',ControllerCustomerOrder.getAll)
router.post('/',ControllerCustomerOrder.addOrder)

module.exports = router