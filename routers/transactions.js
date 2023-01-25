const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const {authorization} = require('../middlewares/auth')

router.post('/order', TransactionController.createOrder)

router.use('/order/:id', authorization)

router.post('/order/:id', TransactionController.generateToken)

router.patch('/order/:id', TransactionController.checkOutOrder)

router.delete('/order/:id', TransactionController.cancelOrder)

module.exports = router