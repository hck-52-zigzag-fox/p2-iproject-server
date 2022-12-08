const { User, foodLog } = require('../models')

// check if paidUser
const authorizationStatus = async (req, res, next) => {
    try {

        const UserId = req.user.id

        const user = await User.findByPk(UserId)
        if (user.status != 'paid') {
            throw { name: 'forbidden' }
        }

        next()

    } catch (error) {
        next(error)
    }
}

// check if log is user's
const authorization = async (req, res, next) => {
    try {

        const UserId = req.user.id
        const { id } = req.params

        const log = await foodLog.findByPk(id)
        if (!log) {
            throw { name: 'notFound' }
        }

        if (UserId != log.UserId) {
            throw { name: 'forbidden' }
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {authorization, authorizationStatus}