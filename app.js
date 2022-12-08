if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
//require cors
const cors = require("cors");
const router = require("./routes");
const { errHandler } = require("./middlewares");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use("/public", express.static("public"));

app.use("/", router);
app.use(errHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
