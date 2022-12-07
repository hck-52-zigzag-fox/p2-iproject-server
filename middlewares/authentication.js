const { verify } = require("../helpers/jsonWebToken")
const {User} = require("../models")



const authenticate = async (req, res,next)=>{
    try {

        let accessToken = req.headers.access_token
        if (!accessToken) {
            throw { name: `Unauthorized` }
        }

        let payload = verify(accessToken)

        // console.log(payload);
        let user = await User.findByPk(payload.id)
        // console.log(user);
        if (!user) {
            throw { name: `Unauthorized` }
        }
        req.user = { id: user.id }
        req.user.email = user.email
        next()
    } catch (error) {

        next(error)
    }
}

module.exports=authenticate