const { comparePass, createToken } = require('../helpers');
const {User} = require('../models')
class UserController {
    static async register(req, res, next) {
        try {
          const { email, password, username, phoneNumber, address } = req.body;
          const newUser = await User.create({
            email,
            password,
            username,
            role: "admin",
            phoneNumber,
            address,
          });
          // if (newUser) {
          res.status(201).json({
            id: newUser.id,
            email: newUser.email
          });
          // }
        } catch (error) {
          // console.log(error);
          next(error);
        }
      }
      static async login(req, res, next) {
        try {
          const {email,password} = req.body;
          if (!email || !password) {
            throw {
              name: "ErrorEmptyInput",
            };
          }
          const loginUser = await User.findOne({
            where: { email },
          });
          if (!loginUser) {
            throw { name: `INVALID_CREDENTIALS` };
          }
          // untuk menyamakan pass
          const compare = comparePass(password, loginUser.password);
          if (!compare) {
            throw { name: `INVALID_CREDENTIALS` };
          }
          let payload = { id: loginUser.id };
          const getToken = createToken(payload);
          req.headers = { access_token: getToken };
          res.status(201).json({ 
            email: loginUser.email,
            access_token: getToken });
        } catch (error) {
          // console.log(error);
          next(error);
        }
      }

}

module.exports = UserController