const bcrypt = require('bcryptjs')

const createHash = (rawPw) => {
    return bcrypt.hashSync(rawPw, 8)
}

const compareHash = (inputPw, dbPw) => {
    return bcrypt.compareSync(inputPw, dbPw)
}

module.exports = { createHash, compareHash }