const bcrypt = require("bcryptjs");

function encrypt(input) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(input, salt);
}

function decrypt(password, encrypted) {
  return bcrypt.compareSync(password, encrypted);
}

module.exports = { encrypt, decrypt };
