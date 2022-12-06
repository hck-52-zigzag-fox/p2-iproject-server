const bcrpt = require('bcryptjs')

module.exports = {
  hashPass(password){
    return bcrpt.hashSync(password,8)
  },
  comparePass(password,hash){
    return bcrpt.compareSync(password,hash)
  }
}