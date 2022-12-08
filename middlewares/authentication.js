const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {

    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: 'unauthorized' }
        }

        const payload = verifyToken(access_token)
        const id = payload.id

        const user = await User.findByPk(id)
        if (!user) {
            throw { name: 'unauthorized' }
        }

        req.user = {
            id,
            email: user.email
        }

        next()

    } catch (error) {
        next(error)
    }

}

module.exports = authentication