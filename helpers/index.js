const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')

module.exports = {
    hassPass(password){
        return bcrypt.hashSync(password,10)
    },
    comparePass(password,hashedPass){
        return bcrypt.compareSync(password,hashedPass)
    },
    createToken(payload){
        return jwt.sign(payload, process.env.SECRET)
    },
    verifyToken(token){
        return jwt.verify(token,process.env.SECRET)
    }
}