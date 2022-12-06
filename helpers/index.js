const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashPwd) => {
  return bcrypt.compareSync(password, hashPwd);
};

const jwtSign = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

const jwtVerify = (payload, secret) => {
  return jwt.verify(payload, secret);
};
module.exports = {
  hashPassword,
  comparePassword,
  jwtSign,
  jwtVerify,
};
