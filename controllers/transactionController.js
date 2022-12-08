const midtransClient = require("midtrans-client");
const { Transaction } = require("../models/");

class TransactionController {
  static async createOrder(req, res, next) {
    try {
      let UsersId = req.user.id;
      let { steamAppID, gameID } = req.body;
      let status = "unpaid";
      let transaction = await Transaction.findOne({
        where: {
          UsersId,
          steamAppID,
          gameID,
        },
      });
      if (transaction) {
        if (transaction.status === "paid") {
          throw { name: "AlreadyOwned" };
        } else {
          await Transaction.destroy({ where: { id: transaction.id } });
        }
      }
      let newTransaction = await Transaction.create({
        UsersId,
        steamAppID,
        gameID,
        status,
      });
      res.status(201).json(newTransaction);
    } catch (err) {
      next(err);
    }
  }

  static async generateToken(req, res, next) {
    try {
      let email = req.user.email;
      let { id } = req.params;
      let { price } = req.body;
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id: `order-${id}-${new Date().getTime()}`,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email,
        },
      };
      let transactionToken = await snap.createTransaction(parameter);
      res.status(201).json(transactionToken);
    } catch (err) {
      next(err);
    }
  }

  static async checkOutOrder(req, res, next) {
    try {
      let { id } = req.params;
      await Transaction.update({ status: "paid" }, { where: { id } });
      res.status(200).json({ message: `Transaction completed` });
    } catch (err) {
      next(err);
    }
  }

  static async cancelOrder(req, res, next) {
    try {
      let { id } = req.params;
      await Transaction.destroy({ where: { id } });
      res.status(200).json({ message: `Order successfully cancelled` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
