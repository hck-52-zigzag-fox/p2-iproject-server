const {verifyToken} = require('../helpers/')
const {User} = require('../models/')

async function authentication(req, res, next){
    try{
        let {access_token} = req.headers
        if(!access_token){
            throw {name: "Unauthorized"}
        }
        let payload = verifyToken(access_token)
        let user = await User.findOne({
            where: {
                id: payload.id,
                email: payload.email
            }
        })
        if(!user){
            throw {name: "InvalidToken"}
        }
        req.user = {
            id: payload.id,
            email: payload.email
        }
        next()
    }catch(err){
        next(err)
    }
}

module.exports = {authentication}