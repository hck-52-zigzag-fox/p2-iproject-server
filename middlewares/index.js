const { User } = require('../models/index')
const { verifyToken } = require('../helpers/index')

//Authentication
async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: "Unauthorized" };
        }
        const payload = verifyToken(access_token);

        const foundUser = await User.findByPk(payload.id);
        if (!foundUser) {
            throw { name: "Unauthorized" };
        }

        req.user = {
            id: foundUser.id,
            email: foundUser.email,
            status: foundUser.status,
        };
        next();
    } catch (err) {
        next(err)
    }
}

//Authorization
async function authorization(req, res, next) {
    try {
        if (req.user.status !== "VIP") {
            throw { name: "Forbidden" };
        }
        next();
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization }