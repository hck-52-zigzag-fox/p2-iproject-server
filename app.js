if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
  }
  
  const express = require("express");
  const cors = require('cors')
  const app = express();
  const port = process.env.PORT || 100;
  
  const router = require("./routes");
  const { errorHandler } = require("./middlewares/errorHandler");
  
  app.use(cors())
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use("/", router);
  app.use(errorHandler);
  
  app.listen(port, (req, res) => {
    console.log(`listening on port: ${port}`);
  });
  