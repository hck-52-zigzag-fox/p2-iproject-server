var admin = require("firebase-admin");

var serviceAccount = require("./fiane-socialbook-firebase-adminsdk-ydjgo-f42a42d047.json");

var fire = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
var db = fire.firestore();
class ChatController {
  static async addChat(req, res, next) {
    try {
      const { message } = req.body;

      const id = +req.user.id;
      const ReceiverId = +req.body.ReceiverId;
      const result = await db.collection("Chat").add({
        message,
        ReceiverId,
        SenderId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ message: `chat sended` });
    } catch (error) {
      next(error);
    }
  }
  static async readChat(req, res, next) {
    try {
      const { id } = req.user;
      const SenderId = +id;
      const ReceiverId = +req.params.ReceiverId;
      let dataSend = [];
      let dataReceived = [];
      const receivedResult = await db
        .collection("Chat")
        .where("SenderId", "==", ReceiverId)
        .where("ReceiverId", "==", SenderId)
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((hasil) => {
            dataReceived.push(hasil.data());
          });
        });
      const result = await db
        .collection("Chat")
        .where("SenderId", "==", SenderId)
        .where("ReceiverId", "==", ReceiverId)
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((hasil) => {
            dataSend.push(hasil.data());
          });
        });
      // function join 2 array
      let resultJoin = dataSend.concat(dataReceived);

      resultJoin.forEach((element) => {
        element.createdAt = new Date(element.createdAt._seconds * 1000);
      });
      // convert createdAt to UTC+7
      resultJoin.forEach((element) => {
        element.createdAt = new Date(
          element.createdAt.getTime() + 7 * 60 * 60 * 1000
        );
      });
      // sort array of object by date
      resultJoin.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      res.status(200).json(resultJoin);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatController;
