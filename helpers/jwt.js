const jwt = require('jsonwebtoken')
const SECRET = 'abcdefg'

const createToken = (payload) => {
    return jwt.sign(payload, SECRET)
}

const verifyToken = (payload) => {
    return jwt.verify(payload, SECRET)
}

module.exports = {createToken, verifyToken}