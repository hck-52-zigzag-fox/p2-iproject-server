const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routers/index");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Listen to Port :", PORT);
});

// module.exports = app
