const { foodLog } = require('../models')

const authorization = async (req, res, next) => {
    try {

        const UserId = req.user.id
        const { id } = req.params

        const log = await foodLog.findByPk(id)
        if (!log) {
            throw { name: 'notFound' }
        }

        if (UserId != gift.UserId) {
            throw { name: 'forbidden' }
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorization