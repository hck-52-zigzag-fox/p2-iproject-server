const jwt = require("jsonwebtoken");
// const SECRET = "rahasia";

const createToken = (payload) => jwt.sign(payload, process.env.SECRET);

const verifyToken = (token) => jwt.verify(token, process.env.SECRET);
module.exports = { createToken, verifyToken };
