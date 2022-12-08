const jwt = require("jsonwebtoken");
let secret = process.env.SECRET;

function sign(id) {
  return jwt.sign({ id: id }, secret);
}

function verify(signed) {
  return jwt.verify(signed, secret);
}

module.exports = { sign, verify };
