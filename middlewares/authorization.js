const {  } = require('../models')

const authorization = async (req, res, next) => {
    try {

        const UserId = req.user.id
        const { id } = req.params

        const user = await U.findByPk(id)
        if (!gift) {
            throw { name: 'notFound' }
        }

        if (receiverId != gift.receiverId) {
            throw { name: 'forbidden' }
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorization