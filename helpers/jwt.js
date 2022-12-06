const jwt = require("jsonwebtoken")

const createToken = (payload) => jwt.sign(payload, "RAHASIA")
const verifyToken = (taken) => jwt.verify(taken,"RAHASIA")

module.exports = { createToken, verifyToken}