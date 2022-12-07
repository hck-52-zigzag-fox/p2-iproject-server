const cors = require("cors");
const express = require("express");
const { errorHandler } = require("./middlewares/errorHandling");
const app = express();
const port = 9090;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
