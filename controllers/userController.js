const { decrypt } = require("../helpers/bcrypt");
const verify = require("../helpers/googlelogin");
const { sign } = require("../helpers/jwt");
const { User } = require("../models/index");
const midtransClient = require('midtrans-client');

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
        status: "Free",
      });
      res.status(201).json({ id: newUser.id });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body);
      let { email, password } = req.body;
      let foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (foundUser) {
        let checkPassword = decrypt(password, foundUser.password);
        if (checkPassword) {
          let access_token = sign(foundUser.id);
          res.status(200).json({
            access_token,
            username: foundUser.username,
            id: foundUser.id,
          });
        } else {
          throw { name: "validation" };
        }
      } else {
        throw { name: "validation" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let { google_token } = req.headers;
      let email = await verify(google_token);
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: email.split("@")[0],
          email,
          password: "12345678",
          status: "Free",
        },
      });
      let access_token = sign(user.id);
      res
        .status(200)
        .json({ access_token, username: user.username, id: user.id });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      let { userId } = req.params;
      let foundUser = await User.findByPk(userId);
      res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  }

  static async subscribe(req, res, next) {
    try {
      let { userId } = req.params;
      let updateUser = await User.update(
        {
          status: "Paid",
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  }

  static async midtransPayment(req, res, next) {
    try {
      let user = await User.findByPk(req.params.userId)
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-Ldj8fYlBEtwoVskPDEf4mgsg",
      });

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email
        },
      };

      const midtranstoken = await snap.createTransaction(parameter)
      res.status(200).json(midtranstoken)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
