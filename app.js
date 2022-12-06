const express = require("express");
var cors = require("cors");
const app = express();
const port =  3000;
const routers = require("./routes");
const errHandler = require("./middlewares/errHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); 

app.use(routers);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});