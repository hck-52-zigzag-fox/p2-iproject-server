const midtransClient = require("midtrans-client");
const { User, Transaction, Employee } = require("../models");

class TransactionController {
  static async paymentMidtrans(req, res, next) {
    try {
      const id = req.params.id;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });

      const foundUser = await User.findByPk(id);
      const foundEmployee = await Employee.findByPk(id);

      let parameter = {
        transaction_details: {
          order_id: `TRX${new Date().getTime()}`,
          gross_amount: foundEmployee.salary,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: foundUser.email,
          phone: foundUser.phoneNumber,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(200).json(midtransToken);
    } catch (err) {
      console.log("err", err);
    }
  }

  static async createTransaction(req, res, next) {
    try {
      const EmployeeId = req.params.id;
      const UserId = req.user.id;

      const foundEmployee = await Employee.findByPk(EmployeeId)
      if (!foundEmployee) {
        throw {name: "NOT_FOUND"}
      }
      
      const transaction = await Transaction.create({ UserId, EmployeeId });
      res.status(201).json(transaction)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
