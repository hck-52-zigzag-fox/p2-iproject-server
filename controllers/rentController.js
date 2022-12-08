const midtransClient = require("midtrans-client");
const { User, Motorcycle, Rent } = require("../models");

class RentController {
  static async handleCreateRent(req, res, next) {
    try {
      const UserId = +req.user.id;
      const MotorcycleId = +req.params.id;

      const foundMotorcycle = await Motorcycle.findByPk(MotorcycleId);
      if (!foundMotorcycle) {
        throw { name: "NOT_FOUND" };
      }

      const newRent = await Rent.create({
        UserId,
        MotorcycleId,
      });
      res.status(201).json(newRent);
    } catch (err) {
      nexy(err);
    }
  }
  static async handleStatus(req, res, next) {
    try {
      const id = +req.params.id;

      const foundMotorcycle = await Motorcycle.findByPk(id);
      if (!foundMotorcycle) {
        throw { name: "NOT_FOUND" };
      }

      await Motorcycle.update(
        {
          status: "booked",
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Motorcycle has been booked" });
    } catch (err) {
      next(err);
    }
  }
  static async handleMidtrans(req, res, next) {
    try {
      const price = +req.params.price;
      const trxcode = req.params.trxcode;
      const id = +req.user.id;

      const foundUser = await User.findByPk(id);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-UVAFvVd--FOCIpD6uz_ZfLuF",
      });

      let parameter = {
        transaction_details: {
          order_id: trxcode,
          gross_amount: price,
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
