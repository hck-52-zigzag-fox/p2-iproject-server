const { CustomerOrder, User, ProfileGirlfriend } = require("../models");
const midtransClient = require("midtrans-client");
const { Op } = require("sequelize");
class ControllerCustomerOrder {
  static async addOrder(req, res, next) {
    try {
      const { girlfriendId } = req.params;
      const { orderType, startDate, endDate } = req.body;
      const userOrder = User.findByPk(req.user.id);
      const girlfriend = await ProfileGirlfriend.findByPk(+girlfriendId);
      const newOrder = await CustomerOrder.create({
        orderType,
        startDate,
        endDate,
        UserId: req.user.id,
        ProfileGirlfriendId: girlfriend.id,
      });
      let orderId = 1670324782393;
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-_VxrMj05f_QujApqL5g4kvRB",
      });
      let parameter = {
        transaction_details: {
          order_id: `${orderId}` + Math.round(new Date().getTime() / 1000),
          gross_amount: girlfriend.price,
        },
        customer_details: {
          email: userOrder.email,
        },
      };
      const token = await snap.createTransactionToken(parameter);
      console.log(token, "dari payment");
      res.status(201).json({ token, order: newOrder });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const myOrders = await CustomerOrder.findAll({
        where: {
          [Op.or] : [{UserId : req.user.id},{ProfileGirlfriendId:req.user.profileId}]
        },
        include: [
          { model: User ,attributes :  ['id','email','role']},
          { model: ProfileGirlfriend, include: [{ model: User ,attributes :  ['id','email','role']}] },
        ],
      });
      res.status(200).json(myOrders);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

module.exports = ControllerCustomerOrder;
