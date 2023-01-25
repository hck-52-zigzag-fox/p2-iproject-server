const {verifyToken} = require('../helpers/')
const {User, Transaction} = require('../models/')

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

async function authorization(req, res, next){
    try{
        let {id} = req.params
        let UsersId = req.user.id
        let transaction = await Transaction.findOne({where: {id}})
        if(!transaction){
            throw {name: "DataNotFound"}
        }
        if(transaction.status == "paid"){
            throw {name: "AlreadyPaid"}
        }
        if(transaction.UsersId !== UsersId){
            throw {name: "Forbidden"}
        }
        next()
    }catch(err){
        next(err)
    }
}

module.exports = {authentication, authorization}