const { compare } = require("../helpers/bcryptjs");
const { sign } = require("../helpers/jsonWebToken");
const {User} = require("../models")

class ControllerUser{
    static async register(req, res, next){
        try{
            const {email, password} = req.body

            let user = await User.create({
                email, password
            })

            res.status(201).json({
                id:user.id, email:user.email
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:"Internal Server Error"
            })
        }
    }

    static async login(req, res, next){
        try{

            const {email, password} = req.body

            console.log(email,password);
            if(!email){
                throw {name:"missing", value:"Email"}
            }
            if(!password){
                throw {name:"missing", value:"Password"}
            }

            const user = await  User.findOne({where :{email}})

            if(!user){
                throw {name:"Invalid email/password"}
            }

            // console.log(`test 1`, user);
            let checkPassword = compare(password, user.password)

            // console.log(`test 2`);
            if(!checkPassword){
                throw {name:"Invalid email/password"}
            }

            let access_token = sign({id:user.id})

            res.status(200).json({
                access_token, email:user.email
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:error
            })
        }
    }

}


module.exports = ControllerUser