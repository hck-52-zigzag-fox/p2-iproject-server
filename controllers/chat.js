const { Op } = require("sequelize");
const { Chat } = require("../models");

class ControllerChat {
  static async getAll(req, res, next) {
    try {
      const mychats = await Chat.findAll({
        where: {
          [Op.or]: [{ ReceiverId: req.user.id }, { SenderId: req.user.id }],
        },
      });
      res.status(200).json(mychats);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async sendChat(req, res, next) {
    try {
      const {id} = req.params
      const {text} = req.body 
      const newChat = await Chat.create({
        text,
        SenderId: req.user.id,
        ReceiverId: +id,
      },{
        returning:false
      });
      console.log(newChat)
      res.status(201).json({ msg: "Chat sended" });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

module.exports = ControllerChat;
