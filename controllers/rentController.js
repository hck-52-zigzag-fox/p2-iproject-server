const midtransClient = require("midtrans-client");
const { User } = require("../models");

class RentController {
  static async handleMidtrans(req, res, next) {
    try {
      //   const price = +req.params.price;
      const id = +req.user.id;

      const foundUser = await User.findByPk(id);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-UVAFvVd--FOCIpD6uz_ZfLuF",
      });

      let parameter = {
        transaction_details: {
          order_id: `TRX${new Date().getTime()}`,
          gross_amount: 1000000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: foundUser.email,
          phone: foundUser.phoneNumber,
          address: foundUser.address,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RentController;
