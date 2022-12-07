const {User} = require('../models/')

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
}

module.exports = UserController