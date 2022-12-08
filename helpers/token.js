const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
};

const verifyToken = (token) => {
  const checked = jwt.verify(token, process.env.SECRET);
  return checked;
};

module.exports = { createToken, verifyToken };
