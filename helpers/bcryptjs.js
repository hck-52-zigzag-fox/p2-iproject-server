const bcrypt = require("bcryptjs")

function hash(password){
return bcrypt.hashSync(password)
}

function compare(password,realPassword){
    // console.log(password, realPassword);
    return bcrypt.compareSync(password, realPassword)
}


module.exports = {hash,compare}