const { decrypt } = require("../helpers/bcrypt");
const verify = require("../helpers/googlelogin");
const { sign } = require("../helpers/jwt");
const { User } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({id: newUser.id})
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      let foundUser = User.findOne({
        where: {
          email
        }
      }) 
      if (foundUser) {
        let checkPassword = decrypt(password, foundUser.password)
        if (checkPassword) {
          let access_token = sign(foundUser.id)
          res.status(200).json({access_token, username: foundUser.username})
        } else {
          throw { name: "validation" };
        }
      } else {
        throw { name: "validation" };
      }   
    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res ,next) {
    try {
      let { google_token } = req.headers;
      let email = await verify(google_token)
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: email.split('@')[0], 
          email, 
          password: 'apalah'
        }
      });
      let access_token = sign(user.id)
      res.status(200).json({access_token, username: user.username})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
