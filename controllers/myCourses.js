const midtransClient = require("midtrans-client");

const { User, Course, MyCourse, Order, Chapter } = require("../models");

class MyCourses {
  static async myVideo(req, res, next) {
    try {
      const { id } = req.user;

      let options = {
        where: {
          UserId: id,
        },
        include: [
          {
            model: Course,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Chapter,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "codeOrder", "status"],
        },
        order: [["id", "ASC"]],
      };

      const data = await Order.findAll(options);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async generateTokenMidtrans(req, res, next) {
    try {
      const { id: userId } = req.user;
      const id = +req.params.courseId;

      const dataUser = await User.findByPk(userId);
      const dataCourse = await Course.findByPk(id);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${Math.floor(1000 + Math.random() * 10000)}`, // unique
          gross_amount: dataCourse.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: dataUser.email,
          course_name: dataCourse.name,
        },
      };

      const tokenMidtrans = await snap.createTransaction(parameter);
      res.status(201).json(tokenMidtrans);
    } catch (error) {
      next(error);
    }
  }

  static async successPayment(req, res, next) {
    try {
      const { id: userId } = req.user;
      const id = +req.params.courseId;
      const { transaction_id } = req.body;

      const dataUser = await User.findByPk(userId);
      const dataCourse = await Course.findByPk(id);

      const update = await Order.create({
        status: "terbayar",
        codeOrder: transaction_id,
        UserId: dataUser.id,
        CourseId: dataCourse.id,
      });

      res.status(201).json(update);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyCourses;
