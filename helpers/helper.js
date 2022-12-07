const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = 'kepoDeh'

function hashPassword(password){
    let hash = bcrypt.hashSync(password, 5)
    return hash
}

function comparePassword(password, hash){
    let compare = bcrypt.compareSync(password, hash)
    return compare
}

function signToken(payload){
    let token = jwt.sign(payload, SECRET)
    return token
}

function verifyToken(token){
    let verify = jwt.verify(token, SECRET)
    return verify
}


module.exports = {hashPassword, comparePassword, verifyToken, signToken}