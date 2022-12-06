const cors = require("cors")
const express = require("express");
const router = require("./routers");
const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router)

app.listen(PORT, function (err) {
  console.log("CONNECTED PORT", PORT);
});
