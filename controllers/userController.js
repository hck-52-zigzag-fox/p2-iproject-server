const {User} = require('../models/')
const {comparePassword, signToken} = require('../helpers/')

class UserController{
    static async register(req, res, next){
        try{
            let {email, password} = req.body
            let newUser = await User.create({email, password})
            res.status(201).json({id: newUser.id, email: newUser.email})
        }catch(err){
            next(err)
        }
    }

    static async login(req, res, next){
        try{
            let {email, password} = req.body
            if(!email || !password){
                throw {name: 'EmailPasswordRequired'}
            }
            let user = await User.findOne({where: {email}})
            if(!user){
                throw {name: 'InvalidCredentials'}
            }
            let isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword){
                throw {name: 'InvalidCredentials'}
            }
            let access_token = signToken({
                id: user.id,
                email
            })
            res.status(200).json({
                access_token,
                email
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = UserController