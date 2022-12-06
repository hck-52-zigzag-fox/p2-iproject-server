const sendMail = require("../helpers/nodemailer");
const { User } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let Users = await User.create({
        username,
        email,
        password,
      });
      sendMail(email, username);
      res.status(201).json({
        id: Users.id,
        email: Users.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
