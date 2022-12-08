require('dotenv').config()


const cors = require("cors");
const express = require("express");
const { errorHandler } = require("./middleware/middleware");
const app = express();
const port = 3000;
const router = require("./router");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listenin on port ${port}`);
});
