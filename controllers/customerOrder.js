const { CustomerOrder, User, ProfileGirlfriend } = require("../models");
const midtransClient = require('midtrans-client')
class ControllerCustomerOrder {
  static async addOrder(req, res, next) {
    try {
      const { girlfriendId } = req.params;
      const { orderType, startDate, endDate } = req.body;
      const userOrder = User.findByPk(req.user.id)
      const girlfriend = await ProfileGirlfriend.findByPk(+girlfriendId);
      const  newOrder = await CustomerOrder.create({
        orderType,
        startDate,
        endDate,
        UserId: req.user.id,
        ProfileGirlfriendId: girlfriend.id,
      });
      let orderId = 1670324782393 
      let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : "SB-Mid-server-_VxrMj05f_QujApqL5g4kvRB",
        clientKey : "SB-Mid-client-wWTJCXC67v6bRKn0"
      });
      let parameter = {
        transaction_details: {
          order_id: `${orderId}`+Math.round((new Date()).getTime() / 1000),
          gross_amount: girlfriend.price
        },
        customer_details:{
          email:userOrder.email
        }
      };
      const token = await snap.createTransactionToken(parameter)
      console.log(token,'dari payment')
      res.status(201).json({token,order:newOrder});
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const myOrders = await CustomerOrder.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [{ model: User }, { model: ProfileGirlfriend }],
      });
      res.status(200).json(myOrders);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerCustomerOrder;
