if (process.env.NODE_ENV !== "production") {
  require("dotenv").config;
}

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3004;
const router = require("./routers/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(port);
});
