const jwt = require("jsonwebtoken");
const SECRET = "iproject";

const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET);
  return token;
};

const verifyToken = (token) => {
  const checked = jwt.verify(token, SECRET);
  return checked;
};

module.exports = { createToken, verifyToken };
