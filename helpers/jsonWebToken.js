const jwt = require("jsonwebtoken")

function sign(input){
    return jwt.sign(input, process.env.SECRET)
}

function verify(input){
    return jwt.verify(input, process.env.SECRET)
}

module.exports = {sign, verify}